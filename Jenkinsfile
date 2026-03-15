pipeline {
    agent any

    environment {
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                deleteDir()
                checkout scm
            }
        }

        stage('Run Playwright in Docker') {
            steps {
                sh '''
                    docker run --rm \
                      --user root \
                      --ipc=host \
                      -e CI=true \
                      -v "$WORKSPACE:/work" \
                      -w /work \
                      mcr.microsoft.com/playwright:v1.55.0-noble \
                      bash -lc '
                        export HOME=/work
                        export NPM_CONFIG_CACHE=/work/.npm
                        mkdir -p "$NPM_CONFIG_CACHE"
                        node --version
                        npm --version
                        npm ci
                        npx playwright test
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