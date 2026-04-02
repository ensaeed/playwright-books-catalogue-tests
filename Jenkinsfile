pipeline {
    agent any

    environment {
        CI = 'true'
        PLAYWRIGHT_IMAGE = 'mcr.microsoft.com/playwright:v1.56.1-noble'

        // Better stored as Jenkins credentials later
        BOOKS_APP_URL = 'https://frontendui-librarysystem.onrender.com/login'
        BOOKS_ADMIN_USERNAME = 'admin'
        BOOKS_ADMIN_PASSWORD = 'admin'
    }

    stages {
        stage('Checkout') {
            steps {
                sh 'chown -R $(id -u):$(id -g) $WORKSPACE || true'
                deleteDir()
                checkout scm
            }
        }

        stage('Run Playwright in Docker') {
            options {
                timeout(time: 20, unit: 'MINUTES')
            }
            steps {
                sh '''
                    docker run --rm \
                      --user $(id -u):$(id -g) \
                      --ipc=host \
                      -e CI=true \
                      -e HOME=/work \
                      -e NPM_CONFIG_CACHE=/work/.npm \
                      -e BOOKS_APP_URL="$BOOKS_APP_URL" \
                      -e BOOKS_ADMIN_USERNAME="$BOOKS_ADMIN_USERNAME" \
                      -e BOOKS_ADMIN_PASSWORD="$BOOKS_ADMIN_PASSWORD" \
                      -v "$WORKSPACE:/work" \
                      -w /work \
                      "$PLAYWRIGHT_IMAGE" \
                      /bin/sh -lc '
                        echo "Checking environment..." &&
                        echo "BOOKS_APP_URL=$BOOKS_APP_URL" &&
                        test -n "$BOOKS_ADMIN_USERNAME" && echo "BOOKS_ADMIN_USERNAME_PRESENT=yes" || (echo "BOOKS_ADMIN_USERNAME missing" && exit 1) &&
                        test -n "$BOOKS_ADMIN_PASSWORD" && echo "BOOKS_ADMIN_PASSWORD_PRESENT=yes" || (echo "BOOKS_ADMIN_PASSWORD missing" && exit 1) &&
                        echo "Checking app availability..." &&
                        curl -I "$BOOKS_APP_URL" || true &&
                        echo "Installing dependencies..." &&
                        npm ci &&
                        echo "Running Playwright tests..." &&
                        npx playwright test tests/add-books-no-title.spec.ts --project=chromium --workers=1 --reporter=list --trace=retain-on-failure
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