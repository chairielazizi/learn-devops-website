export interface InterviewQuestion {
  id: string;
  category: "Docker" | "Kubernetes" | "Terraform" | "AWS" | "Linux" | "Git" | "DevOps";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  question: string;
  shortAnswer: string;
  detailedAnswer: string[];
  keyPoints: string[];
}

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: "q-docker-vs-vm",
    category: "Docker",
    difficulty: "Beginner",
    question: "What is the difference between Docker Containers and Virtual Machines (VMs)?",
    shortAnswer: "Containers share the host operating system kernel and isolate processes using namespaces and cgroups, making them lightweight (MBs) and near-instant to start. VMs emulate full virtual hardware and run a separate guest OS via a hypervisor, consuming significantly more memory and boot time.",
    detailedAnswer: [
      "Virtual Machines run atop a Hypervisor (Type 1 bare-metal like ESXi, or Type 2 like VirtualBox). Each VM bundles a complete copy of an operating system, kernel, virtual drivers, and virtual memory.",
      "Docker Containers execute directly on the host kernel. Linux Kernel Namespaces provide isolation (PID, Mount, Network, IPC, UTS), while Control Groups (cgroups) meter and throttle resources (CPU, Memory, Disk I/O, Network bandwidth).",
      "Because containers avoid the guest OS abstraction layer, they achieve near-native execution performance, sub-second boot times, and density 5x to 10x higher than traditional VMs.",
    ],
    keyPoints: ["Shared host kernel vs Hypervisor guest OS", "Namespaces for isolation, cgroups for resource metering", "Lightweight startup speed & reduced storage footprint"],
  },
  {
    id: "q-k8s-pod-vs-container",
    category: "Kubernetes",
    difficulty: "Intermediate",
    question: "Why does Kubernetes schedule 'Pods' instead of individual containers?",
    shortAnswer: "A Pod is the smallest deployable compute unit in Kubernetes. It encapsulates one or more containers that share network namespace (same IP, loopback, port space), IPC, and shared storage volumes, enabling multi-container patterns like sidecars and proxies.",
    detailedAnswer: [
      "Containers within the same pod share a network namespace via the pause container, meaning they communicate over localhost and share port mappings.",
      "They can mount shared volume volumes, enabling workflows like log shipping sidecars (e.g. FluentBit tailing logs written to an emptyDir by the main application).",
      "Scheduling at the Pod level guarantees that tightly-coupled co-dependent containers are co-located on the identical node without requiring manual affinity configuration.",
    ],
    keyPoints: ["Shared localhost & network namespace", "Shared volume mounts", "Enables Sidecar, Ambassador, and Adapter patterns"],
  },
  {
    id: "q-tf-state-lock",
    category: "Terraform",
    difficulty: "Intermediate",
    question: "Why is Terraform State Locking critical, and how does it prevent infrastructure disasters?",
    shortAnswer: "State locking prevents concurrent Terraform executions from modifying or corrupting the shared remote state file simultaneously. When using S3, a DynamoDB table with a 'LockID' primary key is used to enforce distributed mutual exclusion.",
    detailedAnswer: [
      "Without state locking, if two engineers or CI pipelines run 'terraform apply' simultaneously, one execution could overwrite the state file written by the other, or cause dual resource provisioning.",
      "When a command starts (plan or apply), Terraform writes an item into DynamoDB with a unique LockID. Other operations attempting to run will fail with 'Error acquiring the state lock'.",
      "Once the operation completes successfully or errors gracefully, the LockID item is removed.",
    ],
    keyPoints: ["Prevents concurrent writes and state file corruption", "Enforces mutual exclusion via DynamoDB LockID table", "Unlocked using 'terraform force-unlock' if an abnormal abort occurs"],
  },
  {
    id: "q-linux-process-states",
    category: "Linux",
    difficulty: "Intermediate",
    question: "What are Zombie and Orphan processes in Linux, and how does the OS handle them?",
    shortAnswer: "An Orphan process is one whose parent died before it; it is adopted by PID 1 (init / systemd). A Zombie process is a process that has completed execution but whose exit status hasn't been reaped by its parent via the wait() syscall.",
    detailedAnswer: [
      "When a parent process terminates while child processes are still running, the Linux kernel re-parents those children to PID 1 (systemd). PID 1 periodically issues wait() calls to harvest them cleanly.",
      "A Zombie process (state 'Z' in top/ps) occupies zero CPU and zero memory, but retains an entry in the system Process Table (PID).",
      "If a faulty application spawns millions of zombies without calling wait(), it will exhaust the operating system's maximum PID limit (/proc/sys/kernel/pid_max), preventing new processes from spawning.",
    ],
    keyPoints: ["Orphans are adopted by PID 1 (systemd)", "Zombies retain a slot in the PID table until reaped", "PID table exhaustion can cause system-wide denial of service"],
  },
];

