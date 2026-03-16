pipeline {
    agent any

    environment {
        CI = 'true'
        HOST_NPM_CACHE = '/var/lib/jenkins/npm-cache'
        PLAYWRIGHT_IMAGE = 'mcr.microsoft.com/playwright:v1.55.0-noble'
    }

    stages {
        stage('Checkout') {
            steps {
                deleteDir()
                checkout scm
            }
        }

        stage('Prepare cache') {
            steps {
                sh '''
                    mkdir -p "$HOST_NPM_CACHE"
                '''
            }
        }

        stage('Run Playwright in Docker') {
            options {
                timeout(time: 15, unit: 'MINUTES')
            }
            steps {
                sh '''
                    docker pull "$PLAYWRIGHT_IMAGE"

                    docker run --rm \
                      --user root \
                      --ipc=host \
                      -e CI=true \
                      -e HOME=/tmp \
                      -e NPM_CONFIG_CACHE=/npm-cache \
                      -v "$WORKSPACE:/work" \
                      -v "$HOST_NPM_CACHE:/npm-cache" \
                      -w /work \
                      "$PLAYWRIGHT_IMAGE" \
                      bash -lc '
                        node --version
                        npm --version
                        npm ci
                        npx playwright test --project=chromium --workers=1
                      '
                '''
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