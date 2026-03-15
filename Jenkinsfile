pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.55.0-noble'
            args '--ipc=host --user=root --entrypoint=""'
        }
    }

    environment {
        CI = 'true'
        HOME = "${WORKSPACE}"
        NPM_CONFIG_CACHE = "${WORKSPACE}/.npm"
    }

    stages {
        stage('Checkout') {
            steps {
                deleteDir()
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'echo hello'
                sh 'whoami'
                sh 'pwd'
                sh 'ls -la'
                sh 'node --version'
                sh 'npm --version'
                sh 'mkdir -p "$NPM_CONFIG_CACHE"'
                sh 'npm ci'
            }
        }

        stage('Run Playwright tests') {
            steps {
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
        }
    }
}