import fullData from "./roadmapsFullData.json";

export interface RoadmapTopic {
  title: string;
  badge?: string;
  description: string;
}

export interface RoadmapStage {
  header: string;
  summary: string;
  topics: RoadmapTopic[];
}

export interface RoadmapFAQ {
  question: string;
  answer: string;
}

export interface RoadmapFullDetails {
  orderMatters: string;
  stages: RoadmapStage[];
  faqs: RoadmapFAQ[];
}

export interface RoadmapMeta {
  id: string;
  slug: string;
  title: string;
  badge: string;
  description: string;
  duration: string;
  icon: string;
  details: RoadmapFullDetails;
}

export const ROADMAPS: RoadmapMeta[] = [
  {
    id: "devops-engineer",
    slug: "devops-engineer",
    title: "DevOps Engineer Roadmap",
    badge: "10 Production Stages",
    description: "The complete, battle-tested path to becoming a production-grade DevOps Engineer: Linux, Git, Docker, Kubernetes, Terraform, CI/CD, Observability, and DevSecOps.",
    duration: "4 - 6 Months",
    icon: "🚀",
    details: (fullData as Record<string, RoadmapFullDetails>)["devops-engineer"]
  },
  {
    id: "cloud-engineer",
    slug: "cloud-engineer",
    title: "Cloud Engineer Roadmap",
    badge: "8 Cloud Architecture Stages",
    description: "Master modern cloud architecture: IAM security, VPC networks, compute instances, container engines, serverless lambdas, and multi-region resilience.",
    duration: "4 - 6 Months",
    icon: "☁️",
    details: (fullData as Record<string, RoadmapFullDetails>)["cloud-engineer"]
  },
  {
    id: "sre",
    slug: "sre",
    title: "Site Reliability Engineer (SRE) Roadmap",
    badge: "7 Reliability Stages",
    description: "Learn how Google, Netflix, and top tech companies run resilient systems at scale: SLIs/SLOs, Error Budgets, Incident Command, Toil Automation, and Chaos Engineering.",
    duration: "5 - 7 Months",
    icon: "🛡️",
    details: (fullData as Record<string, RoadmapFullDetails>)["sre"]
  }
];
