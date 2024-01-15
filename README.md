## Installation

```bash
$ npm install
```

## Set the Database credentials in .env file
Set 
POSTGRES_HOST=<your_host>
POSTGRES_PORT=<postgres_port>
POSTGRES_USER=<pg_user>
POSTGRES_PASSWORD=<pg_password>
POSTGRES_DATABASE=<db_name>

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
This should get the application running on PORT mentioned in env file

You can Find the Sample APIs request and responses in samples.md