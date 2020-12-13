# jenkins-sample-project

Sample project with a Jenkinsfile so that Jenkins can build it

```
npm install
npm test
```

# Github PR status

- Create a Personal Access Token for a user with access to the repo
  - scopes: `admin:repo_hook`, `repo`
  - save in `.env` as `GITHUB_ACCESS_TOKEN=your-token-here`
  - create in Jenkins as secret text with name `GITHUB_ACCESS_TOKEN`
