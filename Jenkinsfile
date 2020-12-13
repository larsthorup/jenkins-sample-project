pipeline {
    agent any
    environment {
        GITHUB_ACCESS_KEY = credentials('GITHUB_ACCESS_KEY')
    }
    stages {
        stage('pr-status') {
            steps {
                sh 'printenv'
            }
        }
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
        success {
            echo 'success'
            sh 'printenv'
        }
        unsuccessful {
            echo 'unsuccessful'
            sh 'printenv'
        }
    }
}