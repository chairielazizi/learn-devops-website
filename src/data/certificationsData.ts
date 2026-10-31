export interface CertificationGuide {
  id: string;
  slug: string;
  title: string;
  code: string;
  organization: string;
  level: "Associate" | "Professional" | "Specialty";
  cost: string;
  format: string;
  passingScore: string;
  description: string;
  domains: { name: string; weight: number }[];
  tips: string[];
}

export const CERTIFICATIONS: CertificationGuide[] = [
  {
    id: "cka",
    slug: "cka",
    title: "Certified Kubernetes Administrator (CKA)",
    code: "CKA",
    organization: "Linux Foundation / CNCF",
    level: "Professional",
    cost: "$395 USD",
    format: "Hands-on Practical Exam in Terminal (2 Hours)",
    passingScore: "66%",
    description: "The gold standard for Kubernetes engineers. Tests real-world cluster management: installation, kubeadm upgrades, etcd backup/restore, networking, multi-node troubleshooting, and RBAC.",
    domains: [
      { name: "Cluster Architecture, Installation & Configuration", weight: 25 },
      { name: "Workloads & Scheduling", weight: 15 },
      { name: "Services & Networking", weight: 20 },
      { name: "Storage", weight: 10 },
      { name: "Troubleshooting", weight: 30 },
    ],
    tips: [
      "Set aliases immediately: alias k=kubectl and export do='--dry-run=client -o yaml'.",
      "Master imperative commands: generate YAML with 'k run ... $do' rather than writing YAML from scratch.",
      "Practice etcd snapshot save and restore until you can perform it in under 4 minutes.",
      "Use our CKA Playground (/playground/kubernetes/cka) to practice cordon, drain, and pod troubleshooting.",
    ],
  },
  {
    id: "ckad",
    slug: "ckad",
    title: "Certified Kubernetes Application Developer (CKAD)",
    code: "CKAD",
    organization: "Linux Foundation / CNCF",
    level: "Professional",
    cost: "$395 USD",
    format: "Hands-on Practical Exam in Terminal (2 Hours)",
    passingScore: "66%",
    description: "Validates ability to design, build, and deploy cloud-native applications for Kubernetes: multi-container pods, configMaps, secrets, network policies, and observability.",
    domains: [
      { name: "Application Design and Build", weight: 20 },
      { name: "Application Deployment", weight: 20 },
      { name: "Application Observability and Maintenance", weight: 15 },
      { name: "Application Environment, Configuration and Security", weight: 25 },
      { name: "Services and Networking", weight: 20 },
    ],
    tips: [
      "Memorize how to mount ConfigMaps and Secrets as environment variables and volume mounts.",
      "Be fluent in defining Liveness and Readiness probes (httpGet, exec, tcpSocket).",
      "Understand NetworkPolicies and default-deny ingress/egress rules.",
    ],
  },
  {
    id: "kcna",
    slug: "kcna",
    title: "Kubernetes and Cloud Native Associate (KCNA)",
    code: "KCNA",
    organization: "Linux Foundation / CNCF",
    level: "Associate",
    cost: "$250 USD",
    format: "Multiple Choice Questions (90 Minutes)",
    passingScore: "75%",
    description: "Entry-level certification covering the entire cloud native landscape: CNCF projects, microservices architectures, GitOps, CI/CD, and site reliability fundamentals.",
    domains: [
      { name: "Kubernetes Fundamentals", weight: 46 },
      { name: "Container Orchestration", weight: 22 },
      { name: "Cloud Native Architecture", weight: 16 },
      { name: "Cloud Native Observability", weight: 8 },
      { name: "Cloud Native Application Delivery", weight: 8 },
    ],
    tips: [
      "Focus on CNCF graduated and incubating projects (Prometheus, Envoy, ArgoCD, Helm).",
      "Understand 12-factor application architecture and cloud-native tenets.",
      "Great stepping-stone before attempting CKA or CKAD.",
    ],
  },
];

