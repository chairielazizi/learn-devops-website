import interviewData from "./interviewQuestionsFull.json";

export interface QuestionItem {
  id: string;
  number: number;
  title: string;
  level: "Junior" | "Mid" | "Senior" | string;
  html: string;
  track?: string;
}

export interface InterviewTrackMeta {
  slug: string;
  name: string;
  badge: string;
  count: number;
  description: string;
  topics: string[];
}

export const INTERVIEW_TRACKS: InterviewTrackMeta[] = [
  {
    slug: "docker",
    name: "Docker",
    badge: "28 questions",
    count: 28,
    description: "28 Docker questions from real interviews, sorted by seniority: images and layers, networking, volumes, Compose, security and multi-stage builds.",
    topics: ["Images & Containers", "Layer Caching", "Volumes vs Bind Mounts", "Multi-stage Builds", "Compose", "Security"]
  },
  {
    slug: "kubernetes",
    name: "Kubernetes",
    badge: "30 questions",
    count: 30,
    description: "30 Kubernetes questions from real DevOps and SRE interviews, sorted by seniority: Pods, Services and networking, probes, Ingress, scheduling, storage, RBAC and Helm.",
    topics: ["Pods & Sidecars", "Services & Ingress", "Readiness & Liveness", "HPA & Autoscaling", "RBAC & ServiceAccounts", "StatefulSets & PVs"]
  },
  {
    slug: "aws",
    name: "AWS",
    badge: "29 questions",
    count: 29,
    description: "29 AWS questions from real DevOps and cloud interviews, sorted by seniority: IAM, VPC networking, EC2 and scaling, S3 durability, ECS, EKS and Lambda.",
    topics: ["IAM Policies & Roles", "VPC & Subnets", "Auto Scaling & ALBs", "S3 Storage Classes", "ECS Fargate & EKS", "CloudWatch & Cost"]
  },
  {
    slug: "terraform",
    name: "Terraform",
    badge: "25 questions",
    count: 25,
    description: "25 Terraform questions from real interviews, sorted by seniority: state and locking, modules, count against for_each, provisioners, backend architecture and drift.",
    topics: ["State Locking & S3/DynamoDB", "for_each vs count", "Modules & DRY", "Terraform Plan vs Apply", "Drift Detection", "Workspaces"]
  },
  {
    slug: "linux",
    name: "Linux",
    badge: "26 questions",
    count: 26,
    description: "26 Linux questions from real DevOps and SRE interviews, sorted by seniority: permissions, processes and signals, systemd, networking utilities, disk space, and performance triage.",
    topics: ["Processes & Signals", "File Permissions & ACLs", "Systemd Services", "Network Diagnostics", "Disk & Inode Triage", "Kernel Tunables"]
  },
  {
    slug: "git",
    name: "Git",
    badge: "26 questions",
    count: 26,
    description: "26 Git questions from real DevOps interviews, sorted by seniority: merge against rebase, reset against revert, the reflog, detached HEAD, submodules, and cherry-pick.",
    topics: ["Merge vs Rebase", "Soft vs Hard Reset", "Git Reflog Recovery", "Detached HEAD", "Cherry-pick & Conflict", "Submodules & Worktrees"]
  }
];

export const INTERVIEW_QUESTIONS_BY_TRACK: Record<string, QuestionItem[]> = interviewData as unknown as Record<string, QuestionItem[]>;

// Flattened list for global search
export const ALL_INTERVIEW_QUESTIONS: (QuestionItem & { trackSlug: string; trackName: string })[] = [];

INTERVIEW_TRACKS.forEach((track) => {
  const items = INTERVIEW_QUESTIONS_BY_TRACK[track.slug] || [];
  items.forEach((item) => {
    ALL_INTERVIEW_QUESTIONS.push({
      ...item,
      trackSlug: track.slug,
      trackName: track.name
    });
  });
});
