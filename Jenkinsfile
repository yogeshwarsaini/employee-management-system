pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = "yogismash"
        BACKEND_IMAGE = "${DOCKERHUB_USERNAME}/ems-backend"
        FRONTEND_IMAGE = "${DOCKERHUB_USERNAME}/ems-frontend"
        IMAGE_TAG = "${GIT_COMMIT}"
        EC2_IP = "13.234.116.156"
    }

    stages {

        stage('Cleanup') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout') {
            steps {
                echo '📥 Code checkout...'
                checkout scm
            }
        }

        stage('Build Backend Image') {
            steps {
                echo '🔨 Backend image build ho rahi hai...'
                sh """
                    docker build \
                    -t ${BACKEND_IMAGE}:${IMAGE_TAG} \
                    -t ${BACKEND_IMAGE}:latest \
                    ./backend
                """
            }
        }

        stage('Build Frontend Image') {
            steps {
                echo '🔨 Frontend image build ho rahi hai...'
                sh """
                    docker build \
                    -t ${FRONTEND_IMAGE}:${IMAGE_TAG} \
                    -t ${FRONTEND_IMAGE}:latest \
                    --build-arg REACT_APP_API_URL=http://${EC2_IP}:5000 \
                    ./frontend
                """
            }
        }

        stage('DockerHub Login') {
            steps {
                echo '🔐 DockerHub login...'
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                }
            }
        }

        stage('Push Images to DockerHub') {
            steps {
                echo '📤 DockerHub pe push ho raha hai...'
                sh """
                    docker push ${BACKEND_IMAGE}:${IMAGE_TAG}
                    docker push ${BACKEND_IMAGE}:latest
                    docker push ${FRONTEND_IMAGE}:${IMAGE_TAG}
                    docker push ${FRONTEND_IMAGE}:latest
                """
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                echo '🚀 Docker Compose se deploy ho raha hai...'
                sh """
                    docker-compose down || true
                    docker-compose up -d
                """
            }
        }

        stage('Health Check') {
            steps {
                echo '🏥 Health check kar raha hun...'
                sh """
                    sleep 10
                    curl -f http://localhost:5000/health || exit 1
                    echo '✅ Backend is UP!'
                    curl -f http://localhost:3000 || exit 1
                    echo '✅ Frontend is UP!'
                """
            }
        }
    }

    post {
        success {
            echo '🎉 Pipeline Successfully Completed! App is Live!'
        }
        failure {
            echo '❌ Pipeline Failed! Check logs.'
        }
        always {
            sh 'docker image prune -f || true'
        }
    }
}
