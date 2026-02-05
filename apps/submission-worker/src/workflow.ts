import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});
const OWNER = "your-username";
const REPO = "judge-runner";
const WORKFLOW = "judge.yml";
const BRANCH = "main";

export async function triggerCI(payload: Record<string, string>) {
  await octokit.actions.createWorkflowDispatch({
    owner: OWNER,
    repo: REPO,
    workflow_id: WORKFLOW,
    ref: BRANCH,
    inputs: payload,
  });
}
