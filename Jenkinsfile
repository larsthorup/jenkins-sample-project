pipeline {
  agent any
  stages {
    stage('install') {
      steps {
        sh 'npm install'
      }
    }
    stage('test') {
      steps {
        sh 'npm test'
      }
    }
  }
  post {
    always {
      script { 
        // Note: workaround for emailext recipientProviders not working
        // Note: --no-merges is used to skip the commit created by "nobody@nowhere" as Jenkins merges with latest "develop".
        GIT_COMMIT_EMAIL = sh (
          script: 'git log -1 --no-merges --pretty="format:%ae"',
          returnStdout: true
        ).trim()
        GIT_COMMIT_SUBJECT = sh (
          script: 'git log -1 --no-merges --pretty="format:%s"',
          returnStdout: true
        ).trim()
        GIT_COMMIT_SHA = sh (
          script: 'git log -1 --no-merges --pretty="format:%h"',
          returnStdout: true
        ).trim()
        // Note: author of first commit on this branch
        GIT_BRANCH_EMAIL = sh (
          script: 'git log origin/${CHANGE_TARGET}..HEAD --pretty="format:%ae" | tail -1',
          returnStdout: true
        ).trim()
      }
      emailext body: """
          <p>Commit: "${GIT_COMMIT_SUBJECT}" (${GIT_COMMIT_SHA}) by ${GIT_COMMIT_EMAIL}.</p>
          <p>Branch: "${CHANGE_TITLE}" (${CHANGE_BRANCH}) by ${GIT_BRANCH_EMAIL}.</p>
          <ul>
          <li><a href="${env.BUILD_URL}console">Log output</a></li>
          <li><a href="${env.BUILD_URL}artifact/e2e-test/output/screen/">Screen captures</a></li>
          <li><a href="${env.JOB_URL}">Jenkins PR Job: ${env.JOB_NAME}</a></li>
          <li><a href="${env.CHANGE_URL}">GitHub PR: ${env.CHANGE_TITLE}</a></li>
          </ul>
          <p>Log output (last 100 lines):<hr><pre>\${BUILD_LOG, maxLines=100, escapeHtml=true}</pre></p>
        """,
        subject: "Build ${currentBuild.result} - ${env.JOB_NAME} ${currentBuild.displayName}",
        to: "${GIT_BRANCH_EMAIL}"
    }
  }
}