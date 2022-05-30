.PHONY: start stop

build:
	docker-compose --env-file="./Web.API/.env.local" up -d --build

start:
	docker-compose --env-file="./Web.API/.env.local" up -d

stop:
	docker-compose stop

restart: stop start
