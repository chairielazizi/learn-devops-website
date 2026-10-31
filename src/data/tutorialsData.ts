export interface TutorialTrack {
  id: string;
  title: string;
  slug: string;
  icon: string;
  badge: string;
  description: string;
  lessonsCount: number;
  estimatedHours: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  modules: {
    title: string;
    lessons: {
      title: string;
      slug: string;
      summary: string;
      duration: string;
    }[];
  }[];
}

export const TUTORIAL_TRACKS: TutorialTrack[] = [
  {
    id: "docker",
    title: "Docker & Containerization",
    slug: "docker",
    icon: "🐳",
    badge: "Most Popular",
    description: "Master container virtualization, Dockerfiles, multi-stage builds, Docker Compose, volumes, networking, and security best practices.",
    lessonsCount: 40,
    estimatedHours: 12,
    level: "Beginner",
    modules: [
      {
        title: "Module 1: Docker Fundamentals & Setup",
        lessons: [
          {
            title: "Introduction to Docker",
            slug: "introduction-to-docker",
            summary: "Learn what Docker is and why developers use it. Understand images vs containers, how Docker differs from a virtual machine, the basic workflow and its limits.",
            duration: "10 min read"
          },
          {
            title: "Why Use Docker?",
            slug: "why-use-docker",
            summary: "Find out why teams use Docker: consistent environments, faster deployment, easier scaling and microservices support, with real-world use cases.",
            duration: "10 min read"
          },
          {
            title: "Docker vs Virtual Machines",
            slug: "docker-vs-virtual-machines",
            summary: "Compare Docker containers and virtual machines on architecture, startup time, isolation and security, and learn when to choose one or use both together.",
            duration: "10 min read"
          },
          {
            title: "Installing Docker",
            slug: "installing-docker",
            summary: "Choose between Docker Desktop and Docker Engine, check the requirements, verify the install with docker run hello-world, and fix the three most common failures.",
            duration: "10 min read"
          },
          {
            title: "Installing Docker on Windows",
            slug: "installing-docker-windows",
            summary: "Install Docker Desktop on Windows 10 or 11 with the WSL 2 backend. Covers prerequisites, settings, troubleshooting and filesystem choice for build speed.",
            duration: "10 min read"
          },
          {
            title: "Installing Docker on macOS",
            slug: "installing-docker-macos",
            summary: "Install Docker Desktop on macOS for Intel or Apple Silicon (M1, M2, M3). Covers setup, resource settings, the Dashboard, verifying the install and common fixes.",
            duration: "10 min read"
          },
          {
            title: "Installing Docker on Linux",
            slug: "installing-docker-linux",
            summary: "Install Docker Engine on Ubuntu, Debian, CentOS, RHEL or Fedora with working commands, then run docker without sudo, enable it on boot and fix common errors.",
            duration: "10 min read"
          },
          {
            title: "Key Docker Concepts",
            slug: "key-concepts",
            summary: "A plain-English guide to core Docker concepts: images, containers, Dockerfile, registry, volumes, networks, Compose, and how the client talks to the daemon.",
            duration: "10 min read"
          },
        ],
      },
      {
        title: "Module 2: Images, Registry & Optimization",
        lessons: [
          {
            title: "Docker Images",
            slug: "docker-images",
            summary: "Learn what a Docker image is, how layers and tags work, how to shrink images, and how to reclaim disk space by removing dangling images and old tags.",
            duration: "10 min read"
          },
          {
            title: "Image Naming & Tags",
            slug: "docker-images-naming-tags",
            summary: "Understand how Docker image names and tags are structured, tag images with docker tag, avoid the latest trap, and pin exact versions using digests.",
            duration: "10 min read"
          },
          {
            title: "Docker Hub",
            slug: "docker-images-hub",
            summary: "Learn what Docker Hub is, how to find official images, and how to work around pull rate limits. A practical intro to using the default Docker registry.",
            duration: "10 min read"
          },
          {
            title: "Docker Pull & Search",
            slug: "docker-images-pull",
            summary: "Use docker pull to download images by tag or digest, read the pull output, and find images with docker search. Includes a hands-on Docker Hub exercise.",
            duration: "10 min read"
          },
          {
            title: "List & Inspect Images",
            slug: "docker-images-listing",
            summary: "Use docker images, docker inspect and docker history to list local images, read their metadata and layers, and check how much disk space Docker uses.",
            duration: "10 min read"
          },
          {
            title: "Building Images",
            slug: "docker-images-building",
            summary: "Learn how to build a Docker image with a Dockerfile and docker build. Covers core instructions, .dockerignore and a complete Python API example.",
            duration: "10 min read"
          },
          {
            title: "Layers & Caching",
            slug: "docker-images-layers",
            summary: "See how Docker image layers and the build cache work, why Dockerfile order matters, and how to speed up docker build by avoiding unneeded cache misses.",
            duration: "10 min read"
          },
          {
            title: "Multi-Stage Builds",
            slug: "docker-images-multi-stage",
            summary: "Shrink your Docker image with multi-stage builds. See how COPY --from works, follow real examples, and target a single stage with docker build --target.",
            duration: "10 min read"
          },
          {
            title: "Optimization",
            slug: "docker-images-optimization",
            summary: "Reduce Docker image size with slim base images, merged RUN layers, a .dockerignore file and non-root users. Eight practical steps with examples.",
            duration: "10 min read"
          },
          {
            title: "Managing Images",
            slug: "docker-images-managing",
            summary: "Manage local images with docker tag, docker rmi, docker push and docker save/load. Includes cleanup with docker image prune and the export vs save difference.",
            duration: "10 min read"
          },
        ],
      },
      {
        title: "Module 3: Container Runtime & Networking",
        lessons: [
          {
            title: "Docker Containers",
            slug: "docker-containers",
            summary: "Learn how Docker containers work, from docker run and the container lifecycle to port publishing, restart policies and why a container exits immediately.",
            duration: "10 min read"
          },
          {
            title: "Running Containers",
            slug: "docker-containers-running",
            summary: "Learn the docker run command with real examples: detached and interactive mode, naming, port mapping, resource limits, restart policies and more.",
            duration: "10 min read"
          },
          {
            title: "Lifecycle Management",
            slug: "docker-containers-lifecycle",
            summary: "Understand docker stop vs kill and every container state. Start, restart, pause and rename containers, and read exit codes to see why one stopped.",
            duration: "10 min read"
          },
          {
            title: "Exec & Interact",
            slug: "docker-containers-interaction",
            summary: "Use docker exec -it to open a bash shell in a container, then copy files with docker cp and inspect processes with docker top, attach and inspect.",
            duration: "10 min read"
          },
          {
            title: "Logs & Monitoring",
            slug: "docker-containers-logs",
            summary: "Read container output with docker logs -f and --tail, filter it with grep, and monitor resource use with docker stats, events and health checks.",
            duration: "10 min read"
          },
          {
            title: "Networking Basics",
            slug: "docker-containers-networking",
            summary: "Learn how Docker networking works: bridge, host and user-defined networks, port publishing with -p, container DNS, and how EXPOSE differs from -p.",
            duration: "10 min read"
          },
          {
            title: "Volumes & Storage",
            slug: "docker-containers-volumes",
            summary: "Keep data after a container is removed. Compare named volumes, bind mounts and tmpfs, then share, back up and restore volumes with working commands.",
            duration: "10 min read"
          },
          {
            title: "Env Vars & Config",
            slug: "docker-containers-env",
            summary: "Pass docker environment variables with the -e flag and --env-file, check them in a running container, and learn why secrets need a safer approach.",
            duration: "10 min read"
          },
          {
            title: "Cleanup & Pruning",
            slug: "docker-containers-cleanup",
            summary: "Free disk space with docker system prune, docker rm and docker image prune. Learn what each command deletes, what is safe, and how to automate cleanup.",
            duration: "10 min read"
          },
        ],
      },
      {
        title: "Module 4: Dockerfile Deep Dive & Syntax",
        lessons: [
          {
            title: "Dockerfile Basics",
            slug: "dockerfile-basics",
            summary: "Learn how to write a Dockerfile: FROM, COPY, RUN and CMD, layer caching, .dockerignore, multi-stage builds, HEALTHCHECK and the mistakes that bloat images.",
            duration: "10 min read"
          },
          {
            title: "Dockerfile FROM and Choosing a Base Image",
            slug: "dockerfile-from",
            summary: "Choose the right Dockerfile FROM base image: alpine vs slim vs full, pinning tags and digests, multi-stage FROM, platform targeting and the scratch image.",
            duration: "10 min read"
          },
          {
            title: "Dockerfile COPY vs ADD",
            slug: "dockerfile-copy-add",
            summary: "Learn when to use COPY vs ADD in a Dockerfile. Covers build context, --chown and --chmod, COPY --from, the dependency-manifest pattern and .dockerignore.",
            duration: "10 min read"
          },
          {
            title: "Dockerfile RUN",
            slug: "dockerfile-run",
            summary: "Learn how the Dockerfile RUN instruction works, including shell vs exec form, apt-get best practices, same-layer cleanup, cache mounts, secrets and heredocs.",
            duration: "10 min read"
          },
          {
            title: "Dockerfile CMD vs ENTRYPOINT",
            slug: "dockerfile-cmd-entrypoint",
            summary: "Learn the difference between CMD and ENTRYPOINT in a Dockerfile, how to combine them, when to use exec vs shell form, and how to override both at runtime.",
            duration: "10 min read"
          },
          {
            title: "Dockerfile ENV vs ARG",
            slug: "dockerfile-env-arg",
            summary: "Learn the difference between ENV and ARG in a Dockerfile, how ARG scoping works, why neither is safe for secrets, and how ARG affects the build cache.",
            duration: "10 min read"
          },
          {
            title: "Dockerfile WORKDIR, EXPOSE, USER and HEALTHCHECK",
            slug: "dockerfile-workdir-expose",
            summary: "Learn what WORKDIR, EXPOSE, USER, LABEL and HEALTHCHECK do in a Dockerfile, why EXPOSE publishes nothing, and when VOLUME causes problems in builds.",
            duration: "10 min read"
          },
          {
            title: "Dockerfile Best Practices",
            slug: "dockerfile-best-practices",
            summary: "Write safer, smaller Dockerfiles. Covers exec form for SIGTERM, non-root users, secrets, layer order, multi-stage builds, pinned bases, scanning and hadolint.",
            duration: "10 min read"
          },
          {
            title: "Real-World Dockerfile Examples",
            slug: "dockerfile-real-world",
            summary: "Copy production-ready Dockerfile examples for Node.js, Python FastAPI, Go, React with Nginx, Spring Boot and Django, and see the pattern they all share.",
            duration: "10 min read"
          },
        ],
      },
      {
        title: "Module 5: Storage & Volumes",
        lessons: [
          {
            title: "Docker Volumes",
            slug: "docker-volumes",
            summary: "Learn why container data disappears and how Docker volumes fix it. Compare the three mount types, handle permission problems, and back up or clean up volumes.",
            duration: "10 min read"
          },
          {
            title: "Named Volumes",
            slug: "docker-volumes-named",
            summary: "Create Docker named volumes with docker volume create, -v and --mount. See how data survives container removal and how to share a volume.",
            duration: "10 min read"
          },
          {
            title: "Bind Mounts",
            slug: "docker-volumes-bind-mounts",
            summary: "Learn how to use a Docker bind mount with -v and --mount to share a host directory, make it read-only with :ro, and set up live reload for development.",
            duration: "10 min read"
          },
          {
            title: "Volume Management",
            slug: "docker-volumes-management",
            summary: "Manage Docker volumes with docker volume ls, inspect, rm and prune. Learn how to back up a volume, restore it from a tar archive and migrate data between hosts.",
            duration: "10 min read"
          },
        ],
      },
    ],
  },
  {
    id: "kubernetes",
    title: "Kubernetes (K8s)",
    slug: "kubernetes",
    icon: "☸️",
    badge: "Orchestration Standard",
    description: "Learn production container orchestration: Pods, Deployments, Services, Ingress, ConfigMaps, Secrets, PV/PVCs, Helm, and HPA.",
    lessonsCount: 40,
    estimatedHours: 16,
    level: "Intermediate",
    modules: [
      {
        title: "Module 1: Cluster Architecture & Setup",
        lessons: [
          {
            title: "Introduction to Kubernetes",
            slug: "introduction-to-kubernetes",
            summary: "Learn what Kubernetes is and what problem it solves, how it differs from Docker and Docker Compose, the core objects to know, and whether you really need it.",
            duration: "10 min read"
          },
          {
            title: "Kubernetes Architecture",
            slug: "kubernetes-architecture",
            summary: "Understand Kubernetes architecture: API server, etcd, scheduler, controller manager, kubelet and kube-proxy, and what happens when you run kubectl apply.",
            duration: "10 min read"
          },
          {
            title: "Installing Kubernetes",
            slug: "installing-kubernetes",
            summary: "Compare ways to install Kubernetes: kind, Minikube, Docker Desktop, k3s, kubeadm and managed clusters, and pick the right one for learning or production.",
            duration: "10 min read"
          },
          {
            title: "Installing Kubernetes with Minikube",
            slug: "installing-kubernetes-minikube",
            summary: "Install Minikube, run minikube start, enable add-ons like ingress, reach services with minikube tunnel, and build images locally without a registry.",
            duration: "10 min read"
          },
          {
            title: "Installing Kubernetes with kind",
            slug: "installing-kubernetes-kind",
            summary: "Install kind and run kind create cluster to get a local Kubernetes cluster in Docker. Covers multi-node configs, pinned versions, local images, ingress and CI.",
            duration: "10 min read"
          },
          {
            title: "Installing kubectl",
            slug: "installing-kubernetes-kubectl",
            summary: "Install kubectl, stay within the supported version skew, connect to a cluster with kubeconfig, enable shell completion and add useful krew plugins.",
            duration: "10 min read"
          },
        ],
      },
      {
        title: "Module 2: kubectl CLI & Pod Workloads",
        lessons: [
          {
            title: "kubectl Basics",
            slug: "kubectl-basics",
            summary: "Learn the kubectl commands you will run daily: get, apply, describe, delete, selectors, output formats, namespaces and tips to work faster with kubeconfig.",
            duration: "10 min read"
          },
          {
            title: "kubectl get and describe",
            slug: "kubectl-get-describe",
            summary: "Inspect cluster resources with kubectl get and describe. Use -o wide, jsonpath and custom-columns, read events, and know when to choose get over describe.",
            duration: "10 min read"
          },
          {
            title: "kubectl apply and delete",
            slug: "kubectl-apply-delete",
            summary: "Learn kubectl apply vs create vs replace, preview changes with kubectl diff, use server-side apply, delete resources safely and fix objects stuck deleting.",
            duration: "10 min read"
          },
          {
            title: "kubectl exec, logs, and port-forward",
            slug: "kubectl-exec-logs",
            summary: "Debug pods with kubectl logs (including --previous), kubectl exec, port-forward and kubectl cp. Handle distroless images with kubectl debug.",
            duration: "10 min read"
          },
          {
            title: "kubectl contexts and namespaces",
            slug: "kubectl-contexts-namespaces",
            summary: "Learn how kubeconfig works, switch clusters with kubectl config use-context, set a default namespace, merge kubeconfig files and avoid the wrong cluster.",
            duration: "10 min read"
          },
          {
            title: "Kubernetes Pods",
            slug: "kubernetes-pods",
            summary: "Learn what a Kubernetes Pod is, what its containers share, why pod IPs change, how to write one, and how to read the statuses you see when debugging.",
            duration: "10 min read"
          },
          {
            title: "Kubernetes Pod Manifest",
            slug: "kubernetes-pods-manifest",
            summary: "Write a Kubernetes Pod manifest with confidence. Walks through apiVersion, metadata, the container spec, ports and securityContext with a full example.",
            duration: "10 min read"
          },
          {
            title: "Kubernetes Pod Lifecycle",
            slug: "kubernetes-pods-lifecycle",
            summary: "Understand Kubernetes pod phases and container states, restartPolicy, termination and eviction, and why CrashLoopBackOff is a symptom rather than the cause.",
            duration: "10 min read"
          },
          {
            title: "Multi-container Pods",
            slug: "kubernetes-pods-multicontainer",
            summary: "Learn when and how to run multiple containers in one Kubernetes Pod: init containers, native sidecars, shared emptyDir volumes, and when to avoid the pattern.",
            duration: "10 min read"
          },
          {
            title: "Kubernetes Probes",
            slug: "kubernetes-pods-probes",
            summary: "Configure Kubernetes liveness, readiness and startup probes. Learn when to use each, the HTTP, TCP and exec methods, timing fields and common failure modes.",
            duration: "10 min read"
          },
        ],
      },
      {
        title: "Module 3: Deployments & Networking Services",
        lessons: [
          {
            title: "Kubernetes Deployments",
            slug: "kubernetes-deployments",
            summary: "Learn how a Kubernetes Deployment manages ReplicaSets and pods, how to write one, run rolling updates and rollbacks, and when to choose a StatefulSet instead.",
            duration: "10 min read"
          },
          {
            title: "Creating Kubernetes Deployments",
            slug: "kubernetes-deployments-create",
            summary: "Create a Kubernetes Deployment with kubectl create deployment or a YAML manifest. Learn matchLabels, kubectl scale, inspecting objects and common errors.",
            duration: "10 min read"
          },
          {
            title: "Kubernetes Rolling Updates",
            slug: "kubernetes-deployments-rolling-updates",
            summary: "Run zero-downtime rolling updates in Kubernetes. Tune maxSurge and maxUnavailable, use readiness probes and graceful shutdown, and fix stalled rollouts.",
            duration: "10 min read"
          },
          {
            title: "Kubernetes Rollbacks",
            slug: "kubernetes-deployments-rollbacks",
            summary: "Roll back a bad release with kubectl rollout undo. Learn revision history, change-cause annotations, revisionHistoryLimit and what a rollback cannot fix.",
            duration: "10 min read"
          },
          {
            title: "Kubernetes Services",
            slug: "kubernetes-services",
            summary: "Learn how a Kubernetes Service finds pods with selectors, how port, targetPort and nodePort differ, how service DNS works, and which of the four types to pick.",
            duration: "10 min read"
          },
          {
            title: "Kubernetes Service: ClusterIP",
            slug: "kubernetes-services-clusterip",
            summary: "Learn how a Kubernetes ClusterIP Service works: virtual IPs, service DNS names, endpoints, testing with port-forward and headless Services.",
            duration: "10 min read"
          },
          {
            title: "Kubernetes Service: NodePort",
            slug: "kubernetes-services-nodeport",
            summary: "Learn how a Kubernetes NodePort Service works: the three ports, the 30000-32767 range, externalTrafficPolicy, why it is weak for production and debugging.",
            duration: "10 min read"
          },
          {
            title: "Kubernetes Service: LoadBalancer",
            slug: "kubernetes-services-loadbalancer",
            summary: "Use a Kubernetes LoadBalancer Service, configure cloud annotations, restrict access, set externalTrafficPolicy, and fix an EXTERNAL-IP stuck on pending.",
            duration: "10 min read"
          },
          {
            title: "Kubernetes Ingress",
            slug: "kubernetes-ingress",
            summary: "Learn how a Kubernetes Ingress works with an ingress controller, write a working manifest with pathType and TLS, and debug routing problems step by step.",
            duration: "10 min read"
          },
        ],
      },
      {
        title: "Module 4: Storage, ConfigMaps & Secrets",
        lessons: [
          {
            title: "ConfigMaps and Secrets",
            slug: "kubernetes-configmaps-secrets",
            summary: "Learn when to use a Kubernetes ConfigMap vs a Secret, how to consume them as env vars or files, why base64 is not encryption, and where real secrets belong.",
            duration: "10 min read"
          },
          {
            title: "Kubernetes ConfigMaps",
            slug: "kubernetes-configmaps",
            summary: "Create a Kubernetes ConfigMap with kubectl or YAML, use it as env vars with envFrom or as mounted files, and find out why a ConfigMap change did not apply.",
            duration: "10 min read"
          },
          {
            title: "Kubernetes Secrets",
            slug: "kubernetes-secrets",
            summary: "Create Kubernetes Secrets, mount them as env vars or files, use imagePullSecrets and TLS secrets, and learn why base64 is not encryption.",
            duration: "10 min read"
          },
          {
            title: "Kubernetes Storage",
            slug: "kubernetes-storage",
            summary: "Compare Kubernetes storage options from emptyDir to PersistentVolumes. Learn PVCs, ReadWriteOnce vs ReadWriteMany, reclaim policies and CSI drivers.",
            duration: "10 min read"
          },
          {
            title: "Persistent Volumes and PersistentVolumeClaims",
            slug: "kubernetes-pv-pvc",
            summary: "Understand Kubernetes PersistentVolumes and PVCs: static vs dynamic provisioning, access modes, reclaim policies, expansion, and why a PVC stays Pending.",
            duration: "10 min read"
          },
          {
            title: "Kubernetes StorageClasses",
            slug: "kubernetes-storage-classes",
            summary: "Learn how a Kubernetes StorageClass enables dynamic provisioning: key fields, volumeBindingMode, allowVolumeExpansion, the default class and debugging.",
            duration: "10 min read"
          },
          {
            title: "Kubernetes Namespaces",
            slug: "kubernetes-namespaces",
            summary: "Learn how Kubernetes namespaces work, which resources are namespaced, cross-namespace DNS, how to split a cluster, and fix a namespace stuck Terminating.",
            duration: "10 min read"
          },
        ],
      },
      {
        title: "Module 5: Resource Management, Helm & Monitoring",
        lessons: [
          {
            title: "Kubernetes Resource Management",
            slug: "kubernetes-resource-management",
            summary: "Learn how Kubernetes manages CPU and memory: requests vs limits, units, what happens at the limit, QoS classes, namespace controls and how to choose values.",
            duration: "10 min read"
          },
          {
            title: "Kubernetes Requests and Limits",
            slug: "kubernetes-requests-limits",
            summary: "Set Kubernetes CPU and memory requests and limits correctly. Learn the units, enforcement, QoS classes, OOMKilled, throttling, LimitRange and ResourceQuota.",
            duration: "10 min read"
          },
          {
            title: "Horizontal Pod Autoscaler",
            slug: "kubernetes-hpa",
            summary: "Set up the Kubernetes Horizontal Pod Autoscaler: the scaling formula, required resource requests, autoscaling/v2 YAML, behavior and fixing unknown targets.",
            duration: "10 min read"
          },
          {
            title: "Helm for Kubernetes",
            slug: "kubernetes-helm",
            summary: "Learn what Helm is for Kubernetes: charts, releases and repositories, how helm upgrade works, where Helm falls short, and how it compares with Kustomize.",
            duration: "10 min read"
          },
          {
            title: "Installing and Using Helm",
            slug: "kubernetes-helm-install",
            summary: "Install Helm, add a repository, read chart values, then run helm install, helm upgrade, helm list and helm uninstall to manage a release on Kubernetes.",
            duration: "10 min read"
          },
          {
            title: "Understanding Helm Charts",
            slug: "kubernetes-helm-charts",
            summary: "Learn how a Helm chart is built: directory structure, Chart.yaml, templates, built-in objects, _helpers.tpl, debugging with helm template and dependencies.",
            duration: "10 min read"
          },
          {
            title: "Helm Values, Upgrades, and Rollbacks",
            slug: "kubernetes-helm-values",
            summary: "Override Helm values with values.yaml files and --set, understand precedence, upgrade safely with --atomic, use helm rollback and fix a stuck release.",
            duration: "10 min read"
          },
          {
            title: "Kubernetes Monitoring",
            slug: "kubernetes-monitoring",
            summary: "Monitor Kubernetes with metrics-server, kubectl top, Prometheus and kube-state-metrics. Learn what to watch, which alerts matter, and how logs fit in.",
            duration: "10 min read"
          },
        ],
      },
    ],
  },
  {
    id: "terraform",
    title: "Terraform (Infrastructure as Code)",
    slug: "terraform",
    icon: "🌍",
    badge: "IaC Standard",
    description: "Provision multi-cloud infrastructure declaratively. Master HCL, state locks, reusable modules, workspaces, and CI/CD pipelines.",
    lessonsCount: 34,
    estimatedHours: 12,
    level: "Intermediate",
    modules: [
      {
        title: "Module 1: IaC Foundations & Workflow",
        lessons: [
          {
            title: "Introduction to Terraform",
            slug: "introduction-to-terraform",
            summary: "Learn what Terraform is and how Infrastructure as Code works, why it beats clicking through consoles, and how it compares to Ansible and CloudFormation.",
            duration: "10 min read"
          },
          {
            title: "Installing Terraform",
            slug: "installing-terraform",
            summary: "Install Terraform on macOS, Linux and Windows with the official package managers, verify the version, switch versions with tfenv and run your first project.",
            duration: "10 min read"
          },
          {
            title: "The Terraform Core Workflow",
            slug: "terraform-core-workflow",
            summary: "Understand the Terraform init, plan, apply and destroy loop: what each command does, how to read a plan and the mistakes that cause outages.",
            duration: "10 min read"
          },
          {
            title: "terraform init",
            slug: "terraform-init",
            summary: "Learn what terraform init does: download providers, configure the backend, write the lock file, use -upgrade and -reconfigure and run it in CI/CD.",
            duration: "10 min read"
          },
          {
            title: "terraform plan",
            slug: "terraform-plan",
            summary: "Read terraform plan symbols correctly, save a plan file with -out, target resources, detect drift and run plan in CI/CD without surprises on apply.",
            duration: "10 min read"
          },
          {
            title: "terraform apply",
            slug: "terraform-apply",
            summary: "Use terraform apply safely: review the plan, apply a saved plan file, tune parallelism, use -auto-approve in CI/CD and recover from common apply errors.",
            duration: "10 min read"
          },
          {
            title: "terraform destroy",
            slug: "terraform-destroy",
            summary: "Run terraform destroy safely: read the destroy plan, preview it first, remove single resources with -target, and keep code tidy with fmt and validate.",
            duration: "10 min read"
          },
        ],
      },
      {
        title: "Module 2: Variables, Outputs & Locals",
        lessons: [
          {
            title: "Terraform Variables and Outputs",
            slug: "terraform-variables-and-outputs",
            summary: "See how data flows through Terraform: input variables, locals and outputs, where each belongs, how variable precedence works and how to handle secrets safely.",
            duration: "10 min read"
          },
          {
            title: "Terraform Input Variables",
            slug: "terraform-input-variables",
            summary: "Declare Terraform input variables with types, defaults and validation, then set them via tfvars files, CLI flags and environment variables, including secrets.",
            duration: "10 min read"
          },
          {
            title: "Terraform Local Values",
            slug: "terraform-local-values",
            summary: "Learn how Terraform local values work, when to choose locals over input variables or data sources, and how a locals block removes repeated expressions.",
            duration: "10 min read"
          },
          {
            title: "Terraform Output Values",
            slug: "terraform-output-values",
            summary: "Declare Terraform output values, mark them sensitive, read them with the terraform output command and JSON, expose module outputs and use them in CI/CD.",
            duration: "10 min read"
          },
        ],
      },
      {
        title: "Module 3: State Management & Remote Backends",
        lessons: [
          {
            title: "Terraform State and Backends",
            slug: "terraform-state-and-backends",
            summary: "Understand why Terraform keeps state, what is inside it, how remote backends and locking make teamwork safe, and the state commands that rescue you.",
            duration: "10 min read"
          },
          {
            title: "Terraform State Overview",
            slug: "terraform-state-overview",
            summary: "Learn what Terraform state is, why terraform.tfstate exists, how it maps to real resources, and why drift, state security and locking matter.",
            duration: "10 min read"
          },
          {
            title: "Terraform Remote Backends",
            slug: "terraform-remote-backends",
            summary: "Configure a Terraform remote backend on S3 with DynamoDB state locking, bootstrap it, compare Terraform Cloud and GCS, and migrate state safely.",
            duration: "10 min read"
          },
          {
            title: "Terraform State Commands",
            slug: "terraform-state-commands",
            summary: "Use the Terraform state commands with confidence: state list, show, mv and rm, plus terraform import and refresh, and when each is safe to run.",
            duration: "10 min read"
          },
        ],
      },
      {
        title: "Module 4: Writing & Using Reusable Modules",
        lessons: [
          {
            title: "Terraform Modules",
            slug: "terraform-modules",
            summary: "Learn what Terraform modules are, when to write one, how to design a clean interface, version and source them, and move resources in without recreating them.",
            duration: "10 min read"
          },
          {
            title: "Using Terraform Modules",
            slug: "terraform-using-modules",
            summary: "Learn how to call Terraform modules with a module block from local paths or the Registry, pass inputs, pin versions, run init and use module outputs.",
            duration: "10 min read"
          },
          {
            title: "Writing Terraform Modules",
            slug: "terraform-writing-modules",
            summary: "Learn how to write a reusable Terraform module: structure main.tf, variables.tf and outputs.tf, build an S3 bucket module and call it locally.",
            duration: "10 min read"
          },
          {
            title: "Terraform Data Sources",
            slug: "terraform-data-sources",
            summary: "Learn how Terraform data sources read existing infrastructure, how the data block works, how to reference its attributes and when to use data over resource.",
            duration: "10 min read"
          },
        ],
      },
      {
        title: "Module 5: Meta-arguments & HCL Expressions",
        lessons: [
          {
            title: "Terraform count and for_each",
            slug: "terraform-count-and-for-each",
            summary: "Choose between Terraform count and for_each: see why count's positional identity can destroy resources, when each is correct and how to migrate safely.",
            duration: "10 min read"
          },
          {
            title: "Terraform Count",
            slug: "terraform-count",
            summary: "Learn how the Terraform count meta-argument works: use count.index, build conditional resources, reference counted resources and know when count fits.",
            duration: "10 min read"
          },
          {
            title: "Terraform for_each",
            slug: "terraform-for-each",
            summary: "Learn how Terraform for_each works with sets, maps and objects, how each.key and each.value are used, how to reference instances and when it beats count.",
            duration: "10 min read"
          },
          {
            title: "Terraform Expressions and Functions",
            slug: "terraform-expressions-functions",
            summary: "Learn Terraform expressions: types, references, conditionals, for expressions, key function categories, try and can, and testing in terraform console.",
            duration: "10 min read"
          },
          {
            title: "Terraform String Functions",
            slug: "terraform-string-functions",
            summary: "Work with strings in Terraform: interpolation, format, case and whitespace helpers, replace and regex functions, templatefile and conditionals.",
            duration: "10 min read"
          },
          {
            title: "Terraform Collection Functions",
            slug: "terraform-collection-functions",
            summary: "Learn Terraform collection functions such as concat, flatten, distinct and slice, plus map and set helpers and for expressions for dynamic code.",
            duration: "10 min read"
          },
          {
            title: "Terraform Dynamic Blocks",
            slug: "terraform-dynamic-blocks",
            summary: "Learn Terraform dynamic blocks: generate repeated nested blocks from a collection, with security group and IAM policy examples and the limits to respect.",
            duration: "10 min read"
          },
          {
            title: "Terraform Workspaces",
            slug: "terraform-workspaces",
            summary: "Learn how Terraform workspaces separate state, the workspace new, select and list commands, terraform.workspace in code, and when to avoid them.",
            duration: "10 min read"
          },
        ],
      },
      {
        title: "Module 6: AWS Cloud Architecture & Production CI/CD",
        lessons: [
          {
            title: "Terraform with AWS",
            slug: "terraform-with-aws",
            summary: "Configure the Terraform AWS provider, authenticate without long-lived keys using assume role and OIDC, manage regions and accounts, and tag everything.",
            duration: "10 min read"
          },
          {
            title: "Terraform AWS VPC Setup",
            slug: "terraform-aws-vpc",
            summary: "Build a custom AWS VPC with Terraform: public and private subnets, an internet gateway, route tables and a NAT gateway, explained step by step.",
            duration: "10 min read"
          },
          {
            title: "Terraform AWS EC2 Web Server",
            slug: "terraform-aws-ec2",
            summary: "Launch an EC2 web server with Terraform: add a security group, find the latest Ubuntu AMI, create a key pair, write user data and attach an Elastic IP.",
            duration: "10 min read"
          },
          {
            title: "Terraform AWS S3 Static Assets",
            slug: "terraform-aws-s3",
            summary: "Create an S3 bucket with Terraform: unique names with random_id, versioning, lifecycle rules, public access settings, a bucket policy and object uploads.",
            duration: "10 min read"
          },
          {
            title: "Terraform Provisioners",
            slug: "terraform-provisioners",
            summary: "Learn how Terraform provisioners work: local-exec, remote-exec, file and connection blocks, null_resource, and why provisioners should be a last resort.",
            duration: "10 min read"
          },
          {
            title: "Terraform CI/CD Pipeline",
            slug: "terraform-cicd-pipeline",
            summary: "Build a Terraform pipeline in GitLab CI/CD with validate, plan, manual apply and destroy stages, GitLab-managed state and secure credential handling.",
            duration: "10 min read"
          },
          {
            title: "Terraform Security",
            slug: "terraform-security",
            summary: "Secure Terraform code by scanning with tfsec and Checkov, protecting secrets in state, fixing common misconfigurations and adding checks to CI/CD.",
            duration: "10 min read"
          },
        ],
      },
    ],
  },
  {
    id: "aws",
    title: "AWS Cloud Engineering",
    slug: "aws",
    icon: "☁️",
    badge: "Cloud Leader",
    description: "Architect resilient cloud infrastructure on AWS. Master IAM, VPCs, EC2, S3, RDS, ECS/EKS, CloudWatch, Lambda, and Well-Architected patterns.",
    lessonsCount: 85,
    estimatedHours: 35,
    level: "Intermediate",
    modules: [
      {
        title: "Module 1: AWS Foundations & Setup",
        lessons: [
          {
            title: "Introduction to AWS",
            slug: "introduction-to-aws",
            summary: "Learn what AWS is in simple terms, how Regions and Availability Zones work, what the Free Tier covers and how DevOps teams use AWS to build and run systems.",
            duration: "10 min read"
          },
          {
            title: "AWS Global Infrastructure",
            slug: "aws-global-infrastructure",
            summary: "Learn how AWS is laid out: Regions, Availability Zones, Local Zones and edge locations. Choose a Region and see why cross-AZ traffic costs money.",
            duration: "10 min read"
          },
          {
            title: "Setting Up AWS",
            slug: "setting-up-aws",
            summary: "Prepare a new AWS environment before you build: pick an account structure, harden root, set up identity, add billing guardrails, enable CloudTrail, tag early.",
            duration: "10 min read"
          },
          {
            title: "AWS Account Setup",
            slug: "aws-account-setup",
            summary: "Secure a new AWS account: lock down the root user with MFA, set billing alarms, turn on CloudTrail and fix the settings that are painful to change later.",
            duration: "10 min read"
          },
          {
            title: "AWS Console Tour",
            slug: "aws-console-tour",
            summary: "Navigate the AWS Console quickly: use the search bar, avoid Region mistakes, open CloudShell, find resources with Tag Editor and know when to skip it.",
            duration: "10 min read"
          },
          {
            title: "AWS CLI Setup",
            slug: "aws-cli-setup",
            summary: "Install the AWS CLI and set it up with SSO instead of long-lived access keys. Create named profiles, learn the credential chain and stay in the right account.",
            duration: "10 min read"
          },
        ],
      },
      {
        title: "Module 2: Identity & Access Management (IAM)",
        lessons: [
          {
            title: "AWS IAM",
            slug: "aws-iam",
            summary: "Learn how AWS IAM decides who can do what: users, groups, roles and policies, policy anatomy, the evaluation order behind AccessDenied and least privilege.",
            duration: "10 min read"
          },
          {
            title: "AWS IAM Users and Groups",
            slug: "aws-iam-users-groups",
            summary: "Learn how IAM users and groups work, why AWS recommends against IAM users for people, how to keep access keys safe and how to move to IAM Identity Center.",
            duration: "10 min read"
          },
          {
            title: "AWS IAM Roles and Policies",
            slug: "aws-iam-roles-policies",
            summary: "Understand IAM roles and policies: trust vs permission policies, assuming roles with STS, managed vs inline policies, boundaries and AssumeRole errors.",
            duration: "10 min read"
          },
          {
            title: "AWS IAM Best Practices",
            slug: "aws-iam-best-practices",
            summary: "Harden IAM: replace IAM users with Identity Center, drop long-lived CI keys, lock down root, reach least privilege from usage data and set boundaries.",
            duration: "10 min read"
          },
        ],
      },
      {
        title: "Module 3: Virtual Private Cloud (VPC) & Networking",
        lessons: [
          {
            title: "AWS VPC",
            slug: "aws-vpc",
            summary: "Build an AWS VPC step by step: CIDR and subnet sizing, public vs private subnets, NAT gateway costs, VPC endpoints, security groups vs NACLs and flow logs.",
            duration: "10 min read"
          },
          {
            title: "AWS VPC Subnets",
            slug: "aws-vpc-subnets",
            summary: "Design VPC subnets properly: what makes a subnet public, CIDR sizing and the five reserved IPs, one subnet per AZ, required tags and running out of addresses.",
            duration: "10 min read"
          },
          {
            title: "AWS VPC Route Tables",
            slug: "aws-vpc-route-tables",
            summary: "How VPC route tables route traffic: the local route, longest prefix match, the main route table trap, one table per AZ and debugging no connectivity.",
            duration: "10 min read"
          },
          {
            title: "AWS NAT Gateway",
            slug: "aws-vpc-nat-gateway",
            summary: "See what an AWS NAT gateway does, why it is often the largest networking cost on your bill, and how VPC endpoints and design changes reduce it.",
            duration: "10 min read"
          },
          {
            title: "AWS Route 53",
            slug: "aws-route53",
            summary: "Get DNS working on Route 53: public and private hosted zones, the delegation step people forget, alias records, health checks and how TTL sets failover speed.",
            duration: "10 min read"
          },
          {
            title: "AWS Route 53 Records",
            slug: "aws-route53-records",
            summary: "Create the Route 53 record types you will use: A, AAAA, CNAME, MX, TXT, CAA and SRV. Covers UPSERT semantics, SPF and DMARC records and common errors.",
            duration: "10 min read"
          },
          {
            title: "AWS Route 53 Routing Policies",
            slug: "aws-route53-routing-policies",
            summary: "Choose a Route 53 routing policy: weighted, latency, failover, geolocation, geoproximity or multivalue. Learn the Set Identifier rule and why canaries drift.",
            duration: "10 min read"
          },
          {
            title: "AWS CloudFront",
            slug: "aws-cloudfront",
            summary: "Learn how CloudFront caching works: origin access control for S3, the cache key behind your hit rate, TTL header rules, invalidation costs and error pages.",
            duration: "10 min read"
          },
          {
            title: "AWS CloudFront Distributions",
            slug: "aws-cloudfront-distributions",
            summary: "Create a CloudFront distribution step by step. Learn behavior precedence, multiple origins, origin groups for failover and Functions vs Lambda@Edge.",
            duration: "10 min read"
          },
          {
            title: "AWS CloudFront SSL and Custom Domains",
            slug: "aws-cloudfront-ssl",
            summary: "Serve CloudFront on your own domain over HTTPS: request the ACM certificate in us-east-1, validate with DNS, add the alias record and pick a security policy.",
            duration: "10 min read"
          },
          {
            title: "AWS API Gateway",
            slug: "aws-api-gateway",
            summary: "Choose between API Gateway HTTP, REST and WebSocket APIs, then create an HTTP API with stages, throttling and a custom domain. Includes the 70% price gap.",
            duration: "10 min read"
          },
          {
            title: "AWS API Gateway REST APIs",
            slug: "aws-api-gateway-rest",
            summary: "Build an API Gateway REST API with resources, mapping templates and request validation, then add API keys, usage plans, caching and OpenAPI import.",
            duration: "10 min read"
          },
          {
            title: "AWS API Gateway and Lambda",
            slug: "aws-api-gateway-lambda",
            summary: "Connect API Gateway to Lambda with proxy integration and return the response shape that avoids a 502. Covers payload v1 vs v2, CORS and the 29-second limit.",
            duration: "10 min read"
          },
        ],
      },
      {
        title: "Module 4: Compute: EC2, Elastic Load Balancing & Auto Scaling",
        lessons: [
          {
            title: "AWS EC2",
            slug: "aws-ec2",
            summary: "Learn how EC2 works: instance families and sizing, pricing models, EBS vs instance store, IMDSv2, Session Manager instead of SSH, and stop vs terminate.",
            duration: "10 min read"
          },
          {
            title: "Launching an AWS EC2 Instance",
            slug: "aws-ec2-launch-instance",
            summary: "Launch an EC2 instance properly: pick an AMI without hardcoding IDs, use a launch template and user data, enforce IMDSv2 and debug a bad start.",
            duration: "10 min read"
          },
          {
            title: "AWS EC2 Instance Types",
            slug: "aws-ec2-instance-types",
            summary: "Read an EC2 instance type name, learn what each family is for, understand burstable credits and Graviton savings, and size instances from data, not guesses.",
            duration: "10 min read"
          },
          {
            title: "AWS EC2 Security Groups",
            slug: "aws-ec2-security-groups",
            summary: "Learn how EC2 security groups work as stateful firewalls: rule structure, referencing groups instead of CIDRs, default outbound rules and blocked traffic.",
            duration: "10 min read"
          },
          {
            title: "AWS EC2 Key Pairs",
            slug: "aws-ec2-key-pairs",
            summary: "Learn how EC2 key pairs work, create one for SSH, recover an instance after losing the key, and see why Session Manager is a better default than SSH.",
            duration: "10 min read"
          },
          {
            title: "AWS Elastic Load Balancing",
            slug: "aws-elastic-load-balancing",
            summary: "Choose between ALB, NLB and GWLB, then set up target groups, listener rules, health checks and TLS, and debug 502 and 503 errors from the load balancer.",
            duration: "10 min read"
          },
          {
            title: "AWS Application Load Balancer",
            slug: "aws-elb-alb",
            summary: "Create an Application Load Balancer, set up target group health checks and priority-ordered listener rules, read 502 and 503 errors and compare ALB with NLB.",
            duration: "10 min read"
          },
          {
            title: "AWS Network Load Balancer",
            slug: "aws-elb-nlb",
            summary: "Set up a Network Load Balancer for layer 4 traffic: static IPs, client IP preservation, the hairpin problem, cross-zone charges, TLS listeners and NLB vs ALB.",
            duration: "10 min read"
          },
          {
            title: "AWS Auto Scaling",
            slug: "aws-auto-scaling",
            summary: "See what scales on AWS and how: EC2 Auto Scaling vs Application Auto Scaling, scaling ECS, DynamoDB and Aurora, and why right-sizing often beats scaling.",
            duration: "10 min read"
          },
          {
            title: "AWS Auto Scaling Groups",
            slug: "aws-auto-scaling-groups",
            summary: "Set up an Auto Scaling group with launch templates, ELB vs EC2 health checks and grace periods, then deploy with instance refresh and Spot mixed instances.",
            duration: "10 min read"
          },
          {
            title: "AWS Auto Scaling Policies",
            slug: "aws-auto-scaling-policies",
            summary: "Compare target tracking, step, scheduled and predictive scaling, pick the right policy, and use warmup and cooldowns to stop flapping and bad scale-in.",
            duration: "10 min read"
          },
          {
            title: "AWS Cost Optimization",
            slug: "aws-cost-optimization",
            summary: "Cut your AWS bill in a sensible order: find where the money goes, use Savings Plans, Spot and Graviton, and fix hidden data transfer and NAT gateway charges.",
            duration: "10 min read"
          },
        ],
      },
      {
        title: "Module 5: Storage: S3, EBS & EFS",
        lessons: [
          {
            title: "AWS S3",
            slug: "aws-s3",
            summary: "Learn how Amazon S3 works: buckets and keys, storage classes, lifecycle rules, encryption, public access, versioning, presigned URLs and cost control.",
            duration: "10 min read"
          },
          {
            title: "AWS S3 Buckets",
            slug: "aws-s3-buckets",
            summary: "Create and configure an S3 bucket correctly: naming rules, the us-east-1 exception, settings to apply at creation, Object Lock and deleting a stuck bucket.",
            duration: "10 min read"
          },
          {
            title: "AWS S3 Permissions",
            slug: "aws-s3-permissions",
            summary: "Understand how S3 decides access: IAM vs bucket policies, Block Public Access, disabled ACLs, cross-account access, presigned URLs and debugging AccessDenied.",
            duration: "10 min read"
          },
          {
            title: "AWS S3 Versioning",
            slug: "aws-s3-versioning",
            summary: "Enable S3 versioning to survive overwrites and deletes. Learn how delete markers work, hidden storage costs, lifecycle rules, MFA delete and Object Lock.",
            duration: "10 min read"
          },
          {
            title: "AWS EBS Deep Dive",
            slug: "aws-ebs-deep-dive",
            summary: "Choose and tune EBS volumes: gp3 vs gp2, io2 Block Express, why the instance type caps throughput, fast snapshot restore, safe resizing and encryption.",
            duration: "10 min read"
          },
          {
            title: "AWS EFS",
            slug: "aws-efs",
            summary: "Create and mount Amazon EFS across instances and containers. Covers mount targets per AZ, the forgotten security group rule, throughput modes and EFS vs EBS.",
            duration: "10 min read"
          },
          {
            title: "AWS Athena",
            slug: "aws-athena",
            summary: "Query S3 with SQL using Athena and keep the bill low. Learn partitioning, partition projection, why Parquet beats JSON and how to cap bytes scanned per query.",
            duration: "10 min read"
          },
        ],
      },
      {
        title: "Module 6: Managed Databases & In-Memory Caching",
        lessons: [
          {
            title: "AWS RDS",
            slug: "aws-rds",
            summary: "Learn Amazon RDS: Multi-AZ vs read replicas, backups and point-in-time recovery, settings you cannot change later, why Lambda needs RDS Proxy, and cost.",
            duration: "10 min read"
          },
          {
            title: "AWS RDS Setup",
            slug: "aws-rds-setup",
            summary: "Create an RDS instance with the right choices up front: subnet groups, settings you cannot change later, parameter groups, private access and first checks.",
            duration: "10 min read"
          },
          {
            title: "AWS RDS Security",
            slug: "aws-rds-security",
            summary: "Secure an RDS database: network isolation, encryption at rest and in transit, IAM authentication, secret rotation, audit logs and deletion protection.",
            duration: "10 min read"
          },
          {
            title: "AWS DynamoDB",
            slug: "aws-dynamodb",
            summary: "Learn DynamoDB if you know SQL: partition and sort keys, designing for access patterns first, avoiding hot partitions, conditional writes, streams and TTL.",
            duration: "10 min read"
          },
          {
            title: "AWS DynamoDB Tables",
            slug: "aws-dynamodb-tables",
            summary: "Create a DynamoDB table with the AWS CLI. Choose the key schema you cannot change later, enable deletion protection and PITR, and take on-demand backups.",
            duration: "10 min read"
          },
          {
            title: "AWS DynamoDB Queries",
            slug: "aws-dynamodb-queries",
            summary: "Learn DynamoDB Query vs Scan, why filter expressions do not cut cost, how GSIs differ from LSIs, and how to paginate results and use sparse indexes.",
            duration: "10 min read"
          },
          {
            title: "AWS ElastiCache",
            slug: "aws-elasticache",
            summary: "Run ElastiCache well: pick Redis, Valkey or Memcached, start serverless, set eviction policies, implement cache-aside and handle cluster mode and failover.",
            duration: "10 min read"
          },
        ],
      },
      {
        title: "Module 7: Serverless, Messaging & Workflows",
        lessons: [
          {
            title: "AWS Lambda",
            slug: "aws-lambda",
            summary: "Learn how AWS Lambda works: the execution model, memory as CPU, cold starts, the concurrency limit, timeouts and retries, VPC networking and surprise costs.",
            duration: "10 min read"
          },
          {
            title: "AWS Lambda Functions",
            slug: "aws-lambda-functions",
            summary: "Write, package and deploy Lambda functions: handler signatures, zip vs container image packaging, layers, versions and aliases, and testing locally.",
            duration: "10 min read"
          },
          {
            title: "AWS SQS",
            slug: "aws-sqs",
            summary: "Use Amazon SQS well: Standard vs FIFO, a visibility timeout longer than processing time, long polling, idempotent consumers, dead-letter queues, monitoring.",
            duration: "10 min read"
          },
          {
            title: "AWS SQS Dead-Letter Queues",
            slug: "aws-sqs-dead-letter",
            summary: "Set up an SQS dead-letter queue with a redrive policy, choose maxReceiveCount, inspect failed messages without consuming them and redrive them safely.",
            duration: "10 min read"
          },
          {
            title: "AWS SNS",
            slug: "aws-sns",
            summary: "Build publish-subscribe messaging with Amazon SNS: set up the SNS-to-SQS fan-out pattern, use filter policies and raw message delivery and avoid email traps.",
            duration: "10 min read"
          },
          {
            title: "AWS EventBridge",
            slug: "aws-eventbridge",
            summary: "Route events with Amazon EventBridge: create buses and rules, write event patterns, schedule jobs, transform input, archive and replay events and add a DLQ.",
            duration: "10 min read"
          },
          {
            title: "AWS Step Functions",
            slug: "aws-step-functions",
            summary: "Orchestrate workflows with AWS Step Functions: Standard vs Express (a 100x cost gap), retries and catchers, Map state parallelism and debugging failed runs.",
            duration: "10 min read"
          },
          {
            title: "AWS Kinesis",
            slug: "aws-kinesis",
            summary: "Choose between Kinesis Data Streams, Firehose, SQS and MSK. Learn shards, hot partition keys, consumer lag, enhanced fan-out and how to reshard a busy stream.",
            duration: "10 min read"
          },
        ],
      },
      {
        title: "Module 8: Containers: ECR, ECS & EKS",
        lessons: [
          {
            title: "AWS ECR",
            slug: "aws-ecr",
            summary: "Push, pull and secure Docker images in Amazon ECR. Authenticate with the AWS CLI, tag images, set lifecycle policies, enable scanning and fix common errors.",
            duration: "10 min read"
          },
          {
            title: "AWS ECS vs EKS",
            slug: "aws-ecs-eks",
            summary: "Compare ECS and EKS on cost, complexity, portability and ecosystem, see where Fargate and App Runner fit, and get a short decision rule for your team.",
            duration: "10 min read"
          },
          {
            title: "AWS ECS Tasks and Services",
            slug: "aws-ecs-tasks",
            summary: "Understand ECS task definitions and services: task role vs execution role, networking modes, health checks, deployments and fixing a task that will not start.",
            duration: "10 min read"
          },
          {
            title: "AWS EKS",
            slug: "aws-eks",
            summary: "Understand how Amazon EKS runs Kubernetes on AWS: what AWS manages, node options, access entries, IRSA vs Pod Identity, add-ons and networking pitfalls.",
            duration: "10 min read"
          },
          {
            title: "AWS EKS Cluster Setup",
            slug: "aws-eks-cluster",
            summary: "Create an EKS cluster that works the first time: avoid IAM lockouts with access entries vs aws-auth, tag subnets correctly and plan for the VPC CNI IP limit.",
            duration: "10 min read"
          },
          {
            title: "AWS EKS Node Groups",
            slug: "aws-eks-nodegroups",
            summary: "Run EKS worker nodes : managed node groups vs Fargate, why Karpenter beats Cluster Autoscaler, taints, Spot interruptions and nodes that will not join.",
            duration: "10 min read"
          },
        ],
      },
      {
        title: "Module 9: Security, Governance & Systems Management",
        lessons: [
          {
            title: "AWS KMS",
            slug: "aws-kms",
            summary: "Use AWS KMS correctly: why key policies come before IAM, AWS managed vs customer managed keys, envelope encryption, encryption context, rotation and grants.",
            duration: "10 min read"
          },
          {
            title: "AWS Secrets Manager",
            slug: "aws-secrets-manager",
            summary: "Store, rotate and read secrets with AWS Secrets Manager. Covers resource policies, automatic rotation, caching, recovery windows, cost and Parameter Store.",
            duration: "10 min read"
          },
          {
            title: "AWS WAF and Shield",
            slug: "aws-waf-shield",
            summary: "Set up AWS WAF without blocking users: build a web ACL, run rules in count mode first, add rate limiting, handle false positives and weigh Shield Advanced.",
            duration: "10 min read"
          },
          {
            title: "AWS CloudWatch",
            slug: "aws-cloudwatch",
            summary: "Use CloudWatch metrics, logs, alarms and dashboards well. Covers missing EC2 metrics, log groups that never expire, alarm states and the bill.",
            duration: "10 min read"
          },
          {
            title: "AWS CloudWatch Metrics",
            slug: "aws-cloudwatch-metrics",
            summary: "Understand CloudWatch metrics: namespaces, dimensions, statistics, the EC2 metrics AWS does not publish (memory, disk), custom metric costs and metric math.",
            duration: "10 min read"
          },
          {
            title: "AWS CloudTrail",
            slug: "aws-cloudtrail",
            summary: "Go beyond the 90-day event history: create a multi-region CloudTrail trail, log management and data events, validate log files and query logs with Athena.",
            duration: "10 min read"
          },
          {
            title: "AWS Config",
            slug: "aws-config",
            summary: "Use AWS Config for continuous compliance: turn on the recorder, apply managed rules and conformance packs, auto-remediate with SSM and compare with CloudTrail.",
            duration: "10 min read"
          },
          {
            title: "AWS Systems Manager",
            slug: "aws-systems-manager",
            summary: "Set up Systems Manager and fix managed instances that do not appear, then use Run Command, Patch Manager, State Manager and Automation to manage a fleet.",
            duration: "10 min read"
          },
          {
            title: "AWS SSM Session Manager",
            slug: "aws-ssm-session-manager",
            summary: "Get a shell on EC2 with Session Manager and no SSH, bastion or open ports. Meet the prerequisites, log sessions for audit and port-forward to a database.",
            duration: "10 min read"
          },
          {
            title: "AWS SSM Parameter Store",
            slug: "aws-ssm-parameter-store",
            summary: "Store configuration and secrets in SSM Parameter Store with SecureString encryption, path hierarchies, versions, labels, standard vs advanced tiers and cost.",
            duration: "10 min read"
          },
          {
            title: "AWS Organizations",
            slug: "aws-organizations",
            summary: "Set up multi-account AWS with Organizations. Learn why separate accounts beat separate VPCs, how to design OUs, create accounts and use consolidated billing.",
            duration: "10 min read"
          },
          {
            title: "AWS Organizations SCPs",
            slug: "aws-organizations-scp",
            summary: "Write service control policies that restrict without breaking things: deny lists over allow lists, why an SCP grants nothing, break-glass roles and testing.",
            duration: "10 min read"
          },
        ],
      },
      {
        title: "Module 10: CI/CD & Infrastructure as Code",
        lessons: [
          {
            title: "AWS Elastic Beanstalk",
            slug: "aws-elastic-beanstalk",
            summary: "Deploy an app with Elastic Beanstalk without managing servers. Compare deployment policies and downtime tradeoffs, blue-green URL swaps and .ebextensions.",
            duration: "10 min read"
          },
          {
            title: "AWS CodeCommit",
            slug: "aws-codecommit",
            summary: "CodeCommit no longer accepts new customers. See what that means for existing repositories and how to migrate to GitHub or GitLab with your history intact.",
            duration: "10 min read"
          },
          {
            title: "AWS CodeBuild",
            slug: "aws-codebuild",
            summary: "Write a CodeBuild buildspec.yml that works: phases and failure behavior, caching, Docker image builds, VPC access, exported variables and build diagnosis.",
            duration: "10 min read"
          },
          {
            title: "AWS CodeDeploy",
            slug: "aws-codedeploy",
            summary: "Run blue-green and canary deployments to EC2, Lambda and ECS with CodeDeploy. Write the appspec file, add lifecycle hooks and roll back on CloudWatch alarms.",
            duration: "10 min read"
          },
          {
            title: "AWS CodePipeline",
            slug: "aws-codepipeline",
            summary: "Build a CI/CD pipeline with AWS CodePipeline: stages, source providers, artifacts, manual approvals and deploy actions, plus CodePipeline vs GitHub Actions.",
            duration: "10 min read"
          },
          {
            title: "AWS CloudFormation",
            slug: "aws-cloudformation",
            summary: "Understand AWS CloudFormation: template anatomy, deploying stacks, change sets, drift detection and stuck stacks, plus CloudFormation vs Terraform.",
            duration: "10 min read"
          },
          {
            title: "AWS CloudFormation Stacks",
            slug: "aws-cloudformation-stacks",
            summary: "Recover a CloudFormation stack stuck in UPDATE_ROLLBACK_FAILED or ROLLBACK_COMPLETE, then prevent repeats with change sets, drift checks and delete policies.",
            duration: "10 min read"
          },
          {
            title: "AWS CloudFormation Templates",
            slug: "aws-cloudformation-templates",
            summary: "Write maintainable CloudFormation templates with typed parameters, intrinsic functions, conditions, DependsOn and custom resources, then lint with cfn-lint.",
            duration: "10 min read"
          },
          {
            title: "AWS CDK",
            slug: "aws-cdk",
            summary: "Define AWS infrastructure in TypeScript or Python with CDK. Learn the three construct levels, bootstrapping, cdk diff, escape hatches and CDK vs Terraform.",
            duration: "10 min read"
          },
          {
            title: "AWS SAM",
            slug: "aws-sam",
            summary: "Build and deploy serverless apps with AWS SAM: write the template shorthand, run sam build and sam deploy --guided, test with sam local and compare with CDK.",
            duration: "10 min read"
          },
        ],
      },
    ],
  },
  {
    id: "cicd",
    title: "CI/CD Pipelines (GitLab CI)",
    slug: "cicd",
    icon: "🚀",
    badge: "Automation Core",
    description: "Build enterprise CI/CD pipelines with GitLab CI: stages, runners, caching, test reports, security scanning, environments, and rollbacks.",
    lessonsCount: 16,
    estimatedHours: 8,
    level: "Beginner",
    modules: [
      {
        title: "Module 1: Pipeline Foundations & Core Architecture",
        lessons: [
          {
            title: "Introduction to CI/CD",
            slug: "introduction-to-cicd",
            summary: "Learn what CI/CD means: how continuous integration, delivery and deployment differ, why teams need automation and what a modern pipeline looks like.",
            duration: "10 min read"
          },
          {
            title: "Getting Started with GitLab CI/CD",
            slug: "gitlab-cicd-getting-started",
            summary: "Create your first GitLab CI/CD pipeline: write a minimal three-stage .gitlab-ci.yml, understand GitLab Runners, trigger a pipeline and read the job output.",
            duration: "10 min read"
          },
          {
            title: "GitLab CI/CD Pipeline Structure: How Pipelines, Stages, Jobs, Artifacts and Cache Fit Together",
            slug: "gitlab-ci-stages-and-jobs",
            summary: "See how a GitLab pipeline is built: how pipelines, stages and jobs relate, what runners do, how needs breaks stage lockstep and where artifacts fit.",
            duration: "10 min read"
          },
          {
            title: "GitLab CI Stages and Jobs",
            slug: "gitlab-ci-stages-jobs",
            summary: "Define GitLab CI stages and jobs: the stages keyword and ordering, job scripts, core job keywords, rules and only/except conditions, and parallel jobs.",
            duration: "10 min read"
          },
          {
            title: "GitLab CI Artifacts",
            slug: "gitlab-ci-artifacts",
            summary: "Use GitLab CI artifacts to pass files between jobs and keep build output: set paths and expire_in, download from the UI, and compare dependencies with needs.",
            duration: "10 min read"
          },
          {
            title: "GitLab CI Cache",
            slug: "gitlab-ci-cache",
            summary: "Speed up GitLab CI with caching: define cache paths and keys, use cache policies, see how cache differs from artifacts and cache node_modules and pip.",
            duration: "10 min read"
          },
        ],
      },
      {
        title: "Module 2: Runners, Variables & Environments",
        lessons: [
          {
            title: "Variables, Secrets and Environments in GitLab CI",
            slug: "gitlab-ci-variables-and-secrets",
            summary: "Use GitLab CI/CD variables safely: predefined and custom variables, masked and protected values, group-level and scoped variables, and precedence rules.",
            duration: "10 min read"
          },
          {
            title: "GitLab Runners",
            slug: "gitlab-runners",
            summary: "Learn what a GitLab Runner is and how it runs jobs: shared versus specific runners, executors, installing and registering on Ubuntu, and a Docker executor.",
            duration: "10 min read"
          },
          {
            title: "GitLab CI Pipeline Rules",
            slug: "gitlab-ci-pipeline-rules",
            summary: "Control exactly when GitLab CI jobs run with rules:if, rules:changes and rules:exists, plus workflow rules, merge request pipelines and manual jobs.",
            duration: "10 min read"
          },
          {
            title: "GitLab CI Environments",
            slug: "gitlab-ci-environments",
            summary: "Track deployments with GitLab CI environments: the environment keyword, static versus dynamic environments, review apps, protected environments and approvals.",
            duration: "10 min read"
          },
        ],
      },
      {
        title: "Module 3: Testing, Security & Multi-Project Deployment",
        lessons: [
          {
            title: "GitLab CI Docker Workflows",
            slug: "gitlab-ci-docker",
            summary: "Build and push Docker images in GitLab CI: compare Docker-in-Docker with Kaniko, authenticate to the Container Registry, pick tags and follow a full example.",
            duration: "10 min read"
          },
          {
            title: "GitLab CI Testing",
            slug: "gitlab-ci-testing",
            summary: "Run tests in GitLab CI: collect JUnit reports, view results in merge requests, extract coverage with a regex, run in parallel and follow a Jest pipeline.",
            duration: "10 min read"
          },
          {
            title: "GitLab CI Security Scanning",
            slug: "gitlab-ci-security",
            summary: "Add security scanning to GitLab CI: SAST, DAST, secret detection, dependency and container scanning, and DevSecOps habits for secure pipelines.",
            duration: "10 min read"
          },
          {
            title: "GitLab CI Deploy to AWS",
            slug: "gitlab-ci-deploy-aws",
            summary: "Deploy to AWS from GitLab CI using OIDC instead of static keys, then ship to S3 and EC2, push images to ECR, update ECS services and automate Terraform runs.",
            duration: "10 min read"
          },
          {
            title: "GitLab CI Multi-Project Pipelines",
            slug: "gitlab-ci-multi-project",
            summary: "Trigger downstream pipelines in GitLab with the trigger keyword: pass variables, choose strategy depend or mirror, build child pipelines and use include.",
            duration: "10 min read"
          },
          {
            title: "GitLab CI Best Practices",
            slug: "gitlab-ci-best-practices",
            summary: "Speed up GitLab CI pipelines with better caching, DAG execution using needs, reusable include templates, YAML anchors, rules and protected deployments.",
            duration: "10 min read"
          },
        ],
      },
    ],
  },
  {
    id: "github-actions",
    title: "GitHub Actions",
    slug: "github-actions",
    icon: "⚡",
    badge: "Modern CI/CD",
    description: "Automate builds and cloud deployments directly from GitHub. Learn workflows, triggers, matrix builds, composite actions, and OIDC.",
    lessonsCount: 8,
    estimatedHours: 4,
    level: "Beginner",
    modules: [
      {
        title: "Module 1: Workflow Syntax & Triggers",
        lessons: [
          {
            title: "Introduction to GitHub Actions",
            slug: "introduction-to-github-actions",
            summary: "Learn what GitHub Actions is and how it runs your build: workflows, jobs, steps and runners, plus a first working pipeline you can commit today.",
            duration: "10 min read"
          },
          {
            title: "GitHub Actions Workflow Syntax",
            slug: "github-actions-workflow-syntax",
            summary: "Understand the YAML behind a GitHub Actions workflow: events and filters, job dependencies with needs, if conditionals, contexts and expressions.",
            duration: "10 min read"
          },
          {
            title: "GitHub Actions Secrets and Variables",
            slug: "github-actions-secrets-and-variables",
            summary: "Store workflow credentials without leaking them: repository, environment and organisation scopes, log masking and why fork pull requests get no secrets.",
            duration: "10 min read"
          },
          {
            title: "Caching Dependencies in GitHub Actions",
            slug: "github-actions-caching-dependencies",
            summary: "Speed up GitHub Actions with actions/cache: write a key that hits, use restore-keys and built-in setup caching, and see why a cache can slow a build.",
            duration: "10 min read"
          },
        ],
      },
      {
        title: "Module 2: Secrets, Matrix Builds & Cloud Deployments",
        lessons: [
          {
            title: "GitHub Actions Artifacts",
            slug: "github-actions-artifacts",
            summary: "Move files between GitHub Actions jobs and keep build output: upload-artifact v4 behaviour, retention, the immutability change and when a cache fits better.",
            duration: "10 min read"
          },
          {
            title: "GitHub Actions Matrix Builds",
            slug: "github-actions-matrix-builds",
            summary: "Run one GitHub Actions job across many versions and platforms: matrix syntax, include and exclude, fail-fast, max-parallel and avoiding a runaway matrix.",
            duration: "10 min read"
          },
          {
            title: "Build and Push Docker Images with GitHub Actions",
            slug: "github-actions-docker-build-push",
            summary: "Build and push Docker images with GitHub Actions: set up Buildx, log in to GHCR or ECR, use layer caching that works, tag sensibly and build multi-arch.",
            duration: "10 min read"
          },
          {
            title: "Deploy to AWS from GitHub Actions with OIDC",
            slug: "github-actions-deploy-aws-oidc",
            summary: "Deploy to AWS from GitHub Actions without stored keys: create the OIDC provider, write the IAM trust policy claim by claim, scope sub and fix common errors.",
            duration: "10 min read"
          },
        ],
      },
    ],
  },
  {
    id: "git",
    title: "Git & Version Control",
    slug: "git",
    icon: "🌿",
    badge: "Foundation",
    description: "Master professional Git workflows: branching, three-way merges, interactive rebase, cherry-pick, stash, bisect, and pull request hygiene.",
    lessonsCount: 17,
    estimatedHours: 6,
    level: "Beginner",
    modules: [
      {
        title: "Module 1: Git Core Fundamentals",
        lessons: [
          {
            title: "Introduction to Git",
            slug: "introduction-to-git",
            summary: "Learn what Git is and why version control matters: distributed versus centralized systems, how Git stores history and the key terms to know first.",
            duration: "10 min read"
          },
          {
            title: "Installing Git",
            slug: "installing-git",
            summary: "Install Git on macOS, Linux and Windows, then configure what matters: your identity, default branch, editor and .gitattributes for consistent line endings.",
            duration: "10 min read"
          },
          {
            title: "Git Basics",
            slug: "git-basics",
            summary: "Learn the everyday Git loop with init, clone, status, add, commit, log and diff, understand the staging area and build checks to run before every commit.",
            duration: "10 min read"
          },
          {
            title: "Git Branching",
            slug: "git-branching",
            summary: "Learn what a Git branch really is, git switch versus checkout, how HEAD and detached HEAD work, and how to delete, rename and name branches well.",
            duration: "10 min read"
          },
          {
            title: "Git Merging",
            slug: "git-merging",
            summary: "Learn git merge: fast-forward versus three-way merges, resolving conflict markers step by step, --no-ff and squash merges, and aborting a bad merge.",
            duration: "10 min read"
          },
          {
            title: "Git Rebasing",
            slug: "git-rebasing",
            summary: "Use git rebase for a linear history: basic and interactive rebase, squashing, recovering with --abort and reflog, force-with-lease, and when to merge instead.",
            duration: "10 min read"
          },
        ],
      },
      {
        title: "Module 2: Branching, Merging & Remote Collaboration",
        lessons: [
          {
            title: "Git Remote",
            slug: "git-remote",
            summary: "Work with Git remotes confidently: fetch versus pull, fixing a rejected push without force, upstream tracking, pruning branches and origin versus upstream.",
            duration: "10 min read"
          },
          {
            title: "Git Stash",
            slug: "git-stash",
            summary: "Park work in progress with git stash: apply versus pop, stash untracked files, name and inspect stashes, and decide when a branch is the better tool instead.",
            duration: "10 min read"
          },
          {
            title: "Undoing Changes in Git",
            slug: "git-undoing-changes",
            summary: "Undo almost anything in Git: restore files, reset soft, mixed and hard, revert on shared branches, clean untracked files and recover a bad reset with reflog.",
            duration: "10 min read"
          },
          {
            title: "Git Tagging",
            slug: "git-tagging",
            summary: "Mark releases with Git tags: lightweight versus annotated, why push ignores tags, deleting them safely, tagging older commits and semantic-versioned releases.",
            duration: "10 min read"
          },
          {
            title: "GitHub Workflow with Git",
            slug: "git-github-workflow",
            summary: "Follow the GitHub pull request workflow end to end: fork versus clone, keeping a branch current, squash versus merge versus rebase, and reviewing well.",
            duration: "10 min read"
          },
        ],
      },
      {
        title: "Module 3: Interactive Rebase, History & GitOps Workflows",
        lessons: [
          {
            title: "Advanced Git",
            slug: "git-advanced",
            summary: "Learn advanced Git: cherry-pick a commit, find a regression with git bisect, recover lost work with reflog and trace changes with blame, in learning order.",
            duration: "10 min read"
          },
          {
            title: "Git Hooks",
            slug: "git-hooks",
            summary: "Automate checks at commit and push time with Git hooks: where they live, why they never reach your team, client versus server hooks, --no-verify and Husky.",
            duration: "10 min read"
          },
          {
            title: "Git Workflows",
            slug: "git-workflows",
            summary: "Compare GitFlow, GitHub Flow and trunk-based development honestly, see which suits which team, why long-lived branches hurt and how feature flags help.",
            duration: "10 min read"
          },
          {
            title: "Git Aliases and Configuration",
            slug: "git-aliases-config",
            summary: "Configure Git once and stop fighting it: .gitconfig scopes, per-directory identities with includeIf, handy aliases and the defaults worth changing.",
            duration: "10 min read"
          },
          {
            title: "Git Submodules",
            slug: "git-submodules",
            summary: "Pin one repository inside another with Git submodules: clone with --recurse-submodules, know the two update commands, handle detached HEAD and subtrees.",
            duration: "10 min read"
          },
          {
            title: "Git Commit Messages",
            slug: "git-commit-messages",
            summary: "Write Git commit messages that stay useful: an imperative summary, a body that records why, Conventional Commits and enforcement with commitlint and Husky.",
            duration: "10 min read"
          },
        ],
      },
    ],
  },
  {
    id: "linux",
    title: "Linux & Shell Scripting",
    slug: "linux",
    icon: "🐧",
    badge: "Foundation",
    description: "Essential Linux administration for DevOps: systemd, file permissions, users, cron, bash scripting, networking, storage, and troubleshooting.",
    lessonsCount: 19,
    estimatedHours: 8,
    level: "Beginner",
    modules: [
      {
        title: "Module 1: Linux CLI & Filesystem Hierarchy",
        lessons: [
          {
            title: "Introduction to Linux",
            slug: "introduction-to-linux",
            summary: "Learn what Linux is: kernel versus distribution versus shell, which distro to learn for DevOps, and why servers and containers overwhelmingly run Linux.",
            duration: "10 min read"
          },
          {
            title: "Linux Filesystem",
            slug: "linux-filesystem",
            summary: "Learn the Linux directory tree: what /etc, /var and /usr hold, /tmp versus /var/tmp, virtual /proc and /sys, and the places where disks tend to fill up.",
            duration: "10 min read"
          },
          {
            title: "Linux Navigation",
            slug: "linux-navigation",
            summary: "Move around Linux with confidence: absolute versus relative paths, reading ls -l output, which versus type, man pages and fixing command not found errors.",
            duration: "10 min read"
          },
          {
            title: "Linux File Operations",
            slug: "linux-file-operations",
            summary: "Copy, move, delete and read files safely on Linux: why rm has no undo, cp -r versus cp -a, the trailing-slash trap, find by name and size, less versus tail.",
            duration: "10 min read"
          },
          {
            title: "Linux Text Processing",
            slug: "linux-text-processing",
            summary: "Use grep, sed, awk, sort and uniq for real work: pick the right tool for each question, avoid the sed -i portability trap and see why errors vanish in pipes.",
            duration: "10 min read"
          },
          {
            title: "Linux Permissions",
            slug: "linux-permissions",
            summary: "Understand Linux permissions: rwx for user, group and other, octal modes like 755 and 644, chmod versus chown, setuid, the sticky bit and umask defaults.",
            duration: "10 min read"
          },
          {
            title: "Linux Users and Groups",
            slug: "linux-users-groups",
            summary: "Manage Linux accounts safely: useradd versus adduser, why usermod -aG needs a new login, the destructive -G mistake, sudo versus su and the account files.",
            duration: "10 min read"
          },
        ],
      },
      {
        title: "Module 2: Permissions, Ownership & Process Management",
        lessons: [
          {
            title: "Linux Process Management",
            slug: "linux-process-management",
            summary: "Find, watch and stop Linux processes: use ps and top, send SIGTERM before SIGKILL, spot zombie states, read load average and find which process owns a port.",
            duration: "10 min read"
          },
          {
            title: "Linux systemd Basics",
            slug: "linux-systemd",
            summary: "Manage Linux services with systemctl: start versus enable, daemon-reload after edits, writing a unit file, what Type= controls and reading logs.",
            duration: "10 min read"
          },
          {
            title: "Linux Networking",
            slug: "linux-networking",
            summary: "Diagnose Linux networking with ip and ss instead of ifconfig and netstat, learn why ping proves little, debug DNS with dig and choose rsync over scp.",
            duration: "10 min read"
          },
          {
            title: "Linux Disk and Storage",
            slug: "linux-disk-storage",
            summary: "Find and fix Linux disk problems: why df and du disagree, deleted-but-open files, inode exhaustion, persistent mounts by UUID in fstab and tar versus zip.",
            duration: "10 min read"
          },
          {
            title: "Linux Bash Scripting",
            slug: "linux-bash-scripting",
            summary: "Write bash scripts that fail loudly, not silently: use set -euo pipefail, quote variables, prefer [[ ]] over [ ], clean up with trap and lint with shellcheck.",
            duration: "10 min read"
          },
          {
            title: "Linux Package Management",
            slug: "linux-package-management",
            summary: "Install software on any distro: apt versus apt-get, remove versus purge, fixing dpkg lock errors, dnf and rpm on Red Hat systems, and when snap is worth it.",
            duration: "10 min read"
          },
        ],
      },
      {
        title: "Module 3: Networking, Systemd & Shell Scripting",
        lessons: [
          {
            title: "Linux Environment Variables",
            slug: "linux-environment-variables",
            summary: "Learn Linux environment variables: shell versus exported variables, .bashrc versus .bash_profile, extending PATH safely and why sudo drops your environment.",
            duration: "10 min read"
          },
          {
            title: "Linux Cron Jobs",
            slug: "linux-cron-jobs",
            summary: "Schedule jobs with crontab: the five time fields, common examples, why a script that works manually fails in cron, capturing output, and systemd timers.",
            duration: "10 min read"
          },
          {
            title: "Linux SSH Keys",
            slug: "linux-ssh-keys",
            summary: "Set up SSH keys properly: generate Ed25519 keys with ssh-keygen, fix permission errors that block a valid key, use ssh-agent, ~/.ssh/config and ProxyJump.",
            duration: "10 min read"
          },
          {
            title: "Linux Firewall Basics",
            slug: "linux-firewall",
            summary: "Set up a Linux firewall without locking yourself out: compare ufw, firewalld and iptables, allow SSH first, default deny, zones and persistent rules.",
            duration: "10 min read"
          },
          {
            title: "Linux Log Management",
            slug: "linux-log-management",
            summary: "Find what went wrong in Linux logs: /var/log versus the systemd journal, tail -F over -f, grep filtering, logrotate, journald size caps and error triage.",
            duration: "10 min read"
          },
          {
            title: "Linux Performance Monitoring and Troubleshooting",
            slug: "linux-performance",
            summary: "Triage Linux performance in order: CPU, memory and I/O. Learn what load average counts, why free memory looks low and how to read iowait with vmstat.",
            duration: "10 min read"
          },
        ],
      },
    ],
  },
];
