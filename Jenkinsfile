pipeline {
    agent any
    environment {
        GITHUB_ACCESS_TOKEN = credentials('GITHUB_ACCESS_TOKEN')
    }
    stages {
        stage('install') {
            steps {
                sh 'npm install'
            }
        }
        stage('pr-status') {
            steps {
                sh 'printenv'
                sh 'node ./script/github-pr-status pending $GIT_COMMIT $BUILD_URL $BUILD_ID Jenkins'
            }
        }
        stage('test') {
            steps {
                sh 'npm test'
            }
        }
    }
    post {
        success {
            echo 'success'
            sh 'printenv'
            sh 'node ./script/github-pr-status error $GIT_COMMIT $BUILD_URL $BUILD_ID Jenkins'
        }
        unsuccessful {
            echo 'unsuccessful'
            sh 'printenv'
            sh 'node ./script/github-pr-status success $GIT_COMMIT $BUILD_URL $BUILD_ID Jenkins'
        }
    }
}