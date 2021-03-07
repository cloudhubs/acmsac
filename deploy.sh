#!/bin/bash
set -euxo pipefail

sudo docker-compose pull
sudo docker-compose up --no-build --detach --remove-orphans

read -p "Press Enter to view logs"

sudo docker-compose logs -f
