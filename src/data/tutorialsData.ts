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
    lessonsCount: 41,
    estimatedHours: 8,
    level: "Beginner",
    modules: [
      {
        title: "Module 1: Container Fundamentals",
        lessons: [
          { title: "Introduction to Docker", slug: "introduction-to-docker", summary: "Containers vs Virtual Machines, Docker architecture, client-daemon model.", duration: "10 min" },
          { title: "Why Use Docker?", slug: "why-use-docker", summary: "Solving 'works on my machine', reproducible developer environments.", duration: "8 min" },
          { title: "Installing Docker Engine", slug: "installing-docker", summary: "Setting up Docker on Linux, macOS, and Windows with WSL2.", duration: "12 min" },
          { title: "First Container: Hello World", slug: "first-container-hello-world", summary: "Running your first container and understanding image layers.", duration: "10 min" },
        ],
      },
      {
        title: "Module 2: Managing Containers & Images",
        lessons: [
          { title: "Docker Run in Depth", slug: "docker-run-in-depth", summary: "Flags: -d, -p, -v, -e, --name, --rm, and restart policies.", duration: "15 min" },
          { title: "Inspecting & Managing Container Lifecycle", slug: "container-lifecycle", summary: "start, stop, restart, pause, kill, logs, and exec.", duration: "12 min" },
          { title: "Writing Production Dockerfiles", slug: "writing-production-dockerfiles", summary: "FROM, RUN, COPY, ADD, CMD, ENTRYPOINT, and cache layers.", duration: "20 min" },
          { title: "Multi-Stage Docker Builds", slug: "multi-stage-docker-builds", summary: "Shrinking image size from 1GB to 25MB using Alpine and distroless.", duration: "18 min" },
        ],
      },
      {
        title: "Module 3: Storage, Networking & Compose",
        lessons: [
          { title: "Docker Volumes & Bind Mounts", slug: "docker-volumes-bind-mounts", summary: "Data persistence, named volumes vs host bind mounts.", duration: "15 min" },
          { title: "Docker Networking", slug: "docker-networking", summary: "Bridge, host, overlay, and container port publishing.", duration: "14 min" },
          { title: "Multi-Container with Docker Compose", slug: "docker-compose-guide", summary: "Services, networks, environment variables, healthchecks.", duration: "22 min" },
        ],
      },
    ],
  },
  {
    id: "kubernetes",
    title: "Kubernetes & Cloud Orchestration",
    slug: "kubernetes",
    icon: "☸️",
    badge: "Core Enterprise",
    description: "Orchestrate microservices with Pods, Deployments, Services, Ingress, ConfigMaps, Secrets, PVCs, and automated rollouts.",
    lessonsCount: 41,
    estimatedHours: 12,
    level: "Intermediate",
    modules: [
      {
        title: "Module 1: Architecture & Cluster Setup",
        lessons: [
          { title: "Introduction to Kubernetes", slug: "introduction-to-kubernetes", summary: "Container orchestration, control plane vs worker nodes.", duration: "12 min" },
          { title: "Kubernetes Architecture Breakdown", slug: "kubernetes-architecture", summary: "kube-apiserver, etcd, kube-scheduler, kubelet, kube-proxy.", duration: "18 min" },
          { title: "Mastering kubectl CLI", slug: "mastering-kubectl-cli", summary: "Imperative commands, JSONPath, contexts, and shortcuts.", duration: "15 min" },
        ],
      },
      {
        title: "Module 2: Workloads & Pod Scheduling",
        lessons: [
          { title: "Pods: The Atomic Unit", slug: "pods-deep-dive", summary: "Multi-container pods, sidecars, init-containers, and lifecycle.", duration: "16 min" },
          { title: "Deployments & Zero-Downtime Rollouts", slug: "deployments-and-rollouts", summary: "Rolling updates, maxSurge, maxUnavailable, and rollbacks.", duration: "20 min" },
          { title: "StatefulSets & DaemonSets", slug: "statefulsets-daemonsets", summary: "Managing stateful workloads and node-level daemons.", duration: "18 min" },
        ],
      },
      {
        title: "Module 3: Networking & Configuration",
        lessons: [
          { title: "ClusterIP, NodePort & LoadBalancer", slug: "kubernetes-services", summary: "Service discovery, kube-proxy iptables, endpoint slices.", duration: "20 min" },
          { title: "Ingress Controllers & TLS", slug: "ingress-and-tls", summary: "Routing HTTP/S traffic with NGINX Ingress and cert-manager.", duration: "18 min" },
          { title: "ConfigMaps & Secrets", slug: "configmaps-and-secrets", summary: "Decoupling config and managing sensitive credentials safely.", duration: "15 min" },
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
    lessonsCount: 35,
    estimatedHours: 9,
    level: "Intermediate",
    modules: [
      {
        title: "Module 1: IaC Foundations",
        lessons: [
          { title: "Introduction to Terraform & IaC", slug: "introduction-to-terraform", summary: "Declarative vs imperative infrastructure, Terraform core.", duration: "10 min" },
          { title: "Installing Terraform CLI", slug: "installing-terraform", summary: "tfenv, version managers, and local workspace setup.", duration: "8 min" },
          { title: "HCL Syntax & Blocks", slug: "hcl-syntax-and-blocks", summary: "Providers, resources, variables, locals, and outputs.", duration: "15 min" },
        ],
      },
      {
        title: "Module 2: State & Workflow",
        lessons: [
          { title: "Terraform Plan, Apply & Destroy", slug: "terraform-core-workflow", summary: "Execution plans, resource drift, dependency graphs.", duration: "18 min" },
          { title: "Remote State & S3 DynamoDB Locking", slug: "terraform-remote-state", summary: "Preventing race conditions and team state corruption.", duration: "20 min" },
          { title: "Building Reusable Terraform Modules", slug: "building-terraform-modules", summary: "Module inputs, outputs, version pinning, and registries.", duration: "22 min" },
        ],
      },
    ],
  },
  {
    id: "cicd",
    title: "CI/CD & DevOps Automation",
    slug: "cicd",
    icon: "🔄",
    badge: "Automation",
    description: "Automate build, test, lint, security scans, container publishing, and automated canary deployments.",
    lessonsCount: 17,
    estimatedHours: 6,
    level: "Intermediate",
    modules: [
      {
        title: "Module 1: CI/CD Pipelines",
        lessons: [
          { title: "Introduction to CI/CD", slug: "introduction-to-cicd", summary: "Continuous Integration vs Delivery vs Deployment.", duration: "10 min" },
          { title: "GitLab CI/CD Getting Started", slug: "gitlab-cicd-getting-started", summary: ".gitlab-ci.yml syntax, stages, runners, artifacts, cache.", duration: "20 min" },
          { title: "Automated Testing in Pipelines", slug: "automated-testing-in-pipelines", summary: "Unit tests, integration tests, linting, test reports.", duration: "15 min" },
        ],
      },
    ],
  },
  {
    id: "github-actions",
    title: "GitHub Actions",
    slug: "github-actions",
    icon: "⚡",
    badge: "High Demand",
    description: "Write automated workflows with triggers, matrix builds, secrets, reusable composite actions, and OIDC AWS authentication.",
    lessonsCount: 9,
    estimatedHours: 4,
    level: "Beginner",
    modules: [
      {
        title: "Module 1: Workflows & Syntax",
        lessons: [
          { title: "Introduction to GitHub Actions", slug: "introduction-to-github-actions", summary: "Workflows, jobs, steps, runners, and marketplace actions.", duration: "10 min" },
          { title: "Workflow YAML Syntax", slug: "github-actions-workflow-syntax", summary: "Triggers on: push, pull_request, workflow_dispatch.", duration: "15 min" },
          { title: "Building & Pushing Docker Images", slug: "gh-actions-docker-build-push", summary: "docker/build-push-action, GitHub Container Registry (GHCR).", duration: "18 min" },
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
    description: "Deploy highly available systems on Amazon Web Services. Covers VPC, EC2, S3, IAM, ALB, ECS, EKS, RDS, and CloudWatch.",
    lessonsCount: 86,
    estimatedHours: 15,
    level: "Beginner",
    modules: [
      {
        title: "Module 1: AWS Core Infrastructure",
        lessons: [
          { title: "Introduction to AWS", slug: "introduction-to-aws", summary: "Cloud computing models (IaaS, PaaS, SaaS), shared responsibility.", duration: "10 min" },
          { title: "AWS Global Infrastructure", slug: "aws-global-infrastructure", summary: "Regions, Availability Zones, Edge Locations, and latency.", duration: "12 min" },
          { title: "Virtual Private Cloud (VPC)", slug: "aws-vpc-fundamentals", summary: "Subnets, route tables, internet gateways, NAT gateways.", duration: "25 min" },
        ],
      },
      {
        title: "Module 2: Compute & Security",
        lessons: [
          { title: "EC2 & Auto Scaling Groups", slug: "aws-ec2-and-asg", summary: "Instance types, AMIs, user data, launch templates.", duration: "20 min" },
          { title: "IAM (Identity & Access Management)", slug: "aws-iam-best-practices", summary: "Users, groups, roles, policies, least privilege access.", duration: "18 min" },
        ],
      },
    ],
  },
  {
    id: "linux",
    title: "Linux & Shell Scripting",
    slug: "linux",
    icon: "🐧",
    badge: "Prerequisite",
    description: "The backbone of DevOps. Master bash commands, pipes, permissions, process management, systemd, networking, and log analysis.",
    lessonsCount: 20,
    estimatedHours: 6,
    level: "Beginner",
    modules: [
      {
        title: "Module 1: Linux Command Line Mastery",
        lessons: [
          { title: "Introduction to Linux", slug: "introduction-to-linux", summary: "Linux distributions (Debian, Ubuntu, RHEL), terminal basics.", duration: "10 min" },
          { title: "Linux Filesystem Hierarchy", slug: "linux-filesystem", summary: "/etc, /var, /bin, /dev, /home, inode structure.", duration: "14 min" },
          { title: "Permissions & Ownership (chmod, chown)", slug: "linux-permissions-chmod", summary: "rwx bitmask, numeric modes (755, 644), sudo, su.", duration: "15 min" },
        ],
      },
    ],
  },
  {
    id: "git",
    title: "Git & Version Control",
    slug: "git",
    icon: "🔧",
    badge: "Essential",
    description: "Branching strategies, interactive rebasing, merge conflict resolution, git hooks, cherry-pick, and GitOps workflows.",
    lessonsCount: 18,
    estimatedHours: 5,
    level: "Beginner",
    modules: [
      {
        title: "Module 1: Git Core Concepts",
        lessons: [
          { title: "Introduction to Git", slug: "introduction-to-git", summary: "Distributed VCS vs centralized, working tree, staging, commit.", duration: "10 min" },
          { title: "Branching, Merging & Fast-Forward", slug: "git-branching-and-merging", summary: "Feature branches, merge strategies, pull requests.", duration: "15 min" },
          { title: "Interactive Rebase & Squash", slug: "git-rebase-and-squash", summary: "Cleaning git history before merging into main.", duration: "18 min" },
        ],
      },
    ],
  },
];

