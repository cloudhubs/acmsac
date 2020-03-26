# ACM SAC

## Deployment Guide

### Development

- Run database: 

```
$ docker run -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=acmsacdb mysql:5.7
```

- Run backend: 

```
$ mvn spring-boot:run
```

- Run frontend:

```
$ export REACT_APP_API_BASE_URL=http://localhost:8080/api
$ npm start
```

If there is a change in the data model, stop the docker container running mysql and restart it. Any time this container is stopped, user import has to be done again.

### Production

- Build images locally: `$ docker-compose build`
- Push images: `$ docker-compose push`
- Copy `docker-compose.yml` and `ssl` folder to production machine
- Run in server: `$ docker-compose up --no-build --detach`

### Configure `firewalld`:

```
$ sudo docker network inspect {app-internal-network} # note the subnet address
$ sudo firewall-cmd --zone=public --add-masquerade --permanent
$ sudo firewall-cmd --permanent --zone=public --change-interface=docker0
$ sudo firewall-cmd --permanent --zone=public --add-rich-rule='rule family=ipv4 source address=172.18.0.0/16 accept'
```
