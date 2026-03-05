pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = "yogismash"
        BACKEND_IMAGE = "${DOCKERHUB_USERNAME}/ems-backend"
        FRONTEND_IMAGE = "${DOCKERHUB_USERNAME}/ems-frontend"
        IMAGE_TAG = "${GIT_COMMIT}"
        EC2_IP = "13.201.1.113"
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
        echo '🚀 Deploy ho raha hai...'
        sh """
            # Purane containers band karo
            docker stop ems-frontend ems-backend ems-mysql || true
            docker rm ems-frontend ems-backend ems-mysql || true
            
            # Network banao
            docker network create ems-network || true
            
            # MySQL start karo
            docker run -d \
                --name ems-mysql \
                --network ems-network \
                -e MYSQL_ROOT_PASSWORD=root123 \
                -e MYSQL_DATABASE=employeedb \
                -p 3306:3306 \
                mysql:8.0
            
            # 20 second wait karo MySQL ready hone do
            sleep 20
            
            # Backend start karo
            docker run -d \
                --name ems-backend \
                --network ems-network \
                -e DB_HOST=ems-mysql \
                -e DB_USER=root \
                -e DB_PASSWORD=root123 \
                -e DB_NAME=employeedb \
                -e JWT_SECRET=myjwtsecret123 \
                -e PORT=5000 \
                -p 5000:5000 \
                yogismash/ems-backend:latest
            
            # Frontend start karo
            docker run -d \
                --name ems-frontend \
                --network ems-network \
                -p 3000:80 \
                yogismash/ems-frontend:latest
        """
    }
}
	

	stage('Health Check') {
    steps {
        echo '🏥 Health check kar raha hun...'
        sh """
            sleep 15
            curl -f http://13.201.1.113:5000/health || exit 1
            echo '✅ Backend is UP!'
            docker ps | grep ems-frontend && echo '✅ Frontend is UP!' || exit 1
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
