import { CommandResult } from "./dockerEngine";

export interface K8sPod {
  name: string;
  namespace: string;
  image: string;
  status: "Running" | "Pending" | "CrashLoopBackOff" | "Completed" | "Terminating";
  ready: string;
  restarts: number;
  age: string;
  ip: string;
  node: string;
  owner?: string;
  labels: Record<string, string>;
}

export interface K8sDeployment {
  name: string;
  namespace: string;
  image: string;
  replicas: number;
  availableReplicas: number;
  age: string;
  labels: Record<string, string>;
}

export interface K8sService {
  name: string;
  namespace: string;
  type: "ClusterIP" | "NodePort" | "LoadBalancer";
  clusterIP: string;
  externalIP: string;
  ports: string;
  selector: Record<string, string>;
  age: string;
}

export interface K8sNode {
  name: string;
  role: "control-plane" | "worker";
  status: "Ready" | "NotReady" | "SchedulingDisabled";
  version: string;
  age: string;
}

function padRight(str: string, width: number): string {
  return str.length >= width ? str + "  " : str + " ".repeat(width - str.length);
}

let k8sSeed = 100;
function pseudoRandomK8s(): number {
  k8sSeed = (k8sSeed * 1664525 + 1013904223) % 4294967296;
  return k8sSeed / 4294967296;
}

function randHex(len: number): string {
  const c = "0123456789abcdef";
  let s = "";
  for (let i = 0; i < len; i++) s += c[Math.floor(pseudoRandomK8s() * c.length)];
  return s;
}

export class K8sEngine {
  public profile: "default" | "cka" = "default";
  public currentNamespace: string = "default";
  public namespaces: string[] = ["default", "kube-system", "kube-node-lease", "kube-public"];
  public nodes: K8sNode[] = [];
  public pods: K8sPod[] = [];
  public deployments: K8sDeployment[] = [];
  public services: K8sService[] = [];
  public lastCommand: string = "";

  constructor(profile: "default" | "cka" = "default") {
    this.profile = profile;
    this.reset();
  }

  public reset() {
    this.currentNamespace = "default";
    this.namespaces = ["default", "kube-system", "kube-node-lease", "kube-public"];

    if (this.profile === "cka") {
      this.namespaces.push("prod", "dev", "ingress-nginx");
      this.nodes = [
        { name: "cka-control-plane", role: "control-plane", status: "Ready", version: "v1.30.2", age: "5d" },
        { name: "cka-worker-1", role: "worker", status: "Ready", version: "v1.30.2", age: "5d" },
        { name: "cka-worker-2", role: "worker", status: "Ready", version: "v1.30.2", age: "5d" },
      ];
      this.deployments = [
        {
          name: "payment-api",
          namespace: "prod",
          image: "nginx:1.25-alpine",
          replicas: 2,
          availableReplicas: 2,
          age: "2d",
          labels: { app: "payment-api", env: "prod" },
        },
      ];
      this.pods = [
        {
          name: `coredns-${randHex(5)}-${randHex(5)}`,
          namespace: "kube-system",
          image: "coredns:v1.11.1",
          status: "Running",
          ready: "1/1",
          restarts: 0,
          age: "5d",
          ip: "10.244.0.2",
          node: "cka-control-plane",
          labels: { "k8s-app": "kube-dns" },
        },
        {
          name: `payment-api-${randHex(5)}-${randHex(5)}`,
          namespace: "prod",
          image: "nginx:1.25-alpine",
          status: "Running",
          ready: "1/1",
          restarts: 0,
          age: "2d",
          ip: "10.244.1.14",
          node: "cka-worker-1",
          owner: "payment-api",
          labels: { app: "payment-api" },
        },
        {
          name: `payment-api-${randHex(5)}-${randHex(5)}`,
          namespace: "prod",
          image: "nginx:1.25-alpine",
          status: "Running",
          ready: "1/1",
          restarts: 0,
          age: "2d",
          ip: "10.244.2.8",
          node: "cka-worker-2",
          owner: "payment-api",
          labels: { app: "payment-api" },
        },
      ];
      this.services = [
        {
          name: "kubernetes",
          namespace: "default",
          type: "ClusterIP",
          clusterIP: "10.96.0.1",
          externalIP: "<none>",
          ports: "443/TCP",
          selector: {},
          age: "5d",
        },
        {
          name: "payment-service",
          namespace: "prod",
          type: "ClusterIP",
          clusterIP: "10.96.14.88",
          externalIP: "<none>",
          ports: "8080/TCP",
          selector: { app: "payment-api" },
          age: "2d",
        },
      ];
    } else {
      this.nodes = [{ name: "devops-cluster-control-plane", role: "control-plane", status: "Ready", version: "v1.30.2", age: "3h" }];
      this.deployments = [];
      this.pods = [
        {
          name: `coredns-${randHex(5)}-${randHex(5)}`,
          namespace: "kube-system",
          image: "registry.k8s.io/coredns:v1.11.1",
          status: "Running",
          ready: "1/1",
          restarts: 0,
          age: "3h",
          ip: "10.244.0.2",
          node: "devops-cluster-control-plane",
          labels: { "k8s-app": "kube-dns" },
        },
      ];
      this.services = [
        {
          name: "kubernetes",
          namespace: "default",
          type: "ClusterIP",
          clusterIP: "10.96.0.1",
          externalIP: "<none>",
          ports: "443/TCP",
          selector: {},
          age: "3h",
        },
      ];
    }
  }

  public exec(raw: string): CommandResult {
    const cmd = raw.trim();
    this.lastCommand = cmd;
    if (!cmd) return { lines: [], isError: false };

    const parts = cmd.split(/\s+/);
    const prog = parts[0];
    const args = parts.slice(1);

    if (prog === "clear") return { lines: [], isError: false, clear: true };
    if (prog === "help") return this.help();
    if (prog === "kubectl" || prog === "k") return this.handleKubectl(args);

    return {
      lines: [`command not found: ${prog}. This lab understands 'kubectl' (or alias 'k'). Try 'kubectl get pods' or 'help'.`],
      isError: true,
    };
  }

  private handleKubectl(args: string[]): CommandResult {
    if (args.length === 0) {
      return { lines: ["kubectl controls the Kubernetes cluster manager.", "See 'kubectl --help' for commands."], isError: false };
    }

    let targetNamespace = this.currentNamespace;
    let allNamespaces = false;
    const cleanArgs: string[] = [];

    for (let i = 0; i < args.length; i++) {
      const a = args[i];
      if (a === "-n" || a === "--namespace") {
        targetNamespace = args[++i] || "default";
      } else if (a.startsWith("-n=")) {
        targetNamespace = a.slice(3);
      } else if (a === "-A" || a === "--all-namespaces") {
        allNamespaces = true;
      } else {
        cleanArgs.push(a);
      }
    }

    const verb = cleanArgs[0];
    const rest = cleanArgs.slice(1);

    switch (verb) {
      case "get":
        return this.get(rest, targetNamespace, allNamespaces);
      case "run":
        return this.run(rest, targetNamespace);
      case "create":
        return this.create(rest, targetNamespace);
      case "scale":
        return this.scale(rest, targetNamespace);
      case "expose":
        return this.expose(rest, targetNamespace);
      case "describe":
        return this.describe(rest, targetNamespace);
      case "logs":
        return this.logs(rest, targetNamespace);
      case "delete":
        return this.deleteResource(rest, targetNamespace);
      case "cordon":
        return this.cordon(rest, true);
      case "uncordon":
        return this.cordon(rest, false);
      case "drain":
        return this.drain(rest);
      case "cluster-info":
        return {
          lines: [
            "Kubernetes control plane is running at https://127.0.0.1:6443",
            "CoreDNS is running at https://127.0.0.1:6443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy",
          ],
          isError: false,
        };
      default:
        return { lines: [`Error: unknown command "${verb}" for "kubectl"`], isError: true };
    }
  }

  private get(args: string[], ns: string, allNs: boolean): CommandResult {
    const resource = args[0];
    if (!resource) return { lines: ['You must specify the type of resource to get. (e.g. pods, nodes, deployments)'], isError: true };

    if (resource === "node" || resource === "nodes" || resource === "no") {
      const header = padRight("NAME", 32) + padRight("STATUS", 22) + padRight("ROLES", 16) + padRight("AGE", 10) + "VERSION";
      const rows = this.nodes.map((n) => {
        return padRight(n.name, 32) + padRight(n.status, 22) + padRight(n.role, 16) + padRight(n.age, 10) + n.version;
      });
      return { lines: [header, ...rows], isError: false };
    }

    if (resource === "ns" || resource === "namespace" || resource === "namespaces") {
      const header = padRight("NAME", 24) + padRight("STATUS", 12) + "AGE";
      const rows = this.namespaces.map((name) => padRight(name, 24) + padRight("Active", 12) + "5d");
      return { lines: [header, ...rows], isError: false };
    }

    if (resource === "pod" || resource === "pods" || resource === "po") {
      const filtered = this.pods.filter((p) => allNs || p.namespace === ns);
      if (filtered.length === 0) {
        return { lines: [`No resources found in ${ns} namespace.`], isError: false };
      }
      const isWide = args.includes("-o") && args.includes("wide");
      let header = "";
      if (allNs) header += padRight("NAMESPACE", 16);
      header += padRight("NAME", 30) + padRight("READY", 10) + padRight("STATUS", 16) + padRight("RESTARTS", 12) + padRight("AGE", 10);
      if (isWide) header += padRight("IP", 16) + "NODE";

      const rows = filtered.map((p) => {
        let r = "";
        if (allNs) r += padRight(p.namespace, 16);
        r += padRight(p.name, 30) + padRight(p.ready, 10) + padRight(p.status, 16) + padRight(String(p.restarts), 12) + padRight(p.age, 10);
        if (isWide) r += padRight(p.ip, 16) + p.node;
        return r;
      });
      return { lines: [header, ...rows], isError: false };
    }

    if (resource === "deployment" || resource === "deployments" || resource === "deploy") {
      const filtered = this.deployments.filter((d) => allNs || d.namespace === ns);
      if (filtered.length === 0) return { lines: [`No resources found in ${ns} namespace.`], isError: false };

      const header =
        padRight("NAME", 24) + padRight("READY", 12) + padRight("UP-TO-DATE", 14) + padRight("AVAILABLE", 14) + "AGE";
      const rows = filtered.map((d) => {
        return (
          padRight(d.name, 24) +
          padRight(`${d.availableReplicas}/${d.replicas}`, 12) +
          padRight(String(d.replicas), 14) +
          padRight(String(d.availableReplicas), 14) +
          d.age
        );
      });
      return { lines: [header, ...rows], isError: false };
    }

    if (resource === "service" || resource === "services" || resource === "svc") {
      const filtered = this.services.filter((s) => allNs || s.namespace === ns);
      const header =
        padRight("NAME", 22) +
        padRight("TYPE", 16) +
        padRight("CLUSTER-IP", 16) +
        padRight("EXTERNAL-IP", 16) +
        padRight("PORT(S)", 16) +
        "AGE";
      const rows = filtered.map((s) => {
        return (
          padRight(s.name, 22) +
          padRight(s.type, 16) +
          padRight(s.clusterIP, 16) +
          padRight(s.externalIP, 16) +
          padRight(s.ports, 16) +
          s.age
        );
      });
      return { lines: [header, ...rows], isError: false };
    }

    return { lines: [`error: the server doesn't have a resource type "${resource}"`], isError: true };
  }

  private run(args: string[], ns: string): CommandResult {
    const name = args[0];
    if (!name) return { lines: ['error: NAME is required for "kubectl run"'], isError: true };

    let image = "nginx:alpine";
    for (const a of args) {
      if (a.startsWith("--image=")) image = a.slice(8);
    }

    const node = this.nodes.find((n) => n.status === "Ready" && n.role === "worker") || this.nodes[0];
    const pod: K8sPod = {
      name,
      namespace: ns,
      image,
      status: "Running",
      ready: "1/1",
      restarts: 0,
      age: "5s",
      ip: `10.244.${Math.floor(pseudoRandomK8s() * 3) + 1}.${Math.floor(pseudoRandomK8s() * 200) + 10}`,
      node: node ? node.name : "devops-cluster-control-plane",
      labels: { run: name },
    };

    this.pods.push(pod);
    return { lines: [`pod/${name} created`], isError: false };
  }

  private create(args: string[], ns: string): CommandResult {
    const sub = args[0];
    if (sub === "namespace" || sub === "ns") {
      const name = args[1];
      if (!name) return { lines: ['error: NAME is required for "kubectl create namespace"'], isError: true };
      if (!this.namespaces.includes(name)) this.namespaces.push(name);
      return { lines: [`namespace/${name} created`], isError: false };
    }

    if (sub === "deployment" || sub === "deploy") {
      const name = args[1];
      if (!name) return { lines: ['error: NAME is required for "kubectl create deployment"'], isError: true };
      let image = "nginx:latest";
      let replicas = 1;
      for (const a of args) {
        if (a.startsWith("--image=")) image = a.slice(8);
        if (a.startsWith("--replicas=")) replicas = parseInt(a.slice(11), 10) || 1;
      }

      this.deployments.push({
        name,
        namespace: ns,
        image,
        replicas,
        availableReplicas: replicas,
        age: "10s",
        labels: { app: name },
      });

      for (let i = 0; i < replicas; i++) {
        const podName = `${name}-${randHex(5)}-${randHex(5)}`;
        const node = this.nodes.find((n) => n.status === "Ready") || this.nodes[0];
        this.pods.push({
          name: podName,
          namespace: ns,
          image,
          status: "Running",
          ready: "1/1",
          restarts: 0,
          age: "5s",
          ip: `10.244.1.${Math.floor(pseudoRandomK8s() * 200) + 10}`,
          node: node ? node.name : "devops-control-plane",
          owner: name,
          labels: { app: name },
        });
      }

      return { lines: [`deployment.apps/${name} created`], isError: false };
    }

    return { lines: [`error: unknown resource type to create: "${sub}"`], isError: true };
  }

  private scale(args: string[], ns: string): CommandResult {
    let target = "";
    let count = 1;

    for (let i = 0; i < args.length; i++) {
      const a = args[i];
      if (a.startsWith("--replicas=")) count = parseInt(a.slice(11), 10);
      else if (a === "--replicas" && args[i + 1]) count = parseInt(args[++i], 10);
      else if (!a.startsWith("-")) target = a;
    }

    const depName = target.replace(/^deployment\//, "").replace(/^deploy\//, "");
    const dep = this.deployments.find((d) => d.name === depName && d.namespace === ns);
    if (!dep) return { lines: [`Error: deployment "${depName}" not found in namespace "${ns}"`], isError: true };

    const diff = count - dep.replicas;
    dep.replicas = count;
    dep.availableReplicas = count;

    if (diff > 0) {
      for (let i = 0; i < diff; i++) {
        this.pods.push({
          name: `${dep.name}-${randHex(5)}-${randHex(5)}`,
          namespace: ns,
          image: dep.image,
          status: "Running",
          ready: "1/1",
          restarts: 0,
          age: "2s",
          ip: `10.244.2.${Math.floor(pseudoRandomK8s() * 200) + 10}`,
          node: this.nodes[0]?.name || "control-plane",
          owner: dep.name,
          labels: dep.labels,
        });
      }
    } else if (diff < 0) {
      const toRemove = Math.abs(diff);
      let removed = 0;
      for (let i = this.pods.length - 1; i >= 0 && removed < toRemove; i--) {
        if (this.pods[i].owner === dep.name) {
          this.pods.splice(i, 1);
          removed++;
        }
      }
    }

    return { lines: [`deployment.apps/${dep.name} scaled`], isError: false };
  }

  private expose(args: string[], ns: string): CommandResult {
    const target = args[0] || "";
    const name = target.replace(/^deployment\//, "").replace(/^deploy\//, "");
    let port = "80";
    let type: "ClusterIP" | "NodePort" = "ClusterIP";

    for (let i = 0; i < args.length; i++) {
      const a = args[i];
      if (a.startsWith("--port=")) port = a.slice(7);
      else if (a === "--port" && args[i + 1]) port = args[++i];
      else if (a.startsWith("--type=") && a.slice(7).toLowerCase() === "nodeport") type = "NodePort";
    }

    const svc: K8sService = {
      name,
      namespace: ns,
      type,
      clusterIP: `10.96.${Math.floor(pseudoRandomK8s() * 200)}.${Math.floor(pseudoRandomK8s() * 200)}`,
      externalIP: "<none>",
      ports: type === "NodePort" ? `${port}:31234/TCP` : `${port}/TCP`,
      selector: { app: name },
      age: "3s",
    };

    this.services.push(svc);
    return { lines: [`service/${name} exposed`], isError: false };
  }

  private describe(args: string[], ns: string): CommandResult {
    const res = args[0];
    const name = args[1] || "";
    if (res === "pod" || res === "po") {
      const p = this.pods.find((item) => item.name === name && item.namespace === ns);
      if (!p) return { lines: [`Error from server (NotFound): pods "${name}" not found`], isError: true };
      return {
        lines: [
          `Name:         ${p.name}`,
          `Namespace:    ${p.namespace}`,
          `Node:         ${p.node}/${p.ip}`,
          `Status:       ${p.status}`,
          `IP:           ${p.ip}`,
          `Containers:`,
          `  app:`,
          `    Image:          ${p.image}`,
          `    Ready:          True`,
          `    Restart Count:  ${p.restarts}`,
          `Conditions:`,
          `  Type              Status`,
          `  Initialized       True`,
          `  Ready             True`,
          `  ContainersReady   True`,
          `  PodScheduled      True`,
        ],
        isError: false,
      };
    }
    return { lines: [`Simulated describe for ${res} ${name}`], isError: false };
  }

  private logs(args: string[], ns: string): CommandResult {
    const target = args[0];
    if (!target) return { lines: ['error: Pod name is required.'], isError: true };
    const p = this.pods.find((item) => item.name === target && item.namespace === ns);
    if (!p) return { lines: [`Error from server (NotFound): pods "${target}" not found`], isError: true };
    return {
      lines: [
        `2026-10-31T10:00:00.123456Z [info] Application started in pod ${p.name}`,
        `2026-10-31T10:00:01.456789Z [info] Listening on 0.0.0.0:80`,
        `2026-10-31T10:00:05.789012Z [info] Health check probe /healthz returned 200 OK`,
      ],
      isError: false,
    };
  }

  private deleteResource(args: string[], ns: string): CommandResult {
    const type = args[0];
    const name = args[1];
    if (type === "pod" || type === "po") {
      const idx = this.pods.findIndex((p) => p.name === name && p.namespace === ns);
      if (idx !== -1) {
        this.pods.splice(idx, 1);
        return { lines: [`pod "${name}" deleted`], isError: false };
      }
    }
    if (type === "deployment" || type === "deploy") {
      const idx = this.deployments.findIndex((d) => d.name === name && d.namespace === ns);
      if (idx !== -1) {
        this.deployments.splice(idx, 1);
        this.pods = this.pods.filter((p) => p.owner !== name);
        return { lines: [`deployment.apps "${name}" deleted`], isError: false };
      }
    }
    return { lines: [`${type} "${name}" deleted`], isError: false };
  }

  private cordon(args: string[], unschedulable: boolean): CommandResult {
    const nodeName = args[0];
    const node = this.nodes.find((n) => n.name === nodeName);
    if (!node) return { lines: [`Error: node "${nodeName}" not found`], isError: true };
    node.status = unschedulable ? "SchedulingDisabled" : "Ready";
    return { lines: [`node/${nodeName} ${unschedulable ? "cordoned" : "uncordoned"}`], isError: false };
  }

  private drain(args: string[]): CommandResult {
    const nodeName = args.find((a) => !a.startsWith("-"));
    const node = this.nodes.find((n) => n.name === nodeName);
    if (!node) return { lines: [`Error: node "${nodeName}" not found`], isError: true };
    node.status = "SchedulingDisabled";
    const evicted = this.pods.filter((p) => p.node === nodeName && p.namespace !== "kube-system");
    this.pods = this.pods.filter((p) => p.node !== nodeName || p.namespace === "kube-system");
    return {
      lines: [
        `node/${nodeName} cordoned`,
        ...evicted.map((p) => `evicting pod ${p.namespace}/${p.name}`),
        `node/${nodeName} drained successfully`,
      ],
      isError: false,
    };
  }

  private help(): CommandResult {
    return {
      lines: [
        "Kubernetes Simulator - Quick Reference:",
        "  kubectl get nodes                      List cluster nodes",
        "  kubectl get pods [-A] [-o wide]        List pods (in current or all namespaces)",
        "  kubectl get deployments / deploy       List deployments",
        "  kubectl get svc                        List services",
        "  kubectl run <name> --image=<image>     Run a standalone pod",
        "  kubectl create deployment <name> ...   Create a deployment",
        "  kubectl scale deployment <name> ...    Scale replicas",
        "  kubectl expose deployment <name> ...   Expose as ClusterIP / NodePort",
        "  kubectl logs <pod-name>                View logs",
        "  kubectl describe pod <pod-name>        Deep inspection",
        "  kubectl cordon / drain <node>          Simulate CKA maintenance tasks",
      ],
      isError: false,
    };
  }
}
