pipeline {
	agent any
	stages {
		stage('Build') {
			steps {
				// Install npm modules and build static site
				nodejs(nodeJSInstallationName: 'nodejs', configId: '169e87ab-0b18-440c-bc47-21e0e949662c') {
					sh 'npm ci'
					sh 'npm run build'
				}
				// The Dockerfile will build an image with nginx, and bundle the static site files into the root www/html folder.
				// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
				// Build docker images with no cache option (no clutter, full rebuild), set name of image to 'bbbsfrontend'
				sh "docker build --no-cache . -t bbbsfrontend"
			}
		}
		stage('Deploy') {
			steps {
				// Kill previous container
				catchError(buildResult: 'SUCCESS', stageResult: 'SUCCESS') {
					sh "docker kill \$(docker ps -qf expose=80)"
				}
				// Run the image and remove container after completion, expose container port 80 -> host port 80, detached (execution can continue), image name
				sh "docker run --rm -p 80:80 -d bbbsfrontend"
			}
		}
		stage('Clean') {
			steps {	
				// Purge all unused images from docker
				sh "docker image prune -a -f"
			}
		}
	}
}
