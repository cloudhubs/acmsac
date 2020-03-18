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
- Run in server: `$ docker-compose up --no-build`
