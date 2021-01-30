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
- swagger (API documentation)

## Architecture
- The project structured by components instead of technical roles
- There are DALs (data access layers) for all models, so it's pretty easy to swap between database drivers (Mongo/MySql/Static-files) without the need to do any refactoring to the data consumers   
  






