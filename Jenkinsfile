pipeline {
    agent any

    environment {
        CI = 'true'
        PLAYWRIGHT_IMAGE = 'mcr.microsoft.com/playwright:v1.56.1-noble'


        // Credentials & URLs
        BOOKS_APP_URL ='https://frontendui-librarysystem.onrender.com'
        BOOKS_ADMIN_USERNAME = 'admin'
        BOOKS_ADMIN_PASSWORD = 'admin'
    }

    stages {
        stage('Initial Cleanup') {
            steps {
                echo "Cleaning up AWS disk space..."
                // Removes stopped containers and dangling images to prevent AWS from 'choking'
                sh 'docker system prune -f'
                deleteDir()
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
                // Ensure the workspace is owned by the Jenkins user for Docker mounting
                sh 'chown -R $(id -u):$(id -g) .'
            }
        }

        stage('Run Playwright in Docker') {
            options {
                timeout(time: 30, unit: 'MINUTES')
            }
            steps {
                sh '''
                    docker run --rm \
                      --user $(id -u):$(id -g) \
                      --ipc=host \
                      -e CI=true \
                      -e DEBUG=pw:api \
                      -e HOME=/work \
                      -e NPM_CONFIG_CACHE=/work/.npm \
                      -e BOOKS_APP_URL="$BOOKS_APP_URL" \
                      -e BOOKS_ADMIN_USERNAME="$BOOKS_ADMIN_USERNAME" \
                      -e BOOKS_ADMIN_PASSWORD="$BOOKS_ADMIN_PASSWORD" \
                      -v "$WORKSPACE:/work" \
                      -w /work \
                      "$PLAYWRIGHT_IMAGE" \
                      /bin/sh -lc '
                        echo "Waking up Render instance (waiting for 200 OK)..."
                        count=0
                        while [ $count -lt 30 ]; do
                           code=$(curl -s -o /dev/null -w "%{http_code}" "$BOOKS_APP_URL")
                            if [ "$code" = "200" ]; then
                                echo "Server is UP!"
                                break
                          fi
                          echo "Waiting for server to wake up... ($((count*10))s)"
                          sleep 10
                          count=$((count+1))
                        done

                        echo "Installing dependencies..."
                        npm ci --prefer-offline

                        echo "Running Playwright tests..."
                        # Using --reporter=line to see the EXACT error message in Jenkins logs
                        npx playwright test tests/add-books-no-title.spec.ts --project=chromium --workers=1 --reporter=line --trace=retain-on-failure
                      '
                '''
            }
        }
    }

    post {
        always {
            echo "Archiving results..."
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
            
            echo "Final disk cleanup..."
            deleteDir()
            sh 'docker container prune -f'
        }
    }
}