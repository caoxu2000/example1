#!/usr/bin/env bash

# Verify docker is installed before attempting to download the camerasim
if [ -x !"$(command -v docker)" ]; then
    echo "Error! Docker is not installed. Please install docker before continuing"
    exit 1
fi

# Check if the camera simulator needs to be started...
if [ ! "$(docker ps -q -f name=camera_sim)" ]; then
    echo "Camera Sim container not found on system, installing ..."

  # If container exited, remove it before starting
  if [ "$(docker ps -aq -f status=exited -f name=camera_sim)" ]; then
      echo "An existing stopped camera sim docker container was found on the system, removing ...."
      docker rm camera_sim
  fi

  # Start the camera simulator in the background
  echo "Importing and starting the camera simulator..."

  # Note: In run docker command:
  #        - Foward all port traffic coming into docker under 5673 as 5762 This is the RabbitMQ port
  #        - Foward the camera communication port 8765 to the docker image
  command='docker run
    -d
    --restart=unless-stopped
    --name camera_sim
    -p 5673:5672
    -p 8765:8765
    example1.com/test/hardwaresimulator:juno-dev-3.1 bash "/startup_webapi.sh"'
  echo $command
  eval $command

else
 echo "Camera Simulator already found on system, continuing without installing..."
fi