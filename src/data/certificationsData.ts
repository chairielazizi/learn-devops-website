export interface ExamQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ExamDomain {
  name: string;
  weight: number;
  topics: string[];
  competencies: string[];
}

export interface CertificationGuide {
  id: string;
  slug: string;
  title: string;
  code: string;
  providerId: "cncf" | "hashicorp" | "aws" | "azure" | "gcp";
  providerName: string;
  providerBadgeColor: string;
  level: "Associate" | "Professional" | "Specialty";
  cost: string;
  duration: string;
  format: string;
  passingScore: string;
  officialUrl: string;
  documentationUrl: string;
  playgroundUrl?: string;
  tutorialUrl?: string;
  description: string;
  prerequisites: string;
  domains: ExamDomain[];
  tips: string[];
  pitfalls: string[];
  sampleQuestions: ExamQuestion[];
}

export interface CertificationProvider {
  id: "cncf" | "hashicorp" | "aws" | "azure" | "gcp";
  name: string;
  shortName: string;
  description: string;
  badgeColor: string;
  accentBorder: string;
  iconBg: string;
  examCount: number;
}

export const CERTIFICATION_PROVIDERS: CertificationProvider[] = [
  {
    id: "cncf",
    name: "Cloud Native Computing Foundation (CNCF / Linux Foundation)",
    shortName: "Kubernetes & CNCF",
    description: "Hands-on, terminal-based performance exams for container orchestration, security, and cloud-native architecture.",
    badgeColor: "from-blue-500 to-indigo-600",
    accentBorder: "border-blue-500/30 hover:border-blue-500/60",
    iconBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    examCount: 4
  },
  {
    id: "hashicorp",
    name: "HashiCorp Certified",
    shortName: "HashiCorp (Terraform & Vault)",
    description: "Industry-standard Infrastructure as Code, zero-trust secrets management, and service networking credentials.",
    badgeColor: "from-purple-500 to-indigo-700",
    accentBorder: "border-purple-500/30 hover:border-purple-500/60",
    iconBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    examCount: 2
  },
  {
    id: "aws",
    name: "Amazon Web Services (AWS) Training & Certification",
    shortName: "Amazon Web Services",
    description: "World-leading cloud credentials validating multi-tier CI/CD pipelines, automated operations, and resilient cloud architectures.",
    badgeColor: "from-amber-500 to-orange-600",
    accentBorder: "border-orange-500/30 hover:border-orange-500/60",
    iconBg: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    examCount: 3
  },
  {
    id: "azure",
    name: "Microsoft Certified (Azure DevOps & Infrastructure)",
    shortName: "Microsoft Azure",
    description: "Enterprise DevOps, GitHub Enterprise integration, Azure Pipelines, and cloud administration mastery.",
    badgeColor: "from-sky-500 to-blue-700",
    accentBorder: "border-sky-500/30 hover:border-sky-500/60",
    iconBg: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    examCount: 2
  },
  {
    id: "gcp",
    name: "Google Cloud Certified",
    shortName: "Google Cloud Platform",
    description: "Premier Site Reliability Engineering (SRE), GKE deployment, delivery pipelines, and cloud architecture expertise.",
    badgeColor: "from-emerald-500 to-teal-600",
    accentBorder: "border-emerald-500/30 hover:border-emerald-500/60",
    iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    examCount: 2
  }
];

export const CERTIFICATIONS: CertificationGuide[] = [
  {
    "id": "cka",
    "slug": "cka",
    "title": "Certified Kubernetes Administrator (CKA)",
    "code": "CKA",
    "providerId": "cncf",
    "providerName": "Linux Foundation / CNCF",
    "providerBadgeColor": "from-blue-500 to-indigo-600",
    "level": "Professional",
    "cost": "$395 USD",
    "duration": "2 Hours (120 Mins)",
    "format": "100% Performance-based hands-on terminal exam",
    "passingScore": "66%",
    "officialUrl": "https://www.cncf.io/certification/cka/",
    "documentationUrl": "https://kubernetes.io/docs/home/",
    "playgroundUrl": "/playground/kubernetes/cka",
    "tutorialUrl": "/tutorials/kubernetes",
    "description": "The industry benchmark for Kubernetes operators and DevOps cluster architects. Tests live terminal ability to install, configure, upgrade, troubleshoot, secure, and maintain multi-node production clusters.",
    "prerequisites": "Proficiency with Linux CLI commands, container concepts, basic networking, and YAML syntax.",
    "domains": [
      {
        "name": "Troubleshooting",
        "weight": 30,
        "topics": [
          "Troubleshoot cluster worker and master nodes (kubelet systemd status, journalctl, containerd logs)",
          "Debug crashing application pods (CrashLoopBackOff, ImagePullBackOff, OOMKilled)",
          "Investigate cluster component failure (kube-apiserver, kube-controller-manager, kube-scheduler, kube-proxy)",
          "Diagnose network connectivity, coreDNS resolution issues, and flannel/calico CNI routing"
        ],
        "competencies": [
          "Check systemctl status kubelet and journalctl -u kubelet -f to diagnose service startup failures",
          "Inspect container logs with kubectl logs --previous and describe pod events",
          "Fix misconfigured static pod manifests in /etc/kubernetes/manifests/"
        ]
      },
      {
        "name": "Cluster Architecture, Installation & Configuration",
        "weight": 25,
        "topics": [
          "Manage role-based access control (RBAC): Roles, RoleBindings, ClusterRoles, and ClusterRoleBindings",
          "Bootstrap a production cluster using kubeadm init and kubeadm join",
          "Perform live cluster version upgrades on control plane and worker nodes via kubeadm and apt",
          "Implement etcd v3 snapshot backup and disaster recovery restore"
        ],
        "competencies": [
          "Execute ETCDCTL_API=3 etcdctl snapshot save /var/lib/backup/etcd.db with proper client certificates",
          "Safely drain nodes with kubectl drain --ignore-daemonsets --delete-emptydir-data before maintenance",
          "Upgrade kubeadm, kubelet, and kubectl sequentially without taking down live workloads"
        ]
      },
      {
        "name": "Services & Networking",
        "weight": 20,
        "topics": [
          "Configure and diagnose ClusterIP, NodePort, and LoadBalancer services",
          "Define Ingress resources with host rules, path prefixes, and backend service targets",
          "Deploy and enforce NetworkPolicies (ingress/egress rules, namespace selectors, pod selectors)",
          "Configure CoreDNS custom stubs and verify DNS lookup behavior via nslookup/dig"
        ],
        "competencies": [
          "Create network policies isolating backend database pods from untrusted frontends",
          "Verify DNS resolution using ephemeral debug pods: kubectl run dns-test --image=busybox:1.28 --rm -it -- nslookup ...",
          "Expose internal deployments via NodePort ranges (30000-32767)"
        ]
      },
      {
        "name": "Workloads & Scheduling",
        "weight": 15,
        "topics": [
          "Manage Deployments, Rolling Updates, and fast Rollbacks",
          "Configure pod resource requests and limits to ensure fair sharing and QoS classes",
          "Implement node selectors, node affinity, taints, and tolerations",
          "Configure multi-container pods, initContainers, and sidecar logging patterns"
        ],
        "competencies": [
          "Generate YAML quickly with imperative flags: kubectl create deployment web --image=nginx --replicas=3 --dry-run=client -o yaml",
          "Taint nodes with key=value:NoSchedule and apply matching tolerations in pod specs",
          "Configure initContainers to wait for database availability before booting web services"
        ]
      },
      {
        "name": "Storage",
        "weight": 10,
        "topics": [
          "Configure PersistentVolumes (PV) and PersistentVolumeClaims (PVC)",
          "Configure StorageClasses with dynamic volume provisioning",
          "Mount volumes into pods and verify data persistence across pod restarts",
          "Understand volume access modes (ReadWriteOnce, ReadOnlyMany, ReadWriteMany)"
        ],
        "competencies": [
          "Write PV and PVC specs with matching storage capacities, access modes, and storageClassName",
          "Mount PVCs as volumeMounts inside pod container definitions"
        ]
      }
    ],
    "tips": [
      "Set your bash aliases immediately upon exam start: alias k=kubectl and export do='--dry-run=client -o yaml'.",
      "Do NOT hand-write YAML from scratch: always generate an imperative skeleton with k run or k create ... $do > pod.yaml and edit with vim.",
      "Practice etcd snapshot backup and restore repeatedly until you can perform the full sequence in under 4 minutes.",
      "Use our hands-on CKA simulator playground (/playground/kubernetes/cka) to practice live terminal troubleshooting.",
      "Keep the official Kubernetes documentation tab open; familiarize yourself with search keywords for fast copying."
    ],
    "pitfalls": [
      "Forgetting to switch cluster contexts between questions: ALWAYS run the provided kubectl config use-context command first.",
      "Editing static pod manifests while kubelet is stopped or placing them in the wrong directory.",
      "Failing to uncordon worker nodes after maintenance upgrades, preventing new pods from being scheduled."
    ],
    "sampleQuestions": [
      {
        "question": "A worker node 'node-02' enters 'NotReady' status. Application pods on this node are failing. How do you diagnose and recover the node?",
        "options": [
          "Reboot the node immediately and re-run kubeadm init.",
          "SSH into node-02, check systemctl status kubelet, inspect journalctl -u kubelet -xe, check swap status and containerd service, fix the issue and restart kubelet.",
          "Delete the node from the cluster with kubectl delete node node-02 and recreate it with kubeadm join.",
          "Edit /etc/kubernetes/admin.conf on the worker node."
        ],
        "correctIndex": 1,
        "explanation": "Worker node NotReady states are almost universally caused by kubelet crashes, swap being enabled unexpectedly, disk pressure, or container runtime (containerd) service failure. SSHing directly and checking systemd journals provides immediate diagnostic clarity."
      }
    ]
  },
  {
    "id": "ckad",
    "slug": "ckad",
    "title": "Certified Kubernetes Application Developer (CKAD)",
    "code": "CKAD",
    "providerId": "cncf",
    "providerName": "Linux Foundation / CNCF",
    "providerBadgeColor": "from-blue-500 to-indigo-600",
    "level": "Professional",
    "cost": "$395 USD",
    "duration": "2 Hours (120 Mins)",
    "format": "100% Performance-based hands-on terminal exam",
    "passingScore": "66%",
    "officialUrl": "https://www.cncf.io/certification/ckad/",
    "documentationUrl": "https://kubernetes.io/docs/concepts/workloads/",
    "playgroundUrl": "/playground/kubernetes/lab",
    "tutorialUrl": "/tutorials/kubernetes",
    "description": "Focuses on designing, building, configuring, and exposing cloud-native applications on Kubernetes. Perfect for developers, DevOps pipeline authors, and site reliability engineers.",
    "prerequisites": "Experience building container images (Dockerfiles) and deploying applications to Kubernetes clusters.",
    "domains": [
      {
        "name": "Application Environment, Configuration & Security",
        "weight": 25,
        "topics": [
          "Use ConfigMaps and Secrets as environment variables, envFrom, and mounted volumes",
          "Define SecurityContext (runAsUser, runAsGroup, readOnlyRootFilesystem, capabilities)",
          "Configure ServiceAccounts and associate them with Pod definitions"
        ],
        "competencies": [
          "Mount sensitive tokens using secretKeyRef or secret volume mounts",
          "Enforce non-root execution and drop Linux capabilities like NET_RAW"
        ]
      },
      {
        "name": "Application Design and Build",
        "weight": 20,
        "topics": [
          "Define multi-container pods: sidecar, adapter, and ambassador patterns",
          "Implement Jobs and CronJobs for batch workloads with concurrencyPolicies",
          "Build and deploy minimal OCI container images"
        ],
        "competencies": [
          "Configure shared emptyDir volumes between application and log-shipping sidecar containers",
          "Set successfulJobsHistoryLimit and startingDeadlineSeconds on CronJobs"
        ]
      },
      {
        "name": "Application Deployment",
        "weight": 20,
        "topics": [
          "Manage rolling deployments, revision history, and canary releases",
          "Implement blue-green deployment strategies using service selector shifts",
          "Manage Helm charts, custom values, and package releases"
        ],
        "competencies": [
          "Execute kubectl rollout undo deployment/api --to-revision=2",
          "Tune maxSurge and maxUnavailable to guarantee zero downtime"
        ]
      },
      {
        "name": "Services and Networking",
        "weight": 20,
        "topics": [
          "Expose pods via Service endpoints and NetworkPolicies",
          "Configure Ingress resources with TLS termination and path rewrites"
        ],
        "competencies": [
          "Write NetworkPolicy manifests restricting traffic to specific namespace labels",
          "Expose TCP microservices to internal cluster consumers"
        ]
      },
      {
        "name": "Application Observability and Maintenance",
        "weight": 15,
        "topics": [
          "Configure Liveness, Readiness, and Startup probes (httpGet, tcpSocket, exec)",
          "Inspect container logs and troubleshoot crashing containers",
          "Monitor pod CPU and memory utilization with kubectl top"
        ],
        "competencies": [
          "Prevent premature traffic routing by configuring accurate readiness probes",
          "Recover failing pods by inspecting kubectl describe events and exit codes"
        ]
      }
    ],
    "tips": [
      "Use imperative commands for CronJobs: kubectl create cronjob report --image=busybox --schedule='*/5 * * * *' -- date.",
      "Speed is everything on CKAD: master tmux split-panes and vim syntax shortcuts.",
      "Know how to test readiness probes quickly using curl or netcat inside debug containers."
    ],
    "pitfalls": [
      "Forgetting that ConfigMap keys with underscores or hyphens must be quoted properly in YAML.",
      "Not waiting for rollout status to finish before moving to the next question."
    ],
    "sampleQuestions": [
      {
        "question": "Which probe should be used to delay traffic forwarding until a Java Spring Boot application finishes loading its database connection pool?",
        "options": [
          "Liveness probe only",
          "Readiness probe pointing to the /actuator/health endpoint",
          "A manual sleep command inside the container entrypoint",
          "A horizontal pod autoscaler"
        ],
        "correctIndex": 1,
        "explanation": "Readiness probes gate whether a pod's IP is added to the backing Service Endpoints. If a readiness probe fails or is initializing, the pod will not receive live client requests, preventing 502/503 errors during cold boots."
      }
    ]
  },
  {
    "id": "cks",
    "slug": "cks",
    "title": "Certified Kubernetes Security Specialist (CKS)",
    "code": "CKS",
    "providerId": "cncf",
    "providerName": "Linux Foundation / CNCF",
    "providerBadgeColor": "from-blue-500 to-indigo-600",
    "level": "Specialty",
    "cost": "$395 USD",
    "duration": "2 Hours (120 Mins)",
    "format": "100% Performance-based hands-on security exam",
    "passingScore": "67%",
    "officialUrl": "https://www.cncf.io/certification/cks/",
    "documentationUrl": "https://kubernetes.io/docs/concepts/security/",
    "playgroundUrl": "/playground/kubernetes/lab",
    "tutorialUrl": "/tutorials/kubernetes",
    "description": "The elite security certification for cloud-native architects. Validates expertise in securing container supply chains, hardening host operating systems, configuring Falco runtime threat detection, AppArmor, seccomp, and admission controllers.",
    "prerequisites": "Must hold an active CKA certification before attempting CKS.",
    "domains": [
      {
        "name": "Cluster Setup & Hardening",
        "weight": 20,
        "topics": [
          "Configure CIS benchmark compliance with kube-bench",
          "Enforce secure Ingress with TLS ciphers and mutual authentication",
          "Protect node metadata APIs and restrict network access to etcd"
        ],
        "competencies": [
          "Run kube-bench against control plane components and remediate insecure flags in apiserver manifests",
          "Configure RBAC with least privilege and audit unused ServiceAccounts"
        ]
      },
      {
        "name": "System Hardening",
        "weight": 20,
        "topics": [
          "Configure AppArmor profiles and enforce them on pods",
          "Apply Seccomp security profiles to restrict dangerous Linux system calls",
          "Reduce host attack surface by removing root privileges and disabling unused services"
        ],
        "competencies": [
          "Load apparmor_parser -q /etc/apparmor.d/custom-profile and annotate pod specs",
          "Restrict container capabilities with securityContext.capabilities.drop: ['ALL']"
        ]
      },
      {
        "name": "Minimize Microservice Vulnerabilities",
        "weight": 20,
        "topics": [
          "Scan container images with Trivy for known CVEs",
          "Manage Kubernetes Secrets securely with encrypted etcd at rest (EncryptionConfiguration)",
          "Enforce Pod Security Standards (Privileged, Baseline, Restricted) via namespace labels"
        ],
        "competencies": [
          "Configure encryption-provider-config.yaml with a secretbox AES-CBC provider",
          "Label namespaces with pod-security.kubernetes.io/enforce=restricted"
        ]
      },
      {
        "name": "Supply Chain Security",
        "weight": 20,
        "topics": [
          "Configure ImagePolicyWebhook and ValidatingAdmissionPolicy",
          "Verify container image signatures and provenance using Cosign",
          "Leverage minimal multi-stage Docker builds (Distroless / Scratch)"
        ],
        "competencies": [
          "Block untrusted registry pulls via AdmissionController admission plugins",
          "Identify and remove unpinned image tags and package managers from production images"
        ]
      },
      {
        "name": "Monitoring, Logging & Runtime Security",
        "weight": 20,
        "topics": [
          "Configure Falco rules to detect unauthorized shell spawns and root file access",
          "Investigate Kubernetes audit logs to detect API tampering and credential theft",
          "Detect container drift and process execution anomalies"
        ],
        "competencies": [
          "Write Falco custom rule syntax in /etc/falco/falco_rules.local.yaml",
          "Analyze /var/log/kubernetes/audit/audit.log using jq and grep"
        ]
      }
    ],
    "tips": [
      "Review the EncryptionConfiguration YAML syntax before the exam so you can configure etcd encryption at rest quickly.",
      "Understand how to parse Falco alert output and identify rule violations in /var/log/syslog.",
      "Always verify that kube-apiserver recovers after editing its static manifest by running crictl ps."
    ],
    "pitfalls": [
      "Indentation mistakes in static pod manifests that prevent kube-apiserver from rebooting.",
      "Forgetting to load AppArmor profiles into the Linux kernel before referencing them in pods."
    ],
    "sampleQuestions": [
      {
        "question": "How do you ensure all secrets written to etcd are encrypted at rest rather than stored as plaintext base64?",
        "options": [
          "Enable HTTPS on kubelet port 10250.",
          "Create an EncryptionConfiguration YAML file with a provider like aescbc, and pass --encryption-provider-config to the kube-apiserver manifest.",
          "Install Calico CNI with WireGuard encryption.",
          "Encode secrets twice with base64."
        ],
        "correctIndex": 1,
        "explanation": "Kubernetes requires passing an EncryptionConfiguration file to the kube-apiserver static manifest via --encryption-provider-config. After applying, existing secrets must be refreshed with 'kubectl get secrets --all-namespaces -o json | kubectl replace -f -' to encrypt historical entries."
      }
    ]
  },
  {
    "id": "kcna",
    "slug": "kcna",
    "title": "Kubernetes and Cloud Native Associate (KCNA)",
    "code": "KCNA",
    "providerId": "cncf",
    "providerName": "Linux Foundation / CNCF",
    "providerBadgeColor": "from-blue-500 to-indigo-600",
    "level": "Associate",
    "cost": "$250 USD",
    "duration": "90 Minutes",
    "format": "Multiple Choice / Multiple Select (60 Questions)",
    "passingScore": "75%",
    "officialUrl": "https://www.cncf.io/certification/kcna/",
    "documentationUrl": "https://www.cncf.io/",
    "playgroundUrl": "/playground/kubernetes",
    "tutorialUrl": "/tutorials/kubernetes",
    "description": "Entry-level certification covering the full CNCF cloud native landscape: GitOps, container runtimes, observability, microservices architecture, and SRE best practices.",
    "prerequisites": "Foundational understanding of containers, cloud architecture, and modern software development.",
    "domains": [
      {
        "name": "Kubernetes Fundamentals",
        "weight": 46,
        "topics": [
          "Pods, Nodes, Architecture, API resources, controllers"
        ],
        "competencies": [
          "Understand core control plane vs worker node responsibilities"
        ]
      },
      {
        "name": "Container Orchestration",
        "weight": 22,
        "topics": [
          "Container runtimes (containerd, CRI-O), networking, storage"
        ],
        "competencies": [
          "Differentiate OCI image specs from runtime specifications"
        ]
      },
      {
        "name": "Cloud Native Architecture",
        "weight": 16,
        "topics": [
          "12-factor apps, autoscaling, microservices, service meshes"
        ],
        "competencies": [
          "Identify how service meshes like Linkerd/Istio decouple traffic management"
        ]
      },
      {
        "name": "Cloud Native Observability",
        "weight": 8,
        "topics": [
          "Prometheus metrics, OpenTelemetry, Grafana dashboards, Fluentd logging"
        ],
        "competencies": [
          "Understand pull vs push monitoring architecture"
        ]
      },
      {
        "name": "Cloud Native Application Delivery",
        "weight": 8,
        "topics": [
          "GitOps, CI/CD, Helm, ArgoCD, Flux"
        ],
        "competencies": [
          "Explain declarative synchronization loops in GitOps"
        ]
      }
    ],
    "tips": [
      "Review the CNCF Landscape interactive map to recognize prominent graduated and incubating projects.",
      "Understand the difference between OpenTelemetry, Prometheus, and Jaeger.",
      "Great starting credential before pursuing hands-on CKA and CKAD exams."
    ],
    "pitfalls": [
      "Confusing container runtimes (runc vs containerd vs CRI-O).",
      "Overlooking GitOps reconciliation principles."
    ],
    "sampleQuestions": [
      {
        "question": "What is the primary operational benefit of using a GitOps controller like ArgoCD or Flux?",
        "options": [
          "It compiles source code faster than Jenkins.",
          "It continuously reconciles the desired state in a Git repository with the live cluster state, automatically remedying drift.",
          "It provides a free relational database inside the cluster.",
          "It eliminates the need for container images."
        ],
        "correctIndex": 1,
        "explanation": "GitOps uses Git as the single source of truth. Continuous reconciliation loops pull the desired state from Git and apply it to Kubernetes, preventing unauthorized manual drift."
      }
    ]
  },
  {
    "id": "terraform-associate",
    "slug": "terraform-associate",
    "title": "HashiCorp Certified: Terraform Associate (003)",
    "code": "Terraform-003",
    "providerId": "hashicorp",
    "providerName": "HashiCorp",
    "providerBadgeColor": "from-purple-500 to-indigo-700",
    "level": "Associate",
    "cost": "$70.50 USD",
    "duration": "1 Hour (60 Mins)",
    "format": "Multiple Choice / Multiple Answer / Text Match (57 Questions)",
    "passingScore": "70%",
    "officialUrl": "https://www.hashicorp.com/certification/terraform-associate",
    "documentationUrl": "https://developer.hashicorp.com/terraform/docs",
    "playgroundUrl": "/playground/terraform",
    "tutorialUrl": "/tutorials/terraform",
    "description": "The global standard credential for Infrastructure as Code (IaC) engineers. Tests deep operational knowledge of Terraform HCL syntax, state management, remote backends, module composition, workspaces, and CLI commands.",
    "prerequisites": "Basic understanding of cloud platforms (AWS, Azure, GCP) and Infrastructure as Code concepts.",
    "domains": [
      {
        "name": "Understand Terraform State",
        "weight": 20,
        "topics": [
          "State purpose: resource mapping, metadata caching, dependency tracking",
          "Remote backends (S3, GCS, Azure Blob, Terraform Cloud) and locking mechanisms",
          "Handling state drift with terraform plan -refresh-only",
          "State CLI commands: terraform state list, show, mv, rm, and terraform import"
        ],
        "competencies": [
          "Explain why state files must never be checked into public version control",
          "Refactor resource addresses using moved blocks instead of manual state mv"
        ]
      },
      {
        "name": "Terraform CLI Workflow & Commands",
        "weight": 20,
        "topics": [
          "Core workflow loop: terraform init, validate, plan, apply, destroy",
          "Saving and executing deterministic binary plan files with -out=tfplan",
          "Formatting and linting code with terraform fmt -recursive and terraform validate",
          "Debugging via TF_LOG=DEBUG and TF_LOG_PATH"
        ],
        "competencies": [
          "Understand when terraform init -upgrade or -reconfigure is mandatory",
          "Use terraform plan -replace or -target safely in production"
        ]
      },
      {
        "name": "HCL Configuration & Module Composition",
        "weight": 18,
        "topics": [
          "Variables, locals, outputs, data sources, and provider blocks",
          "Variable precedence: CLI -var, *.auto.tfvars, terraform.tfvars, TF_VAR_*, default",
          "Using published registry modules and authoring reusable child modules",
          "Meta-arguments: count, for_each, depends_on, lifecycle (prevent_destroy, create_before_destroy)"
        ],
        "competencies": [
          "Prevent duplicate resource creation using for_each over maps and sets rather than count over lists",
          "Protect critical stateful resources with lifecycle { prevent_destroy = true }"
        ]
      },
      {
        "name": "Understand IaC Fundamentals",
        "weight": 14,
        "topics": [
          "Declarative vs imperative infrastructure management",
          "Idempotency and drift detection concepts",
          "Advantages of IaC: versioning, collaboration, repeatability, disaster recovery"
        ],
        "competencies": [
          "Articulate the difference between configuration management (Ansible) and provisioning (Terraform)"
        ]
      },
      {
        "name": "Built-in Functions & Dynamic Blocks",
        "weight": 14,
        "topics": [
          "String and collection functions: merge, concat, lookup, element, flatten, length",
          "Dynamic blocks for repeating nested arguments within resource configurations",
          "Type constraints and custom variable validation rules"
        ],
        "competencies": [
          "Write input validation blocks with condition and error_message clauses",
          "Flatten nested collections using for expressions"
        ]
      },
      {
        "name": "Terraform Cloud & Workspaces",
        "weight": 14,
        "topics": [
          "CLI workspaces (terraform workspace new/select) vs Terraform Cloud workspaces",
          "State isolation strategies: directory separation vs workspaces",
          "Sentinel and OPA policy as code integrations"
        ],
        "competencies": [
          "Explain why directory-based separation is preferred over CLI workspaces for production environments"
        ]
      }
    ],
    "tips": [
      "Memorize variable precedence order: CLI -var > *.auto.tfvars > terraform.tfvars > TF_VAR_env > default.",
      "Understand the difference between 'count' and 'for_each': deleting an item from the middle of a 'count' list causes Terraform to recreate all subsequent resources.",
      "Know how to inspect state using 'terraform state show <resource_address>' and 'terraform state list'.",
      "Take our interactive browser Terraform playground (/playground/terraform) to test command syntax before the exam."
    ],
    "pitfalls": [
      "Thinking 'terraform apply -refresh-only' updates the configuration file: it updates state only to match reality.",
      "Assuming 'sensitive = true' on an output encrypts the value in the state file: it only redacts CLI terminal printing."
    ],
    "sampleQuestions": [
      {
        "question": "If you mark an output or variable with 'sensitive = true', where is the value still stored in cleartext?",
        "options": [
          "In the terraform.tfstate file",
          "In the terminal stdout logs",
          "In the Terraform registry",
          "It is automatically encrypted with RSA everywhere"
        ],
        "correctIndex": 0,
        "explanation": "The 'sensitive = true' argument prevents Terraform from printing secrets into the terminal and plan outputs, but resource attributes are ALWAYS written unencrypted in the JSON state file. This is why remote backends must enforce encryption at rest."
      }
    ]
  },
  {
    "id": "vault-associate",
    "slug": "vault-associate",
    "title": "HashiCorp Certified: Vault Associate (002)",
    "code": "Vault-002",
    "providerId": "hashicorp",
    "providerName": "HashiCorp",
    "providerBadgeColor": "from-purple-500 to-indigo-700",
    "level": "Associate",
    "cost": "$70.50 USD",
    "duration": "1 Hour (60 Mins)",
    "format": "Multiple Choice / Multiple Answer (57 Questions)",
    "passingScore": "70%",
    "officialUrl": "https://www.hashicorp.com/certification/vault-associate",
    "documentationUrl": "https://developer.hashicorp.com/vault/docs",
    "playgroundUrl": "/playground/linux",
    "tutorialUrl": "/tutorials/linux",
    "description": "Validates enterprise secrets management expertise: dynamic secrets, encryption-as-a-service, token lifecycles, policies, unsealing, auth methods (AppRole, Kubernetes, OIDC), and disaster recovery.",
    "prerequisites": "Familiarity with PKI, TLS certificates, basic Linux administration, and API interaction.",
    "domains": [
      {
        "name": "Vault Architecture & Sealing",
        "weight": 20,
        "topics": [
          "Shamir secret sharing, auto-unseal with KMS, storage backends (Raft, Consul)"
        ],
        "competencies": [
          "Execute vault operator init and operator unseal"
        ]
      },
      {
        "name": "Secrets Engines",
        "weight": 20,
        "topics": [
          "KV v1 vs v2, Transit (Encryption as a Service), PKI dynamic certificates, Database credentials"
        ],
        "competencies": [
          "Configure dynamic credentials with automated lease revocations"
        ]
      },
      {
        "name": "Authentication & Authorization",
        "weight": 20,
        "topics": [
          "AppRole for CI/CD, Kubernetes ServiceAccount auth, Token hierarchies and orphan tokens"
        ],
        "competencies": [
          "Create HCL policies granting least-privilege path access"
        ]
      },
      {
        "name": "Tokens & Leases",
        "weight": 20,
        "topics": [
          "TTL, max_ttl, renewal loops, revoking lease trees, periodic service tokens"
        ],
        "competencies": [
          "Manage vault lease renew and vault lease revoke -prefix"
        ]
      },
      {
        "name": "Deployment, HA & Monitoring",
        "weight": 20,
        "topics": [
          "Integrated Raft storage, telemetry metrics, replication, disaster recovery"
        ],
        "competencies": [
          "Configure vault.hcl with api_addr and cluster_addr"
        ]
      }
    ],
    "tips": [
      "Understand KV v1 vs v2: v2 supports versioning, soft deletes, and metadata paths (secret/data/ vs secret/metadata/).",
      "AppRole is the gold standard for CI/CD pipelines: RoleID + SecretID exchanged for short-lived client tokens.",
      "Know how Shamir unsealing works: default 5 key shares with a threshold of 3."
    ],
    "pitfalls": [
      "Attempting to read metadata using the /data/ path in KV-v2 instead of /metadata/.",
      "Confusing token accessor with the secret client token itself."
    ],
    "sampleQuestions": [
      {
        "question": "Which Vault auth method is recommended for unattended machine workloads running in CI/CD pipelines (e.g. GitLab CI, GitHub Actions)?",
        "options": [
          "Userpass authentication",
          "AppRole auth method using RoleID and SecretID",
          "GitHub OAuth with personal access token",
          "Root token generation"
        ],
        "correctIndex": 1,
        "explanation": "AppRole is purpose-built for automated systems, services, and CI/CD daemons. The application combines a static RoleID with a dynamically generated SecretID to authenticate and obtain short-lived scoped tokens."
      }
    ]
  },
  {
    "id": "aws-devops-engineer-professional",
    "slug": "aws-devops-engineer-professional",
    "title": "AWS Certified DevOps Engineer – Professional",
    "code": "DOP-C02",
    "providerId": "aws",
    "providerName": "Amazon Web Services",
    "providerBadgeColor": "from-amber-500 to-orange-600",
    "level": "Professional",
    "cost": "$300 USD",
    "duration": "180 Minutes (3 Hours)",
    "format": "Multiple Choice & Multiple Response (75 Complex Scenario Questions)",
    "passingScore": "750 / 1000",
    "officialUrl": "https://aws.amazon.com/certification/certified-devops-engineer-professional/",
    "documentationUrl": "https://docs.aws.amazon.com/",
    "playgroundUrl": "/playground/docker",
    "tutorialUrl": "/tutorials/aws",
    "description": "The premier cloud DevOps engineering certification in the industry. Validates deep mastery in automating delivery pipelines, configuring multi-account landing zones, zero-downtime deployment strategies, self-healing architectures, and security automation.",
    "prerequisites": "Two or more years of experience provisioning, operating, and managing AWS multi-tier environments.",
    "domains": [
      {
        "name": "SDLC Automation",
        "weight": 22,
        "topics": [
          "CodePipeline, CodeBuild, and CodeDeploy continuous delivery patterns",
          "Multi-account and cross-account CI/CD deployment pipelines using IAM roles and KMS keys",
          "Deployment strategies: Blue/Green, Canary, Rolling with batching, All-at-Once",
          "Automated rollbacks using CloudWatch alarms and Route 53 DNS routing policies"
        ],
        "competencies": [
          "Configure appspec.yml and buildspec.yml for ECS Blue/Green deployments with AWS CodeDeploy and Application Load Balancer",
          "Implement cross-region artifact replication in S3 with customer managed KMS keys"
        ]
      },
      {
        "name": "Configuration Management & Infrastructure as Code",
        "weight": 19,
        "topics": [
          "AWS CloudFormation: nested stacks, StackSets, dynamic references, custom resources with Lambda",
          "AWS Systems Manager (SSM): State Manager, Run Command, Patch Manager, Parameter Store",
          "AWS Service Catalog and AWS Organizations Service Control Policies (SCPs)",
          "Infrastructure drift detection and automated remediation"
        ],
        "competencies": [
          "Author CloudFormation templates with DeletionPolicy, UpdateReplacePolicy, and CreationPolicy signals",
          "Deploy multi-region stack instances with CloudFormation StackSets"
        ]
      },
      {
        "name": "Resilient Cloud Solutions & Disaster Recovery",
        "weight": 15,
        "topics": [
          "High availability architectures across Multi-AZ and Multi-Region",
          "Disaster recovery strategies: Backup & Restore, Pilot Light, Warm Standby, Multi-Site Active/Active",
          "Auto Scaling groups: target tracking, step scaling, predictive scaling, lifecycle hooks",
          "Database failover (Aurora Global Database, DynamoDB Global Tables, RDS Multi-AZ)"
        ],
        "competencies": [
          "Configure Auto Scaling lifecycle hooks with SNS/SQS and Lambda for graceful connection draining",
          "Achieve low RPO / RTO using Aurora Global Database storage replication"
        ]
      },
      {
        "name": "Monitoring & Logging",
        "weight": 15,
        "topics": [
          "CloudWatch agent deployment, custom metrics, metric math, composite alarms",
          "CloudWatch Logs Insights querying and automated log retention lifecycle",
          "Distributed tracing with AWS X-Ray and OpenTelemetry",
          "Amazon OpenSearch Service log indexing and Athena S3 access log queries"
        ],
        "competencies": [
          "Write CloudWatch Logs metric filters to alert on HTTP 5xx errors",
          "Debug cross-microservice latency bottlenecks using AWS X-Ray traces"
        ]
      },
      {
        "name": "Incident & Event Response",
        "weight": 14,
        "topics": [
          "Amazon EventBridge rules triggering automated remediation Lambda functions",
          "AWS Systems Manager Incident Manager and Automation runbooks",
          "AWS Config managed rules and automatic remediation via SSM Documents",
          "Auto-remediating security group rules opening port 22 or 3389 to 0.0.0.0/0"
        ],
        "competencies": [
          "Build event-driven pipelines reacting to CodeCommit / GitHub webhooks and AWS Config evaluations",
          "Configure SNS fanout architectures for rapid incident broadcast"
        ]
      },
      {
        "name": "Security & Compliance",
        "weight": 15,
        "topics": [
          "IAM permission boundaries, cross-account assume-role policies, least-privilege validation",
          "Secrets Manager automated secret rotation with custom Lambda functions",
          "AWS WAF, Shield, GuardDuty, Security Hub, and Inspector vulnerability scanning in CI/CD",
          "KMS key policies, multi-region keys, and cryptographic envelope encryption"
        ],
        "competencies": [
          "Enforce tag-based access control (ABAC) using IAM condition keys: aws:ResourceTag and aws:PrincipalTag",
          "Rotate RDS database credentials automatically using AWS Secrets Manager and VPC Lambda endpoints"
        ]
      }
    ],
    "tips": [
      "Pay attention to 'least operational overhead' in question stems: managed services (CodePipeline, Systems Manager) beat self-hosted Jenkins.",
      "Understand CodeDeploy AppSpec lifecycle hooks for ECS (BeforeInstall, AfterInstall, AfterAllowTestTraffic, BeforeAllowTraffic).",
      "For cross-account pipelines: CodePipeline in Account A assumes an IAM role in Account B, and the S3 artifact bucket must use a Customer Managed KMS Key (CMK), not the default aws/s3 key.",
      "Use our comprehensive AWS troubleshooting guide (/troubleshooting) for real production scenario preparation."
    ],
    "pitfalls": [
      "Selecting default AWS managed KMS keys for cross-account artifact encryption (default KMS keys cannot be shared across accounts).",
      "Confusing CloudWatch EventBridge with CloudTrail: CloudTrail records audit events, EventBridge triggers reactive actions."
    ],
    "sampleQuestions": [
      {
        "question": "A DevOps team wants to deploy an ECS application using a blue/green deployment strategy. Before traffic is shifted to the new replacement task set, an automated integration test suite must run against a test port. Which CodeDeploy lifecycle hook should trigger the test?",
        "options": [
          "BeforeInstall",
          "AfterInstall",
          "AfterAllowTestTraffic",
          "AfterAllowTraffic"
        ],
        "correctIndex": 2,
        "explanation": "In an Amazon ECS blue/green deployment, the 'AfterAllowTestTraffic' lifecycle hook runs after traffic is routed to the new replacement tasks on the test listener port (e.g. port 8080) and before any production traffic is shifted."
      }
    ]
  },
  {
    "id": "aws-solutions-architect-associate",
    "slug": "aws-solutions-architect-associate",
    "title": "AWS Certified Solutions Architect – Associate",
    "code": "SAA-C03",
    "providerId": "aws",
    "providerName": "Amazon Web Services",
    "providerBadgeColor": "from-amber-500 to-orange-600",
    "level": "Associate",
    "cost": "$150 USD",
    "duration": "130 Minutes",
    "format": "Multiple Choice & Multiple Response (65 Questions)",
    "passingScore": "720 / 1000",
    "officialUrl": "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
    "documentationUrl": "https://aws.amazon.com/architecture/well-architected/",
    "playgroundUrl": "/playground/terraform",
    "tutorialUrl": "/tutorials/aws",
    "description": "The most widely taken cloud certification in the world. Essential foundation for DevOps engineers designing resilient, high-performing, secure, and cost-optimized cloud workloads.",
    "prerequisites": "One year of hands-on experience designing cloud solutions with AWS compute, networking, storage, and database services.",
    "domains": [
      {
        "name": "Design Secure Architectures",
        "weight": 30,
        "topics": [
          "IAM, VPC security, KMS, Secrets Manager, Shield, WAF"
        ],
        "competencies": [
          "Enforce multi-tier VPC isolation with private subnets and NAT Gateways"
        ]
      },
      {
        "name": "Design Resilient Architectures",
        "weight": 26,
        "topics": [
          "Multi-AZ deployments, Auto Scaling, ELB, S3 replication, SQS decoupling"
        ],
        "competencies": [
          "Decouple distributed microservices using asynchronous SQS queues and DLQs"
        ]
      },
      {
        "name": "Design High-Performing Architectures",
        "weight": 24,
        "topics": [
          "CloudFront, ElastiCache (Redis), Aurora, Global Accelerator, EBS gp3/io2"
        ],
        "competencies": [
          "Choose the right storage tier (S3 Glacier Instant Retrieval vs Deep Archive)"
        ]
      },
      {
        "name": "Design Cost-Optimized Architectures",
        "weight": 20,
        "topics": [
          "Savings Plans, Spot Instances, S3 Lifecycle policies, Lambda compute"
        ],
        "competencies": [
          "Architect stateless worker pools using Spot Instances and Auto Scaling"
        ]
      }
    ],
    "tips": [
      "Decoupling: Whenever you see words like 'bursty traffic' or 'protect database from overload', think SQS buffer.",
      "Understand S3 storage classes and lifecycle transition rules thoroughly.",
      "VPC Peering cannot handle overlapping CIDRs and does NOT support transitive routing (use Transit Gateway)."
    ],
    "pitfalls": [
      "Confusing Security Groups (stateful, instance level) with Network ACLs (stateless, subnet level).",
      "Using NAT Gateways across multiple regions (NAT Gateways are regional and live in a specific AZ)."
    ],
    "sampleQuestions": [
      {
        "question": "A web application experiences sudden spikes in orders that overwhelm the backend MySQL database. The orders can tolerate processing delays of up to 15 minutes. What is the most resilient, cost-effective architecture?",
        "options": [
          "Scale the RDS instance up to db.m5.24xlarge.",
          "Insert an Amazon SQS queue between the web tier and a pool of Auto Scaling worker EC2 instances that process and insert orders into the database.",
          "Deploy an ElastiCache Redis cluster in front of MySQL for all write queries.",
          "Migrate MySQL to an S3 bucket."
        ],
        "correctIndex": 1,
        "explanation": "Inserting an SQS queue buffers sudden spikes in requests, allowing backend workers to drain and process orders at a controlled rate without overwhelming database connection limits."
      }
    ]
  },
  {
    "id": "aws-sysops-administrator-associate",
    "slug": "aws-sysops-administrator-associate",
    "title": "AWS Certified SysOps Administrator – Associate",
    "code": "SOA-C02",
    "providerId": "aws",
    "providerName": "Amazon Web Services",
    "providerBadgeColor": "from-amber-500 to-orange-600",
    "level": "Associate",
    "cost": "$150 USD",
    "duration": "130 Minutes",
    "format": "Multiple Choice / Multiple Response (65 Questions)",
    "passingScore": "720 / 1000",
    "officialUrl": "https://aws.amazon.com/certification/certified-sysops-admin-associate/",
    "documentationUrl": "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/",
    "playgroundUrl": "/playground/linux",
    "tutorialUrl": "/tutorials/aws",
    "description": "Deeply focused on deployment, management, operations, and troubleshooting on AWS. Covers metrics, CloudWatch alarms, Systems Manager patching, backup automation, and networking fixes.",
    "prerequisites": "One to two years of experience as a systems administrator in an operations role.",
    "domains": [
      {
        "name": "Monitoring, Logging, and Remediation",
        "weight": 20,
        "topics": [
          "CloudWatch agent, alarm actions, EventBridge remediation"
        ],
        "competencies": [
          "Troubleshoot memory usage with custom CloudWatch metric collection"
        ]
      },
      {
        "name": "Reliability and Business Continuity",
        "weight": 16,
        "topics": [
          "AWS Backup, RDS snapshots, Route 53 health checks, Auto Scaling"
        ],
        "competencies": [
          "Automate cross-region backup plans using AWS Backup"
        ]
      },
      {
        "name": "Deployment, Provisioning, and Automation",
        "weight": 18,
        "topics": [
          "CloudFormation rollback troubleshooting, SSM Patch Manager, AMI creation"
        ],
        "competencies": [
          "Remediate CloudFormation CREATE_FAILED and UPDATE_ROLLBACK_FAILED errors"
        ]
      },
      {
        "name": "Security and Compliance",
        "weight": 16,
        "topics": [
          "S3 bucket policies, IAM role trust policies, AWS KMS key rotation, GuardDuty"
        ],
        "competencies": [
          "Identify S3 public access vulnerabilities using IAM Access Analyzer"
        ]
      },
      {
        "name": "Networking and Content Delivery",
        "weight": 18,
        "topics": [
          "VPC routing, Security Groups, Transit Gateway, Route 53 DNS, CloudFront"
        ],
        "competencies": [
          "Troubleshoot connectivity using VPC Reachability Analyzer"
        ]
      },
      {
        "name": "Cost and Performance Optimization",
        "weight": 12,
        "topics": [
          "AWS Compute Optimizer, S3 Storage Lens, Cost Explorer, AWS Budgets"
        ],
        "competencies": [
          "Rightsize overprovisioned EC2 instances based on CPU and memory telemetry"
        ]
      }
    ],
    "tips": [
      "CloudWatch standard metrics do NOT include memory utilization: you MUST install the unified CloudWatch Agent.",
      "Understand how to troubleshoot EC2 instance status checks: System status checks (AWS hardware failure, stop/start instance) vs Instance status checks (OS/filesystem failure, reboot instance).",
      "Know VPC Reachability Analyzer and Flow Logs for tracking dropped packets."
    ],
    "pitfalls": [
      "Confusing System Status Check with Instance Status Check remediation steps.",
      "Thinking CloudFormation rollbacks can be skipped when resources fail to delete."
    ],
    "sampleQuestions": [
      {
        "question": "An EC2 instance fails its 'System Status Check' due to underlying AWS host hardware degradation. What action recovers the instance onto healthy underlying hardware with minimal impact?",
        "options": [
          "Reboot the instance via the AWS Management Console.",
          "Stop and then Start the instance (or configure a CloudWatch alarm with the Recover action).",
          "Terminate the instance and rebuild the OS from an ISO.",
          "Re-attach the network interface."
        ],
        "correctIndex": 1,
        "explanation": "Stopping and starting an EBS-backed EC2 instance migrates it to a different, healthy physical host in the AWS infrastructure. For automated recovery, a CloudWatch alarm can trigger the EC2 Recover action."
      }
    ]
  },
  {
    "id": "az-400-devops-engineer",
    "slug": "az-400-devops-engineer",
    "title": "Microsoft Certified: DevOps Engineer Expert",
    "code": "AZ-400",
    "providerId": "azure",
    "providerName": "Microsoft Azure",
    "providerBadgeColor": "from-sky-500 to-blue-700",
    "level": "Professional",
    "cost": "$165 USD",
    "duration": "120 Minutes",
    "format": "Multiple Choice / Scenario-based / Drag-and-Drop (40-60 Questions)",
    "passingScore": "700 / 1000",
    "officialUrl": "https://learn.microsoft.com/en-us/credentials/certifications/devops-engineer/",
    "documentationUrl": "https://learn.microsoft.com/en-us/azure/devops/",
    "playgroundUrl": "/playground/docker",
    "tutorialUrl": "/tutorials/cicd",
    "description": "Microsoft's premier DevOps credential. Covers designing and implementing strategies for collaboration, source code management, continuous integration, continuous delivery, dependency management, and site reliability engineering (SRE) on Azure and GitHub.",
    "prerequisites": "Must hold either AZ-104 (Azure Administrator) or AZ-204 (Azure Developer) before earning the Expert badge.",
    "domains": [
      {
        "name": "Design and Implement a Delivery Strategy",
        "weight": 25,
        "topics": [
          "Azure Pipelines (YAML) vs GitHub Actions workflows",
          "Deployment patterns: Blue/Green, Canary, Feature Flags, Ring-based deployment",
          "Release gates, approval checks, deployment environments, and service connections",
          "Self-hosted agents vs Microsoft-hosted runners and container-based execution"
        ],
        "competencies": [
          "Configure azure-pipelines.yml with multi-stage deployments, approvals, and variable groups",
          "Implement branch policies and pull request merge checks in Azure Repos and GitHub Enterprise"
        ]
      },
      {
        "name": "Design and Implement Infrastructure as Code",
        "weight": 20,
        "topics": [
          "Azure Bicep, ARM templates, and Terraform on Azure",
          "Azure Resource Manager service connections using OpenID Connect (OIDC) federated credentials",
          "Azure Container Apps and Azure Kubernetes Service (AKS) provisioning",
          "Managing state and secrets with Azure Key Vault and Managed Identities"
        ],
        "competencies": [
          "Eliminate static client secrets in pipelines by configuring Workload Identity Federation with Entra ID",
          "Deploy modular Azure Bicep templates with parameter validation"
        ]
      },
      {
        "name": "Implement Continuous Integration",
        "weight": 18,
        "topics": [
          "Build pipelines for container images, .NET, Java, and Node.js applications",
          "Code quality gates with SonarQube / SonarCloud and automated unit test reporting",
          "Artifact management with Azure Artifacts and GitHub Packages (NuGet, npm, Docker)",
          "Package feeds, upstream sources, and semantic versioning"
        ],
        "competencies": [
          "Configure pipeline caching for package managers (npm, pip, maven) to reduce build durations",
          "Publish test results and code coverage metrics into Azure DevOps dashboard widgets"
        ]
      },
      {
        "name": "Implement Security and Compliance",
        "weight": 17,
        "topics": [
          "Software Supply Chain Security with GitHub Advanced Security (GHAS) and Microsoft Defender for Cloud",
          "Secret scanning, dependency review, and Dependabot automated PRs",
          "Static Application Security Testing (SAST) and Container image scanning in ACR",
          "Azure Policy enforcement and compliance auditing in CI/CD"
        ],
        "competencies": [
          "Block build pipelines when high-severity CVEs are discovered in container base images",
          "Inject secrets securely at runtime using Azure Key Vault task extensions"
        ]
      },
      {
        "name": "Design and Implement an Instrumentation Strategy",
        "weight": 20,
        "topics": [
          "Azure Monitor, Application Insights, Log Analytics workspaces (Kusto Query Language KQL)",
          "Distributed telemetry tracing, synthetic web tests, and live metrics streaming",
          "Site Reliability Engineering (SRE): SLI, SLO, SLA, and error budgets",
          "Configuring action groups and alerting based on KQL queries"
        ],
        "competencies": [
          "Write KQL queries in Log Analytics to correlate HTTP exceptions with deployment revisions",
          "Configure Smart Detection alerts for failure anomalies in Application Insights"
        ]
      }
    ],
    "tips": [
      "Understand the difference between Azure Pipelines Service Connections: use Workload Identity Federation (OIDC) instead of static client secrets.",
      "Study Azure Deployment Strategies thoroughly: Ring-based deployments (Canary in Ring 0, Early Adopters in Ring 1, General Public in Ring 2).",
      "Know basic Kusto Query Language (KQL) syntax: requests | where success == false | summarize count() by bin(timestamp, 1h).",
      "Understand Git branching models: Trunk-Based Development vs GitFlow."
    ],
    "pitfalls": [
      "Confusing Azure DevOps Server (on-premises) capabilities with Azure DevOps Services (cloud).",
      "Using Service Principals with expiring passwords when OIDC Federated Credentials offer passwordless authentication."
    ],
    "sampleQuestions": [
      {
        "question": "A team wants to authenticate an automated Azure DevOps YAML pipeline to deploy infrastructure into Azure without storing any long-lived secret keys or passwords. Which configuration should they implement?",
        "options": [
          "Store the Azure subscription password in an Azure Key Vault.",
          "Configure an Azure Resource Manager Service Connection using Workload Identity Federation (OIDC) with Microsoft Entra ID.",
          "Hardcode the client secret in the azure-pipelines.yml file.",
          "Use a self-hosted agent with local administrator rights."
        ],
        "correctIndex": 1,
        "explanation": "Workload Identity Federation uses OpenID Connect (OIDC) to exchange short-lived federated tokens between Azure Pipelines and Microsoft Entra ID, completely eliminating the need to generate, store, or rotate client secrets."
      }
    ]
  },
  {
    "id": "az-104-azure-administrator",
    "slug": "az-104-azure-administrator",
    "title": "Microsoft Certified: Azure Administrator Associate",
    "code": "AZ-104",
    "providerId": "azure",
    "providerName": "Microsoft Azure",
    "providerBadgeColor": "from-sky-500 to-blue-700",
    "level": "Associate",
    "cost": "$165 USD",
    "duration": "120 Minutes",
    "format": "Multiple Choice / Case Studies / Hot Area (40-60 Questions)",
    "passingScore": "700 / 1000",
    "officialUrl": "https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/",
    "documentationUrl": "https://learn.microsoft.com/en-us/azure/",
    "playgroundUrl": "/playground/linux",
    "tutorialUrl": "/tutorials/cloud",
    "description": "Essential foundation for DevOps engineers on Azure. Validates real-world skills managing virtual networks, compute instances, storage accounts, Azure AD / Entra ID, and governance policies.",
    "prerequisites": "Six months of hands-on experience administering Azure workloads.",
    "domains": [
      {
        "name": "Manage Azure Identities and Governance",
        "weight": 20,
        "topics": [
          "Microsoft Entra ID, RBAC roles, Azure Policy, Management Groups"
        ],
        "competencies": [
          "Create custom RBAC roles and enforce resource tagging policies"
        ]
      },
      {
        "name": "Implement and Manage Storage",
        "weight": 18,
        "topics": [
          "Blob storage tiers, Azure Files, Shared Access Signatures (SAS), Storage replication"
        ],
        "competencies": [
          "Configure lifecycle management rules to transition cold blobs to Archive"
        ]
      },
      {
        "name": "Deploy and Manage Azure Compute Resources",
        "weight": 22,
        "topics": [
          "Virtual Machines, Scale Sets, Azure Kubernetes Service (AKS), Container Apps"
        ],
        "competencies": [
          "Configure Azure VM backup and troubleshoot provisioning failures"
        ]
      },
      {
        "name": "Configure and Manage Virtual Networking",
        "weight": 25,
        "topics": [
          "VNet peering, Network Security Groups (NSGs), Azure Bastion, DNS, VPN Gateway"
        ],
        "competencies": [
          "Configure NSG inbound/outbound rules and resolve subnet routing conflicts"
        ]
      },
      {
        "name": "Monitor and Maintain Azure Resources",
        "weight": 15,
        "topics": [
          "Azure Monitor, Log Analytics, Action Groups, Network Watcher connection troubleshoot"
        ],
        "competencies": [
          "Diagnose network packet drops using Network Watcher IP Flow Verify"
        ]
      }
    ],
    "tips": [
      "Understand Azure Storage replication types: LRS (local 3 copies), ZRS (3 zones), GRS (secondary region), GZRS.",
      "Master NSG priority rules: lower numbers have higher priority (e.g. 100 overrides 200).",
      "Know how to grant granular temporary access using Shared Access Signatures (SAS) instead of account keys."
    ],
    "pitfalls": [
      "Confusing Azure Policy (governance, preventing non-compliant creation) with RBAC (identity authorization).",
      "Forgetting that VNet Peering requires non-overlapping IP address address spaces."
    ],
    "sampleQuestions": [
      {
        "question": "A developer needs temporary read-only access to a specific container in an Azure Storage account for 4 hours without sharing the master storage account access keys. What should you generate?",
        "options": [
          "An Azure Entra ID Global Administrator account",
          "A Service-level Shared Access Signature (SAS) token with Read permissions and a 4-hour expiration window",
          "A new subscription",
          "A public anonymous access link"
        ],
        "correctIndex": 1,
        "explanation": "A Shared Access Signature (SAS) grants restricted, time-limited access to specific storage resources (blobs, containers) with fine-grained permissions without disclosing the primary or secondary account keys."
      }
    ]
  },
  {
    "id": "gcp-professional-cloud-devops-engineer",
    "slug": "gcp-professional-cloud-devops-engineer",
    "title": "Google Cloud Professional Cloud DevOps Engineer",
    "code": "GCP-DevOps",
    "providerId": "gcp",
    "providerName": "Google Cloud Platform",
    "providerBadgeColor": "from-emerald-500 to-teal-600",
    "level": "Professional",
    "cost": "$200 USD",
    "duration": "120 Minutes (2 Hours)",
    "format": "Multiple Choice / Multiple Select (50-60 Questions)",
    "passingScore": "70% (Scaled scoring)",
    "officialUrl": "https://cloud.google.com/learn/certification/cloud-devops-engineer",
    "documentationUrl": "https://cloud.google.com/docs",
    "playgroundUrl": "/playground/kubernetes",
    "tutorialUrl": "/tutorials/kubernetes",
    "description": "Google's premier certification built directly around Site Reliability Engineering (SRE) principles. Tests your ability to build delivery pipelines, deploy to Google Kubernetes Engine (GKE), configure Cloud Operations Suite, and manage error budgets.",
    "prerequisites": "Three or more years of industry experience including one or more years managing Google Cloud solutions.",
    "domains": [
      {
        "name": "Applying Site Reliability Engineering (SRE) Principles",
        "weight": 22,
        "topics": [
          "Defining Service Level Indicators (SLIs), Service Level Objectives (SLOs), and SLAs",
          "Calculating and managing Error Budgets to balance feature velocity with stability",
          "Implementing incident management protocols: Blameless Postmortems, On-Call rotations",
          "Capacity planning, load testing, and chaos engineering"
        ],
        "competencies": [
          "Convert business reliability requirements into quantifiable Prometheus/Cloud Monitoring SLIs",
          "Halt deployments when an error budget is exhausted and focus sprints on stability"
        ]
      },
      {
        "name": "Building and Implementing CI/CD Pipelines",
        "weight": 22,
        "topics": [
          "Cloud Build (cloudbuild.yaml), Artifact Registry, and Google Cloud Deploy",
          "Deployment strategies on GKE: Blue/Green, Canary, Rolling updates",
          "Automated rollbacks via Cloud Monitoring metric alerting",
          "Infrastructure as Code on GCP using Terraform and Config Connector"
        ],
        "competencies": [
          "Author cloudbuild.yaml build steps with caching and secret substitution",
          "Promote releases across Dev, Staging, and Production targets with Cloud Deploy"
        ]
      },
      {
        "name": "Managing Service Availability & Performance",
        "weight": 20,
        "topics": [
          "Cloud Monitoring (Stackdriver): custom metrics, uptime checks, alerting policies, MQL",
          "Cloud Logging: log routing, log sinks to BigQuery / PubSub, log-based metrics",
          "Cloud Trace and Cloud Profiler for identifying CPU and memory performance regressions",
          "GKE autoscaling: Cluster Autoscaler, Horizontal Pod Autoscaler (HPA), Vertical Pod Autoscaler (VPA)"
        ],
        "competencies": [
          "Configure log sinks routing critical application audit logs into BigQuery for security analytics",
          "Tune HPA targets on custom metrics exposed by Cloud Monitoring"
        ]
      },
      {
        "name": "Managing Service Incidents & Mitigating Outages",
        "weight": 18,
        "topics": [
          "Incident response coordination, role assignment (Incident Commander, Operations Lead)",
          "Rollback procedures, traffic draining with Cloud Load Balancing and Cloud Armor",
          "Emergency break-glass access protocols and root-cause discovery"
        ],
        "competencies": [
          "Drain regional traffic using global external HTTP(S) load balancer backends during datacenter anomalies",
          "Facilitate structured, psychological-safety-focused blameless postmortems"
        ]
      },
      {
        "name": "Ensuring Security and Compliance",
        "weight": 18,
        "topics": [
          "Binary Authorization: requiring cryptographic attestation signatures before GKE pod admission",
          "Workload Identity: mapping Kubernetes ServiceAccounts to GCP IAM Service Accounts",
          "Secret Manager integration, Cloud KMS, and Secret scanning",
          "VPC Service Controls and Service Account least-privilege scoping"
        ],
        "competencies": [
          "Block unverified container images using Binary Authorization policies",
          "Eliminate static JSON service account keys using GKE Workload Identity"
        ]
      }
    ],
    "tips": [
      "Deeply read Google's official 'Site Reliability Engineering' book: SRE principles (SLI/SLO/Error Budget) are heavily tested.",
      "Understand Binary Authorization: it prevents non-attested container images from being deployed to GKE clusters.",
      "Always prefer GKE Workload Identity over static service account JSON key files.",
      "Know Cloud Deploy delivery pipeline syntax: target environments, stages, and canary phase releases."
    ],
    "pitfalls": [
      "Confusing SLI (current metric, e.g. latency), SLO (internal target, e.g. 99.9%), and SLA (contractual promise with monetary penalties).",
      "Using static service account JSON keys inside GKE pods instead of Workload Identity."
    ],
    "sampleQuestions": [
      {
        "question": "A production GKE service has an SLO of 99.9% availability measured over 30 days. Mid-month, a major bug causes an outage that consumes 100% of the remaining monthly error budget. According to SRE best practices, what should the team do next?",
        "options": [
          "Fire the engineer who approved the pull request.",
          "Temporarily freeze feature deployments and redirect engineering effort toward reliability, automated testing, and infrastructure hardening until the error budget recovers.",
          "Increase the SLO to 99.99% so more failures are allowed.",
          "Ignore the error budget and continue deploying planned features."
        ],
        "correctIndex": 1,
        "explanation": "In Google SRE methodology, an exhausted error budget signifies that reliability has been compromised. The correct response is a feature freeze: divert engineering resources to fix technical debt, improve testing, and stabilize the system before releasing new features."
      }
    ]
  },
  {
    "id": "gcp-professional-cloud-architect",
    "slug": "gcp-professional-cloud-architect",
    "title": "Google Cloud Professional Cloud Architect",
    "code": "GCP-PCA",
    "providerId": "gcp",
    "providerName": "Google Cloud Platform",
    "providerBadgeColor": "from-emerald-500 to-teal-600",
    "level": "Professional",
    "cost": "$200 USD",
    "duration": "120 Minutes (2 Hours)",
    "format": "Multiple Choice / Multiple Select & Case Studies (50-60 Questions)",
    "passingScore": "70% (Scaled scoring)",
    "officialUrl": "https://cloud.google.com/learn/certification/cloud-architect",
    "documentationUrl": "https://cloud.google.com/architecture",
    "playgroundUrl": "/playground/terraform",
    "tutorialUrl": "/tutorials/cloud",
    "description": "Validates ability to design robust, secure, scalable, highly available, and dynamic solutions to drive business objectives on Google Cloud. Highly prized by enterprise DevOps and cloud leaders.",
    "prerequisites": "Three or more years of industry experience including one or more years designing and managing GCP solutions.",
    "domains": [
      {
        "name": "Design Solution Infrastructure",
        "weight": 25,
        "topics": [
          "Compute (GKE, Compute Engine, Cloud Run), Storage (Cloud Storage, Filestore), Networking (VPC, Cloud Interconnect)"
        ],
        "competencies": [
          "Design global multi-region load balanced architectures"
        ]
      },
      {
        "name": "Design for Security and Compliance",
        "weight": 20,
        "topics": [
          "IAM, Cloud KMS, Secret Manager, Cloud Armor, VPC Service Controls, Data residency"
        ],
        "competencies": [
          "Enforce micro-segmentation and Zero Trust with BeyondCorp"
        ]
      },
      {
        "name": "Design for Technical and Business Processes",
        "weight": 18,
        "topics": [
          "Continuous integration, software delivery lifecycles, disaster recovery RPO/RTO"
        ],
        "competencies": [
          "Design failover between active-active multi-region databases (Cloud Spanner)"
        ]
      },
      {
        "name": "Manage Implementation",
        "weight": 15,
        "topics": [
          "Configuring networking, Cloud Router, BGP, Shared VPC, Peering"
        ],
        "competencies": [
          "Connect on-premises data centers to GCP via Dedicated Interconnect"
        ]
      },
      {
        "name": "Ensure Solution and Operations Reliability",
        "weight": 22,
        "topics": [
          "Monitoring, alerting, autoscaling, capacity planning, backup and restore"
        ],
        "competencies": [
          "Choose between Cloud Spanner (globally consistent SQL) and Cloud Bigtable (high-throughput NoSQL)"
        ]
      }
    ],
    "tips": [
      "Thoroughly read Google's published Case Studies (EHR Healthcare, Mountkirk Games, TerramEarth) prior to the exam.",
      "Know when to choose Cloud Spanner (relational, global ACID transactions) vs Cloud Bigtable (massive low-latency NoSQL time-series/IoT) vs Cloud SQL.",
      "Understand Shared VPC architecture: Host project shares subnets with Service projects."
    ],
    "pitfalls": [
      "Choosing Cloud SQL when global multi-region write scalability is required (use Cloud Spanner).",
      "Confusing Cloud Armor (DDoS, WAF L7 filtering) with VPC firewall rules (L4 IP/port filtering)."
    ],
    "sampleQuestions": [
      {
        "question": "An online multiplayer mobile game requires a database that can handle millions of globally distributed concurrent read/write queries with ACID compliance and horizontal scalability across continents. Which Google Cloud database should you recommend?",
        "options": [
          "Cloud SQL with MySQL read replicas",
          "Cloud Spanner",
          "Cloud Bigtable",
          "Firestore in Datastore mode"
        ],
        "correctIndex": 1,
        "explanation": "Cloud Spanner is Google's fully managed, globally distributed, horizontally scalable database that provides strong consistency, high availability (up to 99.999%), and full ACID transactions across multi-regional deployments."
      }
    ]
  }
];
