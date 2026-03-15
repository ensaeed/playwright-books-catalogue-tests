pipeline {
    agent any

    stages {
        stage('Test shell') {
            steps {
                sh 'echo hello from jenkins host'
                sh 'whoami'
                sh 'pwd'
                sh 'ls -la'
            }
        }
    }
}