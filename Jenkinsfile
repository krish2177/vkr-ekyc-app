// Uses Declarative syntax to run commands inside a container.
pipeline {
    agent any
    tools{
        nodejs "node"
    }
    stages{
        stage("Clone Repository"){
            steps{
                git branch: "master",
                    url:'https://github.com/krish2177/vkr-ekyc-app.git'
            }
            
        }
        stage("Build NG App"){
            steps{
                bat "node -v"
                bat "npm -v"
                bat "npm i"
                bat "ng build"
            }
            
        }
        stage("Build Docker Image"){
            steps{
                bat "docker build -t krishna35java/vkr-ekyc-app ."
            }
        }
        stage("Push to Dockerhub"){
            steps{
                script{
                    withCredentials([string(credentialsId: 'dockerhub_pwd', variable: 'dockerhubPwd')]) {
                        bat "docker login -u krishna35java -p ${dockerhubPwd}"
                    }
                }
                bat "docker push krishna35java/vkr-ekyc-app:latest"
            }
        }
        stage("Deploy into K8s"){
            steps{
                script{
                    kubernetesDeploy (configs: 'deployment-svs.yml',  kubeconfigId: 'jenkins_k8s_Id')
                }
                
            }
        }
    }
}