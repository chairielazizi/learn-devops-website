// Auto-generated mapping of parent modules to child subsections
export interface SubLesson {
  id: string;
  title: string;
  slug: string;
}

export const TUTORIAL_SUBSECTIONS: Record<string, SubLesson[]> = {
  "installing-docker": [
    {
      "id": "windows",
      "title": "Windows Installation",
      "slug": "installing-docker-windows"
    },
    {
      "id": "macos",
      "title": "macOS Installation",
      "slug": "installing-docker-macos"
    },
    {
      "id": "linux",
      "title": "Linux Installation",
      "slug": "installing-docker-linux"
    }
  ],
  "docker-images": [
    {
      "id": "naming-tags",
      "title": "Naming & Tags",
      "slug": "docker-images-naming-tags"
    },
    {
      "id": "docker-hub",
      "title": "Docker Hub",
      "slug": "docker-images-hub"
    },
    {
      "id": "docker-pull",
      "title": "Docker Pull",
      "slug": "docker-images-pull"
    },
    {
      "id": "listing",
      "title": "List & Inspect",
      "slug": "docker-images-listing"
    },
    {
      "id": "building",
      "title": "Building Images",
      "slug": "docker-images-building"
    },
    {
      "id": "layers-caching",
      "title": "Layers & Caching",
      "slug": "docker-images-layers"
    },
    {
      "id": "multi-stage",
      "title": "Multi-Stage Builds",
      "slug": "docker-images-multi-stage"
    },
    {
      "id": "optimization",
      "title": "Optimization",
      "slug": "docker-images-optimization"
    },
    {
      "id": "managing",
      "title": "Managing Images",
      "slug": "docker-images-managing"
    }
  ],
  "docker-containers": [
    {
      "id": "running",
      "title": "Running Containers",
      "slug": "docker-containers-running"
    },
    {
      "id": "lifecycle",
      "title": "Lifecycle",
      "slug": "docker-containers-lifecycle"
    },
    {
      "id": "interaction",
      "title": "Exec & Interact",
      "slug": "docker-containers-interaction"
    },
    {
      "id": "logs",
      "title": "Logs & Monitoring",
      "slug": "docker-containers-logs"
    },
    {
      "id": "networking",
      "title": "Networking Basics",
      "slug": "docker-containers-networking"
    },
    {
      "id": "volumes",
      "title": "Volumes & Storage",
      "slug": "docker-containers-volumes"
    },
    {
      "id": "env",
      "title": "Env Vars & Config",
      "slug": "docker-containers-env"
    },
    {
      "id": "cleanup",
      "title": "Cleanup & Pruning",
      "slug": "docker-containers-cleanup"
    }
  ],
  "dockerfile-basics": [
    {
      "id": "from",
      "title": "FROM",
      "slug": "dockerfile-from"
    },
    {
      "id": "copy-add",
      "title": "COPY & ADD",
      "slug": "dockerfile-copy-add"
    },
    {
      "id": "run",
      "title": "RUN",
      "slug": "dockerfile-run"
    },
    {
      "id": "cmd-entrypoint",
      "title": "CMD & ENTRYPOINT",
      "slug": "dockerfile-cmd-entrypoint"
    },
    {
      "id": "env-arg",
      "title": "ENV & ARG",
      "slug": "dockerfile-env-arg"
    },
    {
      "id": "workdir-expose",
      "title": "WORKDIR & EXPOSE",
      "slug": "dockerfile-workdir-expose"
    },
    {
      "id": "best-practices",
      "title": "Best Practices",
      "slug": "dockerfile-best-practices"
    },
    {
      "id": "real-world",
      "title": "Real-World Examples",
      "slug": "dockerfile-real-world"
    }
  ],
  "terraform-core-workflow": [
    {
      "id": "init",
      "title": "terraform init",
      "slug": "terraform-init"
    },
    {
      "id": "plan",
      "title": "terraform plan",
      "slug": "terraform-plan"
    },
    {
      "id": "apply",
      "title": "terraform apply",
      "slug": "terraform-apply"
    },
    {
      "id": "destroy",
      "title": "terraform destroy",
      "slug": "terraform-destroy"
    }
  ],
  "terraform-variables-and-outputs": [
    {
      "id": "input-vars",
      "title": "Input Variables",
      "slug": "terraform-input-variables"
    },
    {
      "id": "locals",
      "title": "Local Values",
      "slug": "terraform-local-values"
    },
    {
      "id": "outputs",
      "title": "Output Values",
      "slug": "terraform-output-values"
    }
  ],
  "terraform-state-and-backends": [
    {
      "id": "state-overview",
      "title": "State Overview",
      "slug": "terraform-state-overview"
    },
    {
      "id": "backends",
      "title": "Remote Backends",
      "slug": "terraform-remote-backends"
    },
    {
      "id": "state-commands",
      "title": "State Commands",
      "slug": "terraform-state-commands"
    }
  ],
  "terraform-modules": [
    {
      "id": "using-modules",
      "title": "Using Modules",
      "slug": "terraform-using-modules"
    },
    {
      "id": "writing-modules",
      "title": "Writing Modules",
      "slug": "terraform-writing-modules"
    }
  ],
  "terraform-count-and-for-each": [
    {
      "id": "count",
      "title": "terraform count",
      "slug": "terraform-count"
    },
    {
      "id": "for-each",
      "title": "terraform for_each",
      "slug": "terraform-for-each"
    }
  ],
  "terraform-expressions-functions": [
    {
      "id": "string-functions",
      "title": "String Functions",
      "slug": "terraform-string-functions"
    },
    {
      "id": "collection-functions",
      "title": "Collection Functions",
      "slug": "terraform-collection-functions"
    }
  ],
  "terraform-with-aws": [
    {
      "id": "aws-vpc",
      "title": "AWS VPC Setup",
      "slug": "terraform-aws-vpc"
    },
    {
      "id": "aws-ec2",
      "title": "EC2 Web Server",
      "slug": "terraform-aws-ec2"
    },
    {
      "id": "aws-s3",
      "title": "S3 Static Assets",
      "slug": "terraform-aws-s3"
    }
  ],
  "gitlab-ci-stages-and-jobs": [
    {
      "id": "stages-jobs",
      "title": "Stages & Jobs",
      "slug": "gitlab-ci-stages-jobs"
    },
    {
      "id": "artifacts",
      "title": "Artifacts",
      "slug": "gitlab-ci-artifacts"
    },
    {
      "id": "cache",
      "title": "Cache",
      "slug": "gitlab-ci-cache"
    }
  ],
  "docker-volumes": [
    {
      "id": "named",
      "title": "Named Volumes",
      "slug": "docker-volumes-named"
    },
    {
      "id": "bind-mounts",
      "title": "Bind Mounts",
      "slug": "docker-volumes-bind-mounts"
    },
    {
      "id": "management",
      "title": "Volume Management",
      "slug": "docker-volumes-management"
    }
  ],
  "installing-kubernetes": [
    {
      "id": "minikube",
      "title": "Minikube",
      "slug": "installing-kubernetes-minikube"
    },
    {
      "id": "kind",
      "title": "kind",
      "slug": "installing-kubernetes-kind"
    },
    {
      "id": "kubectl",
      "title": "kubectl",
      "slug": "installing-kubernetes-kubectl"
    }
  ],
  "kubectl-basics": [
    {
      "id": "get-describe",
      "title": "get & describe",
      "slug": "kubectl-get-describe"
    },
    {
      "id": "apply-delete",
      "title": "apply & delete",
      "slug": "kubectl-apply-delete"
    },
    {
      "id": "exec-logs",
      "title": "exec & logs",
      "slug": "kubectl-exec-logs"
    },
    {
      "id": "contexts-namespaces",
      "title": "Contexts & Namespaces",
      "slug": "kubectl-contexts-namespaces"
    }
  ],
  "kubernetes-pods": [
    {
      "id": "manifest",
      "title": "Pod Manifest",
      "slug": "kubernetes-pods-manifest"
    },
    {
      "id": "lifecycle",
      "title": "Pod Lifecycle",
      "slug": "kubernetes-pods-lifecycle"
    },
    {
      "id": "multicontainer",
      "title": "Multi-Container Pods",
      "slug": "kubernetes-pods-multicontainer"
    },
    {
      "id": "probes",
      "title": "Liveness & Readiness",
      "slug": "kubernetes-pods-probes"
    }
  ],
  "kubernetes-deployments": [
    {
      "id": "create",
      "title": "Creating Deployments",
      "slug": "kubernetes-deployments-create"
    },
    {
      "id": "rolling-updates",
      "title": "Rolling Updates",
      "slug": "kubernetes-deployments-rolling-updates"
    },
    {
      "id": "rollbacks",
      "title": "Rollbacks",
      "slug": "kubernetes-deployments-rollbacks"
    }
  ],
  "kubernetes-services": [
    {
      "id": "clusterip",
      "title": "ClusterIP",
      "slug": "kubernetes-services-clusterip"
    },
    {
      "id": "nodeport",
      "title": "NodePort",
      "slug": "kubernetes-services-nodeport"
    },
    {
      "id": "loadbalancer",
      "title": "LoadBalancer",
      "slug": "kubernetes-services-loadbalancer"
    },
    {
      "id": "ingress",
      "title": "Ingress",
      "slug": "kubernetes-ingress"
    }
  ],
  "kubernetes-configmaps-secrets": [
    {
      "id": "configmaps",
      "title": "ConfigMaps",
      "slug": "kubernetes-configmaps"
    },
    {
      "id": "secrets",
      "title": "Secrets",
      "slug": "kubernetes-secrets"
    }
  ],
  "kubernetes-storage": [
    {
      "id": "pv-pvc",
      "title": "PV & PVC",
      "slug": "kubernetes-pv-pvc"
    },
    {
      "id": "storage-classes",
      "title": "Storage Classes",
      "slug": "kubernetes-storage-classes"
    }
  ],
  "kubernetes-resource-management": [
    {
      "id": "requests-limits",
      "title": "Requests & Limits",
      "slug": "kubernetes-requests-limits"
    },
    {
      "id": "hpa",
      "title": "Autoscaling (HPA)",
      "slug": "kubernetes-hpa"
    }
  ],
  "kubernetes-helm": [
    {
      "id": "helm-install",
      "title": "Installing Helm",
      "slug": "kubernetes-helm-install"
    },
    {
      "id": "helm-charts",
      "title": "Charts & Templates",
      "slug": "kubernetes-helm-charts"
    },
    {
      "id": "helm-values",
      "title": "Values & Upgrades",
      "slug": "kubernetes-helm-values"
    }
  ],
  "setting-up-aws": [
    {
      "id": "account",
      "title": "AWS Account Setup",
      "slug": "aws-account-setup"
    },
    {
      "id": "console",
      "title": "Console Tour",
      "slug": "aws-console-tour"
    },
    {
      "id": "cli",
      "title": "AWS CLI Setup",
      "slug": "aws-cli-setup"
    }
  ],
  "aws-iam": [
    {
      "id": "users-groups",
      "title": "Users & Groups",
      "slug": "aws-iam-users-groups"
    },
    {
      "id": "roles-policies",
      "title": "Roles & Policies",
      "slug": "aws-iam-roles-policies"
    },
    {
      "id": "best-practices",
      "title": "IAM Best Practices",
      "slug": "aws-iam-best-practices"
    }
  ],
  "aws-ec2": [
    {
      "id": "launch",
      "title": "Launching an Instance",
      "slug": "aws-ec2-launch-instance"
    },
    {
      "id": "instance-types",
      "title": "Instance Types",
      "slug": "aws-ec2-instance-types"
    },
    {
      "id": "security-groups",
      "title": "Security Groups",
      "slug": "aws-ec2-security-groups"
    },
    {
      "id": "key-pairs",
      "title": "Key Pairs & SSH",
      "slug": "aws-ec2-key-pairs"
    }
  ],
  "aws-vpc": [
    {
      "id": "subnets",
      "title": "Subnets",
      "slug": "aws-vpc-subnets"
    },
    {
      "id": "route-tables",
      "title": "Route Tables",
      "slug": "aws-vpc-route-tables"
    },
    {
      "id": "nat-gateway",
      "title": "NAT Gateway",
      "slug": "aws-vpc-nat-gateway"
    }
  ],
  "aws-s3": [
    {
      "id": "buckets",
      "title": "Buckets & Objects",
      "slug": "aws-s3-buckets"
    },
    {
      "id": "permissions",
      "title": "Permissions",
      "slug": "aws-s3-permissions"
    },
    {
      "id": "versioning",
      "title": "Versioning & Lifecycle",
      "slug": "aws-s3-versioning"
    }
  ],
  "aws-rds": [
    {
      "id": "setup",
      "title": "RDS Setup",
      "slug": "aws-rds-setup"
    },
    {
      "id": "security",
      "title": "RDS Security",
      "slug": "aws-rds-security"
    }
  ],
  "aws-lambda": [
    {
      "id": "functions",
      "title": "Lambda Functions",
      "slug": "aws-lambda-functions"
    }
  ],
  "aws-ecs-eks": [
    {
      "id": "tasks",
      "title": "ECS Tasks & Services",
      "slug": "aws-ecs-tasks"
    }
  ],
  "aws-cloudwatch": [
    {
      "id": "metrics",
      "title": "Metrics & Alarms",
      "slug": "aws-cloudwatch-metrics"
    }
  ],
  "aws-codepipeline": [
    {
      "id": "codebuild",
      "title": "CodeBuild",
      "slug": "aws-codebuild"
    }
  ],
  "aws-elastic-load-balancing": [
    {
      "id": "alb",
      "title": "Application Load Balancer",
      "slug": "aws-elb-alb"
    },
    {
      "id": "nlb",
      "title": "Network Load Balancer",
      "slug": "aws-elb-nlb"
    }
  ],
  "aws-auto-scaling": [
    {
      "id": "groups",
      "title": "Auto Scaling Groups",
      "slug": "aws-auto-scaling-groups"
    },
    {
      "id": "policies",
      "title": "Scaling Policies",
      "slug": "aws-auto-scaling-policies"
    }
  ],
  "aws-cloudfront": [
    {
      "id": "distributions",
      "title": "Distributions",
      "slug": "aws-cloudfront-distributions"
    },
    {
      "id": "ssl",
      "title": "SSL & Custom Domain",
      "slug": "aws-cloudfront-ssl"
    }
  ],
  "aws-route53": [
    {
      "id": "records",
      "title": "DNS Records",
      "slug": "aws-route53-records"
    },
    {
      "id": "routing-policies",
      "title": "Routing Policies",
      "slug": "aws-route53-routing-policies"
    }
  ],
  "aws-dynamodb": [
    {
      "id": "tables",
      "title": "Tables & Keys",
      "slug": "aws-dynamodb-tables"
    },
    {
      "id": "queries",
      "title": "Queries & Scans",
      "slug": "aws-dynamodb-queries"
    }
  ],
  "aws-sqs": [
    {
      "id": "dead-letter",
      "title": "Dead-Letter Queues",
      "slug": "aws-sqs-dead-letter"
    }
  ],
  "aws-api-gateway": [
    {
      "id": "rest",
      "title": "REST API",
      "slug": "aws-api-gateway-rest"
    },
    {
      "id": "lambda",
      "title": "Lambda Integration",
      "slug": "aws-api-gateway-lambda"
    }
  ],
  "aws-eks": [
    {
      "id": "cluster",
      "title": "Creating a Cluster",
      "slug": "aws-eks-cluster"
    },
    {
      "id": "nodegroups",
      "title": "Node Groups",
      "slug": "aws-eks-nodegroups"
    }
  ],
  "aws-cloudformation": [
    {
      "id": "stacks",
      "title": "Stacks",
      "slug": "aws-cloudformation-stacks"
    },
    {
      "id": "templates",
      "title": "Templates",
      "slug": "aws-cloudformation-templates"
    }
  ],
  "aws-systems-manager": [
    {
      "id": "session-manager",
      "title": "Session Manager",
      "slug": "aws-ssm-session-manager"
    },
    {
      "id": "parameter-store",
      "title": "Parameter Store",
      "slug": "aws-ssm-parameter-store"
    }
  ],
  "aws-organizations": [
    {
      "id": "scp",
      "title": "Service Control Policies",
      "slug": "aws-organizations-scp"
    }
  ]
};
