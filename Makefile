envFile = .env.local
include .docker/conf/${envFile}

build:
	docker-compose --env-file="./Web.API/${envFile}" up -d --build
	make setup

setup:
	cp .docker/conf/${envFile} ./Web.API/${envFile}
	docker-compose --env-file="./Web.API/${envFile}" up -d
	docker logs esgi-assos_composer --follow
	docker exec -it esgi-assos_php-fpm php bin/console lexik:jwt:generate-keypair --overwrite -n
	docker exec -it esgi-assos_php-fpm php bin/console doctrine:migrations:migrate -n

start:
	docker-compose --env-file="./Web.API/${envFile}" up -d

stop:
	docker-compose --env-file="./Web.API/${envFile}" stop

down:
	docker-compose --env-file="./Web.API/${envFile}" down