export interface TroubleshootingGuide {
  id: string;
  slug: string;
  title: string;
  category: "AWS" | "Kubernetes" | "Docker" | "CI/CD" | "Terraform" | "Git";
  severity: "Critical" | "High" | "Medium";
  errorSnippet: string;
  rootCause: string;
  solutionSummary: string;
  steps: string[];
}

export const TROUBLESHOOTING_GUIDES: TroubleshootingGuide[] = [
  {
    id: "k8s-crashloopbackoff",
    slug: "kubernetes-crashloopbackoff",
    title: "Kubernetes Pod CrashLoopBackOff: Root Causes & Rapid Fixes",
    category: "Kubernetes",
    severity: "Critical",
    errorSnippet: "STATUS: CrashLoopBackOff | Back-off restarting failed container",
    rootCause: "The container process exited immediately upon boot due to missing environment variables, failing liveness probes, syntax errors in config files, or exit code 1/137.",
    solutionSummary: "Inspect container termination status with 'kubectl describe pod <name>' and retrieve previous crashed stdout using 'kubectl logs <name> --previous'.",
    steps: [
      "Run 'kubectl describe pod <pod_name> -n <namespace>' and inspect the 'Last State' section for Exit Code.",
      "Check crash logs using 'kubectl logs <pod_name> --previous'.",
      "Check whether liveness probe is hitting an endpoint that takes too long to warm up; increase 'initialDelaySeconds'.",
      "If exit code is 137, pod was OOMKilled (Out of Memory); increase 'resources.limits.memory'.",
      "Test container command locally with 'docker run' to ensure binary path and parameters are valid.",
    ],
  },
  {
    id: "k8s-imagepullbackoff",
    slug: "kubernetes-imagepullbackoff",
    title: "Kubernetes ImagePullBackOff / ErrImagePull Complete Guide",
    category: "Kubernetes",
    severity: "High",
    errorSnippet: "Failed to pull image 'registry.corp.io/app:v2.1': rpc error: code = Unknown desc = failed to pull and unpack image",
    rootCause: "Image tag does not exist in registry, repository is private and missing imagePullSecrets, or worker node lacks outbound internet access.",
    solutionSummary: "Verify exact image tag on Docker Hub / ECR and ensure the Pod manifest includes valid 'imagePullSecrets'.",
    steps: [
      "Verify image exists: docker pull <image_name>:<tag> locally.",
      "Inspect Kubernetes events: 'kubectl get events -n <namespace> --sort-by=.metadata.creationTimestamp'.",
      "For private registries (ECR, GHCR, Docker Hub), create a secret: 'kubectl create secret docker-registry regcred ...'.",
      "Attach 'imagePullSecrets: [{ name: regcred }]' under 'spec' in your Deployment YAML.",
    ],
  },
  {
    id: "docker-daemon-unavailable",
    slug: "cannot-connect-to-docker-daemon",
    title: "Cannot Connect to the Docker Daemon at unix:///var/run/docker.sock",
    category: "Docker",
    severity: "Critical",
    errorSnippet: "Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?",
    rootCause: "Docker system service is stopped, or the current user is not a member of the 'docker' security group.",
    solutionSummary: "Start the service using 'sudo systemctl start docker' and append user to docker group via 'sudo usermod -aG docker $USER'.",
    steps: [
      "Check service status: 'sudo systemctl status docker'.",
      "Start Docker daemon: 'sudo systemctl start docker && sudo systemctl enable docker'.",
      "Add user to docker group: 'sudo usermod -aG docker $USER'.",
      "Re-evaluate group membership: 'newgrp docker'.",
      "Verify communication: 'docker info'.",
    ],
  },
  {
    id: "docker-port-allocated",
    slug: "docker-port-is-already-allocated",
    title: "Docker Bind for 0.0.0.0:Port Failed: Port is Already Allocated",
    category: "Docker",
    severity: "High",
    errorSnippet: "driver failed programming external connectivity on endpoint: Bind for 0.0.0.0:80 failed: port is already allocated",
    rootCause: "Another container or host service (e.g., local Apache, Nginx, or Postgres) is already bound to the specified host port.",
    solutionSummary: "Find the PID holding the port using 'lsof -i :<port>' or 'ss -tulpn', then terminate it or change the container port mapping.",
    steps: [
      "Identify the conflicting process: 'sudo lsof -i :80' or 'sudo ss -tulpn | grep 80'.",
      "If it's an existing Docker container: 'docker ps --filter publish=80'.",
      "Stop the conflicting container: 'docker stop <container_id>'.",
      "Alternatively, publish to an alternate host port: 'docker run -p 8080:80 <image>'.",
    ],
  },
  {
    id: "aws-access-denied",
    slug: "aws-access-denied-not-authorized",
    title: "AWS AccessDenied: User is Not Authorized to Perform Action",
    category: "AWS",
    severity: "High",
    errorSnippet: "An error occurred (AccessDenied) when calling the CreateBucket operation: User: arn:aws:iam::123:user/dev is not authorized to perform: s3:CreateBucket",
    rootCause: "IAM policy does not grant the required action, an SCP (Service Control Policy) is blocking it at the AWS Organization level, or Permissions Boundary is restrictive.",
    solutionSummary: "Evaluate IAM policy simulator and attach the minimum required permission action.",
    steps: [
      "Check caller identity: 'aws sts get-caller-identity'.",
      "Verify attached IAM policies on the user or assumed IAM role.",
      "Check for explicit Deny in inline policies or Organizational SCPs.",
      "Use IAM Policy Simulator in AWS Console to test the exact API action and resource ARN.",
    ],
  },
  {
    id: "tf-state-lock",
    slug: "terraform-state-lock-error",
    title: "Terraform Error: Error Acquiring the State Lock",
    category: "Terraform",
    severity: "Critical",
    errorSnippet: "Error: Error acquiring the state lock: ConditionalCheckFailedException: The conditional request failed. Lock Info: ID: 3e8f81a7-...",
    rootCause: "A previous Terraform command was killed unexpectedly (or another pipeline job is running), leaving the DynamoDB state lock acquired.",
    solutionSummary: "Verify no concurrent pipeline is executing, then release the lock with 'terraform force-unlock <LOCK_ID>'.",
    steps: [
      "Confirm that no teammate or CI runner is currently running 'terraform apply'.",
      "Copy the 'Lock Info: ID: <UUID>' from the error output.",
      "Run: 'terraform force-unlock <UUID>'.",
      "Confirm state consistency with 'terraform refresh' and 'terraform plan'.",
    ],
  },
];

