export interface LessonNote {
  track: string;
  slug: string;
  title: string;
  subtitle: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  playgroundSlug: string;
  verifiedFacts: string[];
  keyConcepts: { term: string; explanation: string }[];
  sections: {
    title: string;
    paragraphs: string[];
    codeBlock?: {
      language: string;
      code: string;
      description?: string;
    };
  }[];
  quickReference: { command: string; explanation: string }[];
  commonPitfalls: string[];
}

export const LESSON_NOTES: Record<string, LessonNote> = {
  // DOCKER: Introduction to Docker
  "docker/introduction-to-docker": {
    track: "docker",
    slug: "introduction-to-docker",
    title: "Introduction to Docker & Containers",
    subtitle: "Understanding Linux Namespaces, Cgroups, Image Layers, and the Client-Daemon Architecture",
    duration: "10 min read",
    difficulty: "Beginner",
    playgroundSlug: "docker",
    verifiedFacts: [
      "Containers do NOT run a hypervisor or guest operating system. They are isolated processes sharing the host Linux kernel.",
      "Process isolation is enforced by Linux Kernel Namespaces: PID (processes), NET (networking), MNT (filesystems), IPC (inter-process communication), and UTS (hostnames).",
      "Resource throttling is enforced by Control Groups (cgroups v2): strictly limiting CPU shares, memory ceilings, and disk I/O.",
      "Docker uses copy-on-write (CoW) storage drivers (primarily overlay2) where images are stacks of read-only immutable layers.",
    ],
    keyConcepts: [
      {
        term: "Image vs Container",
        explanation: "An Image is a frozen, immutable template containing application code, runtime libraries, and environment definitions. A Container is an active, running process instance of that image with a thin read-write top layer.",
      },
      {
        term: "Docker Daemon (dockerd)",
        explanation: "The background service that manages images, containers, networks, and storage volumes. The Docker CLI talks to dockerd via the Unix socket /var/run/docker.sock or TLS-secured TCP.",
      },
      {
        term: "Overlay2 Storage Driver",
        explanation: "Combines lower read-only image layers with an upper read-write container layer into a unified view, minimizing disk duplication.",
      },
    ],
    sections: [
      {
        title: "1. The Problem: 'It Works on My Machine'",
        paragraphs: [
          "Before containers, deploying software involved installing conflicting system dependencies, differing libc versions, and distinct operating system kernels between developer laptops and production servers.",
          "Virtual Machines solved isolation but introduced massive hypervisor overhead: each VM requires an entire guest operating system, consuming gigabytes of RAM and taking minutes to boot.",
          "Docker solves this by packaging the application and its entire user-space filesystem together, running directly on the host Linux kernel with zero hypervisor tax.",
        ],
      },
      {
        title: "2. The Container Lifecycle Workflow",
        paragraphs: [
          "Working with Docker follows a clear four-step cycle: Pull (or Build), Run, Inspect, and Cleanup.",
          "When you pull an image, Docker fetches content-addressable layer tarballs verified by SHA256 digests. Multiple containers can instantiate from the same image simultaneously without duplicating underlying disk storage.",
        ],
        codeBlock: {
          language: "bash",
          code: `# 1. Download immutable image from registry
docker pull nginx:1.25-alpine

# 2. Run container in background (-d) and publish host port 8080 to container 80
docker run -d --name web-server -p 8080:80 nginx:1.25-alpine

# 3. Inspect active containers
docker ps

# 4. Stream application stdout/stderr logs
docker logs web-server`,
          description: "Core CLI commands for running an isolated container.",
        },
      },
      {
        title: "3. Docker Architecture Deep Dive",
        paragraphs: [
          "The Docker engine comprises three distinct architectural layers:",
          "1. Docker CLI: The command-line client that accepts user input and constructs HTTP requests.",
          "2. dockerd: The persistent daemon that manages high-level objects (images, containers, networks, volumes) and coordinates with containerd.",
          "3. containerd & runc: The Open Container Initiative (OCI) runtime that actually interacts with the Linux kernel via clone(), unshare(), and cgroups to execute processes.",
        ],
      },
    ],
    quickReference: [
      { command: "docker pull <image>", explanation: "Downloads image from registry to local cache" },
      { command: "docker run -d -p <host>:<container> <image>", explanation: "Runs container in detached background mode with port forwarding" },
      { command: "docker ps -a", explanation: "Lists all containers including stopped ones" },
      { command: "docker stop <name>", explanation: "Sends SIGTERM (followed by SIGKILL after 10s) to gracefully stop container" },
      { command: "docker rm -f <name>", explanation: "Force removes container process" },
    ],
    commonPitfalls: [
      "Storing persistent state (like database files) inside the container's ephemeral read-write layer instead of a Docker Volume.",
      "Running container processes as root (UID 0), which introduces severe security risks if a container breakout vulnerability occurs.",
      "Binding ports to 0.0.0.0 without realizing that Docker automatically writes iptables rules that bypass standard UFW firewalls on Linux hosts.",
    ],
  },

  // DOCKER: Why Use Docker
  "docker/why-use-docker": {
    track: "docker",
    slug: "why-use-docker",
    title: "Why Use Docker? Containers vs Virtual Machines",
    subtitle: "Architectural comparison of hypervisors, process isolation, performance benchmarks, and CI/CD consistency",
    duration: "8 min read",
    difficulty: "Beginner",
    playgroundSlug: "docker",
    verifiedFacts: [
      "A Type-2 VM hypervisor (like VirtualBox) duplicates the kernel, system services, and drivers, incurring 15-25% memory overhead.",
      "Containers achieve near-native bare-metal execution speed because instructions execute directly on the host CPU without instruction emulation.",
      "A standard Alpine Linux container image is only 7.8 MB in size, compared to a standard Ubuntu VM image which requires 2+ GB.",
    ],
    keyConcepts: [
      { term: "Hypervisor Overhead", explanation: "VMs require allocating dedicated RAM and virtual disk slices upfront, whereas containers consume only the actual memory required by their running processes." },
      { term: "Reproducible CI/CD", explanation: "Docker guarantees identical environment semantics from local developer workstations through automated pull-request validation pipelines to production clusters." },
    ],
    sections: [
      {
        title: "1. Head-to-Head Comparison: Containers vs Virtual Machines",
        paragraphs: [
          "Virtual Machines virtualize physical hardware. Every VM runs a dedicated OS kernel, init system, background daemons, and package managers.",
          "Containers virtualize the operating system. All containers running on an engine share the same host kernel, while namespaces give each process its own isolated network stack, process ID space, and filesystem tree.",
        ],
      },
      {
        title: "2. Density and Startup Speed",
        paragraphs: [
          "Starting a Virtual Machine requires booting an entire operating system kernel, taking 30 to 120 seconds.",
          "Starting a Docker container is simply launching a Linux process with restricted namespaces, which occurs in 50 to 200 milliseconds.",
          "On a 32 GB RAM server, you might comfortably run 8 to 12 VMs, whereas the same host can support hundreds of microservice containers.",
        ],
        codeBlock: {
          language: "bash",
          code: `# Inspect memory and CPU consumption across running containers
docker stats --no-stream`,
          description: "Live resource utilization of running containers.",
        },
      },
    ],
    quickReference: [
      { command: "docker stats", explanation: "Display live stream of container CPU, memory, and network usage" },
      { command: "docker system df", explanation: "Show total disk space consumed by images, containers, and local volumes" },
    ],
    commonPitfalls: [
      "Assuming Docker provides the same hardware-level isolation as a VM; kernel vulnerabilities on the host can theoretically affect all containers unless seccomp/AppArmor are configured.",
      "Treating containers like long-lived VMs by attempting to SSH into them and manually patching packages instead of rebuilding the Dockerfile.",
    ],
  },

  // KUBERNETES: Introduction to Kubernetes
  "kubernetes/introduction-to-kubernetes": {
    track: "kubernetes",
    slug: "introduction-to-kubernetes",
    title: "Introduction to Kubernetes (K8s)",
    subtitle: "Declarative Cluster Orchestration, Reconciliation Loops, Control Plane Components, and Pod Abstractions",
    duration: "12 min read",
    difficulty: "Intermediate",
    playgroundSlug: "kubernetes",
    verifiedFacts: [
      "Kubernetes operates on a declarative model: you specify the 'Desired State' in YAML, and controllers continuously reconcile the 'Current State' to match it.",
      "kube-apiserver is the ONLY control plane component that communicates directly with etcd; all other components communicate exclusively through the API server.",
      "etcd is a strongly consistent distributed key-value store using the Raft consensus algorithm, storing the complete state of the Kubernetes cluster.",
      "A Pod is the smallest schedulable compute unit in Kubernetes, grouping one or more co-located containers that share network namespaces (same IP address) and storage volumes.",
    ],
    keyConcepts: [
      {
        term: "Control Plane",
        explanation: "The brains of the cluster: kube-apiserver (API gateway), etcd (state store), kube-scheduler (placement engine), and kube-controller-manager (reconciliation loops).",
      },
      {
        term: "Worker Nodes",
        explanation: "The compute instances running the container workloads: managed by the kubelet agent, kube-proxy (network rules), and an OCI container runtime (containerd).",
      },
      {
        term: "Reconciliation Loop",
        explanation: "Continuous control loop: Observe actual state -> Compare with declared desired state -> Execute corrective changes -> Repeat.",
      },
    ],
    sections: [
      {
        title: "1. The Problem: Managing Containers at Scale",
        paragraphs: [
          "Running Docker on a single host works for development, but fails in production when a host server crashes, traffic spikes 10x, or a container dies without anyone noticing.",
          "Kubernetes provides automated scheduling across a pool of machines, self-healing (auto-restarting dead containers), horizontal autoscaling, zero-downtime rolling updates, and built-in service discovery.",
        ],
      },
      {
        title: "2. Declarative Deployments",
        paragraphs: [
          "Instead of manually typing 'docker run' on individual servers, in Kubernetes you declare a Deployment manifest. If a worker node burns down in AWS, the Kubernetes scheduler immediately detects missing pods and reschedules them onto surviving healthy nodes.",
        ],
        codeBlock: {
          language: "yaml",
          code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-service
  namespace: default
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
      - name: web
        image: nginx:1.25-alpine
        ports:
        - containerPort: 80
        resources:
          limits:
            memory: "256Mi"
            cpu: "500m"`,
          description: "Production Deployment manifest with 3 replicas and resource limits.",
        },
      },
      {
        title: "3. Cluster Networking Fundamentals",
        paragraphs: [
          "Kubernetes enforces a flat network model where every Pod receives its own unique IP address within the cluster network (Pod CIDR).",
          "Containers within the same pod communicate over localhost (127.0.0.1).",
          "A Service object creates a stable virtual IP (ClusterIP) and DNS name that load balances traffic across all pods matching the specified label selector.",
        ],
      },
    ],
    quickReference: [
      { command: "kubectl get nodes", explanation: "Inspect status and health of all cluster worker and control plane nodes" },
      { command: "kubectl get pods -A -o wide", explanation: "List all pods across all namespaces with assigned node and IP" },
      { command: "kubectl apply -f manifest.yaml", explanation: "Declaratively apply configuration changes to the cluster" },
      { command: "kubectl scale deployment <name> --replicas=<n>", explanation: "Dynamically scale the number of running pod replicas" },
      { command: "kubectl rollout status deployment <name>", explanation: "Watch the progress of a rolling deployment update" },
    ],
    commonPitfalls: [
      "Failing to specify resource requests and limits in Pod specs, leading to CPU starvation and node OOMKilled evictions.",
      "Using mutable ':latest' image tags in production deployments, preventing reproducible rollbacks and causing nodes to cache outdated images.",
      "Exposing services to the public internet via NodePort instead of using an Ingress Controller with TLS termination.",
    ],
  },

  // TERRAFORM: Introduction to Terraform
  "terraform/introduction-to-terraform": {
    track: "terraform",
    slug: "introduction-to-terraform",
    title: "Introduction to Terraform & Infrastructure as Code",
    subtitle: "Declarative Cloud Provisioning, Directed Acyclic Dependency Graphs, Provider Ecosystem, and State Tracking",
    duration: "10 min read",
    difficulty: "Intermediate",
    playgroundSlug: "terraform",
    verifiedFacts: [
      "Terraform uses a declarative paradigm: you define 'what' infrastructure should exist, and Terraform figures out 'how' to provision it via API calls.",
      "Terraform builds a Directed Acyclic Graph (DAG) of resource dependencies to create independent resources in parallel while respecting explicit dependencies.",
      "The terraform.tfstate file is the single source of truth mapping declared HCL code to real cloud provider IDs.",
      "Concurrent execution on state files can cause race conditions and resource corruption; S3 backends require DynamoDB distributed locking.",
    ],
    keyConcepts: [
      {
        term: "Providers",
        explanation: "Plugins that translate Terraform HCL declarations into upstream cloud API calls (e.g., AWS, Google Cloud, Azure, Kubernetes, GitHub).",
      },
      {
        term: "State File (terraform.tfstate)",
        explanation: "A JSON file recording metadata, attributes, and resource IDs of real cloud infrastructure managed by Terraform.",
      },
      {
        term: "Execution Plan (terraform plan)",
        explanation: "A dry-run computation comparing the local HCL code against the remote state to calculate exact additions (+), modifications (~), and deletions (-).",
      },
    ],
    sections: [
      {
        title: "1. Why Infrastructure as Code (IaC)?",
        paragraphs: [
          "Manual infrastructure configuration in cloud web consoles ('ClickOps') leads to human error, configuration drift between environments, and zero disaster recovery reproducibility.",
          "With Terraform, infrastructure is treated identically to software: committed to Git, reviewed through pull requests, tested in CI pipelines, and versioned over time.",
        ],
      },
      {
        title: "2. The Core Terraform Workflow",
        paragraphs: [
          "The fundamental Terraform lifecycle follows four deterministic commands:",
          "1. 'terraform init': Downloads required provider plugins and initializes the remote backend.",
          "2. 'terraform validate' & 'fmt': Validates HCL syntax and canonical indentation.",
          "3. 'terraform plan': Generates an execution plan without modifying cloud resources.",
          "4. 'terraform apply': Provisions or updates the infrastructure to match the desired state.",
        ],
        codeBlock: {
          language: "hcl",
          code: `terraform {
  required_version = ">= 1.7.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_vpc" "production" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true

  tags = {
    Name        = "prod-vpc"
    Environment = "production"
  }
}`,
          description: "Canonical Terraform HCL block declaring an AWS VPC.",
        },
      },
    ],
    quickReference: [
      { command: "terraform init", explanation: "Initializes working directory and downloads provider plugins" },
      { command: "terraform fmt -recursive", explanation: "Automatically formats all HCL files to standard style" },
      { command: "terraform plan", explanation: "Calculates differences between code and live cloud state" },
      { command: "terraform apply", explanation: "Executes the changes required to reach desired state" },
      { command: "terraform destroy", explanation: "Tears down all resources managed by the state file" },
    ],
    commonPitfalls: [
      "Committing sensitive cloud secrets (AWS access keys) or unencrypted state files containing passwords into Git repositories.",
      "Editing the remote cloud infrastructure manually in AWS Console, causing configuration drift that Terraform will attempt to overwrite on next apply.",
      "Forgetting to configure remote state locking, allowing two team members to run 'apply' simultaneously and corrupt state.",
    ],
  },

  // AWS: Introduction to AWS
  "aws/introduction-to-aws": {
    track: "aws",
    slug: "introduction-to-aws",
    title: "Introduction to AWS Cloud Architecture",
    subtitle: "Global Infrastructure, Regions, Availability Zones, Shared Responsibility Model, and VPC Foundations",
    duration: "10 min read",
    difficulty: "Beginner",
    playgroundSlug: "terraform",
    verifiedFacts: [
      "An AWS Region is a physical geographical location containing at least 3 isolated, physically separated Availability Zones (AZs).",
      "Availability Zones within a Region are connected via low-latency, private high-throughput fiber networks.",
      "Under the AWS Shared Responsibility Model, AWS manages 'Security OF the Cloud' (hardware, facilities, hypervisor), while the customer manages 'Security IN the Cloud' (IAM, OS patching, firewall rules, encryption).",
    ],
    keyConcepts: [
      { term: "Regions vs AZs", explanation: "Regions provide geographical redundancy; AZs within a region provide fault-tolerant high availability with single-digit millisecond latency." },
      { term: "Least Privilege (IAM)", explanation: "Identities (users and roles) must be granted only the specific actions required on specific resource ARNs." },
    ],
    sections: [
      {
        title: "1. The AWS Global Cloud Footprint",
        paragraphs: [
          "Deploying in cloud means architecting for failure. Hard drives crash, network switches fail, and power outages happen.",
          "AWS mitigates this by allowing you to deploy workloads across multiple Availability Zones. Even if an entire data center loses power, your load balancer automatically routes traffic to instances in another AZ.",
        ],
      },
    ],
    quickReference: [
      { command: "aws sts get-caller-identity", explanation: "Verify current IAM credentials and account ID" },
      { command: "aws ec2 describe-regions", explanation: "List all enabled AWS geographical regions" },
    ],
    commonPitfalls: [
      "Deploying all compute instances in a single Availability Zone, causing total downtime if that data center experiences an outage.",
      "Using the AWS Account Root User for daily administration instead of IAM Identity Center or temporary assumed roles.",
    ],
  },

  // CI/CD: Introduction to CI/CD
  "cicd/introduction-to-cicd": {
    track: "cicd",
    slug: "introduction-to-cicd",
    title: "Continuous Integration & Continuous Delivery (CI/CD)",
    subtitle: "Automated Build Validation, Static Code Analysis, Artifact Registries, and Canary Deployments",
    duration: "10 min read",
    difficulty: "Intermediate",
    playgroundSlug: "docker",
    verifiedFacts: [
      "Continuous Integration (CI) requires developers to merge code into main frequently, triggering automated builds and tests on every commit.",
      "Continuous Delivery (CD) ensures software is automatically packaged, tested, and ready for deployment to production at any time.",
      "Continuous Deployment takes CD one step further: every change that passes all pipeline test stages is automatically deployed directly to production with zero manual intervention.",
    ],
    keyConcepts: [
      { term: "Build Artifact", explanation: "Immutable compiled binary or Docker container image packaged and tagged with Git commit SHA." },
      { term: "Pipeline Stages", explanation: "Sequential or parallel execution gates: Lint -> Unit Test -> Integration Test -> Build Image -> Security Scan -> Deploy Staging -> Deploy Prod." },
    ],
    sections: [
      {
        title: "1. The Anatomy of a Modern Pipeline",
        paragraphs: [
          "Without CI/CD, releases are rare, stressful manual events fraught with merge conflicts and broken deployments.",
          "A robust pipeline automatically runs linters, unit tests, security vulnerability scanners (e.g. Trivy / Snyk), compiles Docker images, and pushes artifacts to a registry.",
        ],
      },
    ],
    quickReference: [
      { command: "git push origin main", explanation: "Standard trigger for automated CI pipeline execution" },
    ],
    commonPitfalls: [
      "Building the container image multiple times across different pipeline environments instead of building once and promoting the identical immutable image artifact.",
      "Hardcoding plaintext API tokens and credentials in pipeline script definitions instead of using masked secret variables or OIDC.",
    ],
  },

  // LINUX: Introduction to Linux
  "linux/introduction-to-linux": {
    track: "linux",
    slug: "introduction-to-linux",
    title: "Linux Fundamentals for DevOps Engineers",
    subtitle: "Filesystem Hierarchy Standard (FHS), Permissions, Process Management, and Bash Pipeline Automation",
    duration: "10 min read",
    difficulty: "Beginner",
    playgroundSlug: "linux",
    verifiedFacts: [
      "In Linux, 'everything is a file', including hardware devices (/dev), kernel runtime metrics (/proc), and network sockets.",
      "The Filesystem Hierarchy Standard (FHS) specifies standard directories: /etc (configuration), /var/log (logs), /home (user dirs), and /bin /sbin (binaries).",
      "Permissions consist of 3 octal groups (User, Group, Others) with 3 bitmask permissions: Read (4), Write (2), and Execute (1).",
    ],
    keyConcepts: [
      { term: "FHS (Filesystem Hierarchy Standard)", explanation: "Standardized directory structure across Linux distributions (Ubuntu, Debian, RHEL, Alpine)." },
      { term: "Pipes and Redirection", explanation: "Standard input (stdin 0), standard output (stdout 1), and standard error (stderr 2) combined using '|', '>', and '>>'." },
    ],
    sections: [
      {
        title: "1. Why Linux is the Foundation of DevOps",
        paragraphs: [
          "Over 95% of cloud workloads, Kubernetes worker nodes, and Docker containers run Linux. Understanding process management, network sockets, permissions, and bash scripting is fundamental.",
        ],
        codeBlock: {
          language: "bash",
          code: `# Inspect processes consuming memory
ps aux --sort=-%mem | head -n 10

# Follow system logs in real time
journalctl -f -u docker.service

# Check open network ports
ss -tulpn`,
          description: "Essential Linux inspection commands.",
        },
      },
    ],
    quickReference: [
      { command: "chmod 755 <file>", explanation: "Sets rwxr-xr-x (Owner: read/write/exec, Group & Others: read/exec)" },
      { command: "chown user:group <file>", explanation: "Changes file owner and group" },
      { command: "tail -f <file>", explanation: "Follows real-time additions to log files" },
    ],
    commonPitfalls: [
      "Running 'chmod 777' on files to fix permission issues, completely stripping all security boundaries.",
      "Killing processes with 'kill -9' (SIGKILL) instead of 'kill -15' (SIGTERM), which prevents applications from cleaning up sockets and flushing writes.",
    ],
  },

  // GIT: Introduction to Git
  "git/introduction-to-git": {
    track: "git",
    slug: "introduction-to-git",
    title: "Git & Version Control Mastery",
    subtitle: "Directed Acyclic Graphs of Commits, Staging Areas, Rebase Workflows, and GitOps Foundations",
    duration: "10 min read",
    difficulty: "Beginner",
    playgroundSlug: "linux",
    verifiedFacts: [
      "Git does not store diffs; it stores snapshots of the entire repository index as content-addressable blobs organized in a Merkle tree.",
      "Every commit is identified by a 40-character SHA-1 (or SHA-256) hash representing its tree object, parent commits, author, and commit message.",
      "GitOps uses Git repositories as the single source of truth for declared infrastructure and application state.",
    ],
    keyConcepts: [
      { term: "Three Trees", explanation: "Working Directory (local files) -> Staging Area / Index (prepared changes) -> Repository / Commit History (permanent snapshots)." },
      { term: "Rebase vs Merge", explanation: "Merge preserves chronological branch topology; Rebase rewrites commit history linearly onto the tip of the target branch." },
    ],
    sections: [
      {
        title: "1. The Git Object Model",
        paragraphs: [
          "Git's power comes from its mathematical elegance: everything in .git/objects is either a Blob (file content), Tree (directory list), Commit (metadata + tree pointer), or Tag.",
        ],
      },
    ],
    quickReference: [
      { command: "git status", explanation: "Displays differences between working tree and staging area" },
      { command: "git rebase -i HEAD~3", explanation: "Interactively squashes, edits, or reorders last 3 commits" },
      { command: "git reflog", explanation: "Lists reference history of HEAD to recover lost commits" },
    ],
    commonPitfalls: [
      "Force-pushing ('git push -f') to shared team branches like main, destroying commits pushed by colleagues.",
      "Committing secret environment variables or API keys into git history; even if deleted in a later commit, the secret persists in git history unless scrubbed with BFG or git-filter-repo.",
    ],
  },
};
