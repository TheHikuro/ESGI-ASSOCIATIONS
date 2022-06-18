# .env or .env.local
# add .env into docker config folder for prod
envFile = .env.local
projectName = esgi-assos
elasticFolder = Web.ELASTIC
apmServerFolder = ${elasticFolder}/extensions/apm-server

build:
	git submodule update --init --recursive
	make overwrite-env
	make overwrite-conf
	docker-compose -p ${projectName} -f ${elasticFolder}/docker-compose.yml -f ${apmServerFolder}/apm-server-compose.yml --env-file="${elasticFolder}/${envFile}" up -d --build
	docker-compose -p ${projectName} --env-file="./Web.API/${envFile}" up -d --build
	make setup

overwrite-env:
	cp .docker/conf/elastic/${envFile} ${elasticFolder}/${envFile}
	cp .docker/conf/api/${envFile} ./Web.API/${envFile}

overwrite-conf:
	cp .docker/conf/elastic/elasticsearch.yml ${elasticFolder}/elasticsearch/config/elasticsearch.yml
	cp .docker/conf/elastic/kibana.yml ${elasticFolder}/kibana/config/kibana.yml
	cp .docker/conf/elastic/logstash.yml ${elasticFolder}/logstash/config/logstash.yml
	cp .docker/conf/elastic/apm-server.yml ${apmServerFolder}/config/apm-server.yml

setup:
	docker-compose -p ${projectName} --env-file="./Web.API/${envFile}" up -d
	docker logs ${projectName}_composer --follow
	docker exec -it ${projectName}_php-fpm php bin/console lexik:jwt:generate-keypair --overwrite -n
	docker exec -it ${projectName}_php-fpm php bin/console doctrine:migrations:migrate -n

start:
	docker-compose -p ${projectName} -f ${elasticFolder}/docker-compose.yml -f ${apmServerFolder}/apm-server-compose.yml --env-file="${elasticFolder}/${envFile}" up -d
	docker-compose -p ${projectName} --env-file="./Web.API/${envFile}" up -d

stop:
	docker-compose -p ${projectName} -f ${elasticFolder}/docker-compose.yml -f ${apmServerFolder}/apm-server-compose.yml --env-file="${elasticFolder}/${envFile}" stop
	docker-compose -p ${projectName} --env-file="./Web.API/${envFile}" stop

down:
	docker-compose -p ${projectName} -f ${elasticFolder}/docker-compose.yml -f ${apmServerFolder}/apm-server-compose.yml --env-file="${elasticFolder}/${envFile}" down -v
	docker-compose -p ${projectName} --env-file="./Web.API/${envFile}" down -v