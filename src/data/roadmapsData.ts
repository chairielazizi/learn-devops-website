export interface RoadmapStep {
  title: string;
  description: string;
  topics: string[];
  recommendedProjects: string[];
}

export interface Roadmap {
  id: string;
  slug: string;
  title: string;
  badge: string;
  description: string;
  duration: string;
  steps: RoadmapStep[];
}

export const ROADMAPS: Roadmap[] = [
  {
    id: "devops-engineer",
    slug: "devops-engineer",
    title: "DevOps Engineer Career Roadmap 2026",
    badge: "Most Comprehensive",
    description: "The definitive guide to becoming a production-ready DevOps Engineer from scratch. Covers the foundational Linux & Git layer, containerization, orchestration, IaC, CI/CD, and Observability.",
    duration: "6 Months",
    steps: [
      {
        title: "Step 1: Linux & Systems Fundamentals",
        description: "DevOps workloads run in Linux containers and VMs. Mastering the command line is non-negotiable.",
        topics: ["Filesystem navigation & permissions (chmod, chown)", "Process management (top, htop, ps, kill)", "Networking (curl, dig, ss, iptables, SSH)", "Shell scripting & automation (Bash)"],
        recommendedProjects: ["Write a bash script to monitor disk usage and send webhook alerts", "Set up an automated NGINX reverse proxy with systemd"],
      },
      {
        title: "Step 2: Version Control & Git",
        description: "All infrastructure and application code must be version controlled and collaborative.",
        topics: ["Git branching models (Trunk-based development)", "Interactive rebasing and merge resolution", "SSH keys and GPG commit signing", "GitOps fundamentals"],
        recommendedProjects: ["Design a multi-branch repository workflow with protected branches and mandatory reviews"],
      },
      {
        title: "Step 3: Containers (Docker)",
        description: "Package applications so they run reliably across staging, production, and cloud environments.",
        topics: ["Docker engine vs containerd", "Multi-stage production Dockerfiles", "Docker Compose for local multi-service testing", "Security: non-root users, vulnerability scanning with Trivy"],
        recommendedProjects: ["Containerize a full-stack Node.js + Postgres application with healthchecks and compose"],
      },
      {
        title: "Step 4: Continuous Integration & Delivery (CI/CD)",
        description: "Automate code quality checks, security audits, build artifacts, and deployments.",
        topics: ["GitHub Actions workflow syntax", "GitLab CI pipelines and runners", "Automated unit and integration testing", "OIDC authentication for cloud publishing"],
        recommendedProjects: ["Create an automated GitHub Actions pipeline that lints, builds, and publishes images to GHCR"],
      },
      {
        title: "Step 5: Container Orchestration (Kubernetes)",
        description: "Manage container scaling, self-healing, rolling updates, and service discovery.",
        topics: ["Pods, Deployments, ReplicaSets", "Services (ClusterIP, NodePort, LoadBalancer)", "Ingress Controllers & cert-manager TLS", "ConfigMaps, Secrets, and Persistent Volumes"],
        recommendedProjects: ["Deploy a highly available microservices cluster with Helm and automated rollouts"],
      },
      {
        title: "Step 6: Infrastructure as Code (Terraform)",
        description: "Treat your cloud infrastructure with the same rigor as software code.",
        topics: ["HashiCorp Configuration Language (HCL)", "State management & remote backends with locks", "Writing reusable Terraform modules", "Terraform in CI/CD pipelines"],
        recommendedProjects: ["Provision an entire AWS VPC, Subnets, and EKS cluster using modular Terraform"],
      },
      {
        title: "Step 7: Cloud Providers (AWS / GCP / Azure)",
        description: "Understand enterprise cloud architectures, high availability, and least-privilege security.",
        topics: ["VPC networking & peering", "Identity & Access Management (IAM)", "Managed Kubernetes (EKS / GKE / AKS)", "Serverless & container compute (ECS / Fargate / Lambda)"],
        recommendedProjects: ["Architect a zero-trust multi-region VPC with private endpoints and auto-scaling"],
      },
    ],
  },
  {
    id: "cloud-engineer",
    slug: "cloud-engineer",
    title: "Cloud Platform Engineer Roadmap",
    badge: "Cloud Focus",
    description: "Focus heavily on Cloud Architecture, networking, identity boundaries, zero-trust security, cost optimization (FinOps), and cloud migration.",
    duration: "5 Months",
    steps: [
      {
        title: "Step 1: Cloud Networking & Security",
        description: "Understand subnets, CIDR blocks, NAT gateways, route tables, and firewalls.",
        topics: ["VPC peering vs Transit Gateways", "Network ACLs vs Security Groups", "DNS management with Route 53", "WAF and DDoS protection"],
        recommendedProjects: ["Build a multi-tier VPC architecture isolating database tiers from public internet"],
      },
      {
        title: "Step 2: Identity, Access & Governance",
        description: "Enforce least-privilege access across organizations.",
        topics: ["IAM Roles, Policies, Service Accounts", "Multi-account AWS Organizations & SCPs", "SSO / OIDC identity federation", "AWS KMS encryption and secret rotation"],
        recommendedProjects: ["Configure cross-account IAM role assumption with external ID security"],
      },
    ],
  },
  {
    id: "sre",
    slug: "sre",
    title: "Site Reliability Engineer (SRE) Roadmap",
    badge: "Reliability & Scale",
    description: "Master system reliability, automated recovery, observability (Prometheus, Grafana, OpenTelemetry), SLOs/SLIs, and chaos engineering.",
    duration: "6 Months",
    steps: [
      {
        title: "Step 1: Observability & Monitoring",
        description: "Metrics, logs, and distributed traces.",
        topics: ["Prometheus metrics collection & PromQL", "Grafana dashboards and alerts", "OpenTelemetry distributed tracing", "Centralized logging with Loki / OpenSearch"],
        recommendedProjects: ["Build a Prometheus + Grafana observability dashboard with custom RED metrics"],
      },
      {
        title: "Step 2: Reliability Engineering & Chaos",
        description: "Quantify availability and build fault-tolerant architectures.",
        topics: ["SLIs, SLOs, and Error Budgets", "Incident post-mortems and blameless culture", "Chaos Engineering with Chaos Mesh / Litmus", "Circuit breakers and rate limiting"],
        recommendedProjects: ["Simulate network partition and node failures on Kubernetes and record MTTR"],
      },
    ],
  },
];

