envFile = .env.local
projectName = esgi-assos

build:
	git submodule update --init
	cp .docker/conf/elastic/${envFile} ./Web.ELASTIC/${envFile}
	cp .docker/conf/api/${envFile} ./Web.API/${envFile}
	docker-compose -p ${projectName} -f ./Web.ELASTIC/docker-compose.yml --env-file="./Web.ELASTIC/${envFile}" up -d
	docker-compose -p ${projectName} --env-file="./Web.API/${envFile}" up -d
	make setup-elastic
#make setup

setup-elastic:
	cp .docker/conf/elastic/${envFile} ./Web.ELASTIC/${envFile}
	docker logs ${projectName}_setup_1 -f
	docker-compose exec -p ${projectName} -f ./Web.ELASTIC/docker-compose.yml --env-file="./Web.ELASTIC/${envFile}" elasticsearch bin/elasticsearch-reset-password --batch --user elastic
	docker-compose exec -p ${projectName} -f ./Web.ELASTIC/docker-compose.yml --env-file="./Web.ELASTIC/${envFile}" elasticsearch bin/elasticsearch-reset-password --batch --user logstash_internal
	docker-compose exec -p ${projectName} -f ./Web.ELASTIC/docker-compose.yml --env-file="./Web.ELASTIC/${envFile}" elasticsearch bin/elasticsearch-reset-password --batch --user kibana_system
	docker-compose -p ${projectName} -f ./Web.ELASTIC/docker-compose.yml up -d logstash kibana
	
setup:
	cp .docker/conf/${envFile} ./Web.API/${envFile}
	docker-compose -p ${projectName} --env-file="./Web.API/${envFile}" up -d
	docker logs ${projectName}_composer --follow
	docker exec -it esgi-assos_php-fpm php bin/console lexik:jwt:generate-keypair --overwrite -n
	docker exec -it esgi-assos_php-fpm php bin/console doctrine:migrations:migrate -n

start:
	docker-compose -p ${projectName} -f ./Web.ELASTIC/docker-compose.yml --env-file="./Web.ELASTIC/${envFile}" up -d
	docker-compose -p ${projectName} --env-file="./Web.API/${envFile}" up -d

stop:
	docker-compose -p ${projectName} -f ./Web.ELASTIC/docker-compose.yml stop
	docker-compose -p ${projectName} --env-file="./Web.API/${envFile}" stop

down:
	docker-compose -p ${projectName} -f ./Web.ELASTIC/docker-compose.yml --env-file="./Web.ELASTIC/${envFile}" down
	docker-compose -p ${projectName} --env-file="./Web.API/${envFile}" down