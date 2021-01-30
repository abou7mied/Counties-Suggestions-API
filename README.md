# Counties Suggestions API

A sample backend project for US counties suggestions API. 

## How to run
First install the dependencies
```
npm install
```

Available environment variables:
```dotenv
HTTP_PORT=3000
MONGO_URL=mongodb://mongo/counties
COUNTIES_DATABASE_DRIVER=static # static / mongo
```

Start the server
```
docker-compose up -d
```


Testing
```
npm test
```

## Built using
- Typescript
- Express.js (HTTP framework)
- Docker / docker-compose
- Inversify (dependency injection)
- Jest (Testing Framework)
- Mongoose (ORM)

## Architecture
- To follow the best practises for scalable Node.js apps, I structured this project by components instead of technical roles
- Thanks to SOLID principles and clean architecture, in this project I use dependency injection to easily swap between the dependencies, for example, there are DALs (data access layers) for the models, so it's pretty easy to swap between database drivers (Mongo/MySql/Static-files) without the need to do any refactoring to the data consumers   
- There are database drivers for the counties, static (Static file) and Mongo, you can swap between them by setting the env var `COUNTIES_DATABASE_DRIVER` to `static` (default) or `mongo`   






