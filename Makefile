export envFile = .env.local
projectName = esgi-assos
envFolder = .docker/conf/envs
webApi = ./Web.API
webUi = ./Web.UI
discordBot = ./Discord.BOT
webApiDocker = ${webApi}/docker-compose.yml
webUiDocker = ${webUi}/docker-compose.yml
discordBotDocker = ${discordBot}/docker-compose.yml

build:
	make overwrite-env
	docker-compose -p ${projectName} -f ${webApiDocker} --env-file="${webApi}/${envFile}" up -d --build
	docker-compose -p ${projectName} -f ${discordBotDocker} --env-file="${discordBot}/${envFile}" up -d --build
	docker-compose -p ${projectName} -f ${webUiDocker} up -d --build
	make setup

setup:
	make overwrite-env
	docker-compose -p ${projectName} -f ${webApiDocker} --env-file="${webApi}/${envFile}" up -d
	docker-compose -p ${projectName} -f ${discordBotDocker} --env-file="${discordBot}/${envFile}" up -d
	docker-compose -p ${projectName} -f ${webUiDocker} up -d
	docker logs ${projectName}_composer --follow
	docker exec -it ${projectName}_php-fpm php bin/console lexik:jwt:generate-keypair --overwrite -n
	docker exec -it ${projectName}_php-fpm php bin/console doctrine:migrations:migrate -n

overwrite-env:
	cp ${envFolder}/Web.API/${envFile} ${webApi}/${envFile}
	cp ${envFolder}/Discord.BOT/${envFile} ${discordBot}/${envFile}

start:
	docker-compose -p ${projectName} -f ${webApiDocker} --env-file="${webApi}/${envFile}" up -d
	docker-compose -p ${projectName} -f ${discordBotDocker} --env-file="${discordBot}/${envFile}" up -d
	docker-compose -p ${projectName} -f ${webUiDocker} up -d

stop:
	docker-compose -p ${projectName} -f ${webApiDocker} --env-file="${webApi}/${envFile}" stop
	docker-compose -p ${projectName} -f ${discordBotDocker} --env-file="${discordBot}/${envFile}" stop
	docker-compose -p ${projectName} -f ${webUiDocker} stop

down:
	docker-compose -p ${projectName} -f ${webApiDocker} --env-file="${webApi}/${envFile}" down --remove-orphans
	docker-compose -p ${projectName} -f ${discordBotDocker} --env-file="${discordBot}/${envFile}" down --remove-orphans
	docker-compose -p ${projectName} -f ${webUiDocker} down --remove-orphans