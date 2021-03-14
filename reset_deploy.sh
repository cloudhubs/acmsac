#!/bin/bash
set -euxo pipefail

read -p 'Reseting DB. Write SAC to confirm: ' inp

if [[ "$inp" == "SAC" ]]; then
    sudo docker-compose down
    sudo docker volume rm acmsac_db-data
    ./deploy.sh
else
    echo "Canceled"
fi
