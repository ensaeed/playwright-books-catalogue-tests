pipeline {
    agent {
        docker {
            image 'node:20-bookworm'
            args '--user=root'
        }
    }

    stages {
        stage('Test Docker shell') {
            steps {
                sh 'echo hello from docker'
                sh 'whoami'
                sh 'pwd'
                sh 'node --version'
                sh 'npm --version'
            }
        }
    }
}