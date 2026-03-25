pipeline {
    agent any

    environment {
        CI = 'true'
        HOST_NPM_CACHE = '/var/lib/jenkins/npm-cache'
        PLAYWRIGHT_IMAGE = 'mcr.microsoft.com/playwright:v1.56.1-noble'
    }

    stages {
        stage('Checkout') {
            steps {
                sh 'chown -R $(id -u):$(id -g) $WORKSPACE || true'
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
            steps {
                sh '''
                    docker run --rm \
                      --user $(id -u):$(id -g) \
                      --ipc=host \
                      -e CI=true \
                      -e HOME=/work \
                      -e NPM_CONFIG_CACHE=/npm-cache \
                      -v "$WORKSPACE:/work" \
                      -v "$HOST_NPM_CACHE:/npm-cache" \
                      -w /work \
                      "$PLAYWRIGHT_IMAGE" \
                      bash -lc "npm ci && npx playwright test --project=chromium --workers=1 --reporter=line"
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