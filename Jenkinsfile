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
    steps {
        sh '''
        docker run --rm \
        --user $(id -u):$(id -g) \
        --ipc=host \
        -e CI=true \
        -v $WORKSPACE:/work \
        -w /work \
        mcr.microsoft.com/playwright:v1.55.0-noble \
        bash -lc "
            export HOME=/work
            export NPM_CONFIG_CACHE=/work/.npm
            mkdir -p \\$NPM_CONFIG_CACHE
            npm ci
            npx playwright test --project=chromium --workers=1
        "
        '''
    }
}

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
        }
    }
}