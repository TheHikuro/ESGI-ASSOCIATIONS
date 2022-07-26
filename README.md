# ESGI Gaming Association ![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)

The ESGI Gaming Association is an attendance management tool dedicated to ESGI associations.
## Tech Stack

**Client:** React, TailwindCSS

**Server:** Symfony, NodeJs

**Tools:** ApiPlatform, DiscordBot
## Local Requirements

- __[Docker Engine](https://docs.docker.com/get-docker/)__
- __[Docker Compose](https://docs.docker.com/get-docker/)__
- __[Make command](https://www.tutorialspoint.com/unix_commands/make.htm)__

## Default Exposed Ports

- 8080: Website
- 3000: Api access
- 9000: Phpmyadmin
- 3306: Mariadb
- 3025: Mailcatcher

## Defaults credentials

By default, the Api and website administrator credentials are as follows:
- email: __admin@myges.fr__
- password: __admin__

## Configurations

All defaults confs and envs files are located into __.docker/conf__ folder.
    
## Install Project

Clone the project

```bash
  git clone git@github.com:TheHikuro/ESGI-ASSOCIATIONS.git
```

Go to the project directory

```bash
  cd ESGI-ASSOCIATIONS
```

Build project

```bash
  make build
```

## Documentation

The ESGI Gaming Association Api documentation is available at http://localhost:3000/api/docs


## Authors

- [@TomCuillandre](https://github.com/Frozox)
- [@LoanCLERIS](https://github.com/TheHikuro)
- [@OdessaCh](https://github.com/OdessaCh)
- [@DanLevyM](https://github.com/DanLevyM)
