# .env or .env.local
# add .env into docker config folder for prod
envFile = .env.local
projectName = esgi-assos

build:
	git submodule update --init --recursive
	make overwrite-env
	make overwrite-conf
	docker-compose -p ${projectName} -f ./Web.ELASTIC/docker-compose.yml --env-file="./Web.ELASTIC/${envFile}" up -d --build
	docker-compose -p ${projectName} --env-file="./Web.API/${envFile}" up -d --build
	make setup

overwrite-env:
	cp .docker/conf/elastic/${envFile} ./Web.ELASTIC/${envFile}
	cp .docker/conf/api/${envFile} ./Web.API/${envFile}

overwrite-conf:
	cp .docker/conf/elastic/elasticsearch.yml ./Web.ELASTIC/elasticsearch/config/elasticsearch.yml
	cp .docker/conf/elastic/kibana.yml ./Web.ELASTIC/kibana/config/kibana.yml
	cp .docker/conf/elastic/logstash.yml ./Web.ELASTIC/logstash/config/logstash.yml

setup:
	docker-compose -p ${projectName} --env-file="./Web.API/${envFile}" up -d
	docker logs ${projectName}_composer --follow
	docker exec -it ${projectName}_php-fpm php bin/console lexik:jwt:generate-keypair --overwrite -n
	docker exec -it ${projectName}_php-fpm php bin/console doctrine:migrations:migrate -n

start:
	docker-compose -p ${projectName} -f ./Web.ELASTIC/docker-compose.yml --env-file="./Web.ELASTIC/${envFile}" up -d
	docker-compose -p ${projectName} --env-file="./Web.API/${envFile}" up -d

stop:
	docker-compose -p ${projectName} -f ./Web.ELASTIC/docker-compose.yml stop
	docker-compose -p ${projectName} --env-file="./Web.API/${envFile}" stop

down:
	docker-compose -p ${projectName} -f ./Web.ELASTIC/docker-compose.yml --env-file="./Web.ELASTIC/${envFile}" down -v
	docker-compose -p ${projectName} --env-file="./Web.API/${envFile}" down -v