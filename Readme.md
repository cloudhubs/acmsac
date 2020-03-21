# ACM SAC

## Deployment Guide

### Development

- Append `127.0.0.1 acmsac.ecs.baylor.edu` line to `/etc/hosts`
- Build and run: `$ docker-compose up --build`
- Go to http://acmsac.ecs.baylor.edu

### Production

- Build images locally: `$ docker-compose build`
- Push images: `$ docker-compose push`
- Copy `docker-compose.yml` to production machine
- Run in server: `$ docker-compose up --no-build --detach`

### Configure `firewalld`:

```
$ sudo docker network inspect {app-internal-network} # note the subnet address
$ sudo firewall-cmd --zone=public --add-masquerade --permanent
$ sudo firewall-cmd --permanent --zone=public --change-interface=docker0
$ sudo firewall-cmd --permanent --zone=public --add-rich-rule='rule family=ipv4 source address=172.18.0.0/16 accept'
```
