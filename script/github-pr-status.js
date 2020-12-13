import 'dotenv/config.js';
import { Octokit } from "@octokit/rest"

const state = process.argv[2];
const sha = process.argv[3];
const target_url = process.argv[4];
const build_id = process.argv[5];
const context = process.argv[6];

const owner = 'larsthorup';
const repo = 'jenkins-sample-project';
// const sha = 'd5c70b3333fc91c5001a138267b621a05db7fd63';
const auth = process.env.GITHUB_ACCESS_TOKEN;
const userAgent = owner;
const description = `Build ${build_id}`;

const main = async () => {
  const options = {
    auth,
    userAgent,
  }
  console.log(options);
  const octokit = new Octokit(options);
  const status = {
    owner,
    repo,
    sha,
    state,
    target_url,
    description,
    context,
  };
  await octokit.repos.createCommitStatus(status);
}

main();