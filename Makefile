build:
	cp .docker/conf/.env.local ./Web.API/.env.local
	docker-compose --env-file="./Web.API/.env.local" up -d --build

start:
	docker-compose --env-file="./Web.API/.env.local" up -d

stop:
	docker-compose stop
