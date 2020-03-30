# ACM SAC

## Deployment Guide

### Development

- Run database: 

```
$ docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=acmsacdb mysql:5.7
```

- Run backend: 
Go to app-backend
```
$ mvn spring-boot:run
```

- Run frontend:
Go to app-frontend
```
$ export REACT_APP_API_BASE_URL=http://localhost:8080/api
$ npm install
$ npm start
```

If there is a change in the data model, stop the docker container running mysql and restart it. Any time this container is stopped, user import has to be done again.

### Production

- Build images locally and push to docker hub: 

```
$ docker-compose build
$ docker-compose push
```

Note: In order to push you need to login to `cloudhubs2` docker account. Run `$ docker login` to login.

- Download recent `docker-compose.yml` file in production machine:

```
$ cd /acmsac
$ curl -O https://raw.githubusercontent.com/cloudhubs/acmsac/master/docker-compose.yml
```

- Add following environment variables `.env` file

```
$ cat .env
MYSQL_ROOT_PASSWORD=*****
APP_ADMIN_PASSWORD=*****
```

- Make sure `/acmsac/ssl` folder exists

- Pull recent images: 

```
$ docker-compose pull
```

- Trigger the deployment:

```
$ docker-compose up --no-build --detach
```

### Configure `firewalld`:

```
$ sudo docker network inspect {app-internal-network} # note the subnet address
$ sudo firewall-cmd --zone=public --add-masquerade --permanent
$ sudo firewall-cmd --permanent --zone=public --change-interface=docker0
$ sudo firewall-cmd --permanent --zone=public --add-rich-rule='rule family=ipv4 source address=172.18.0.0/16 accept'
```
