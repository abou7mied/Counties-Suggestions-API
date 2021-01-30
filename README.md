# Counties Suggestions API

A sample backend project for US counties suggestions API. 

## How to run
First install the dependencies
```
npm install
```

Start the server
```
docker-compose up -d
```


Available environment variables:
```dotenv
HTTP_PORT=3000
MONGO_URL=mongodb://mongo/counties
```

Testing
```
npm test
```

## Built using
- Express.js (HTTP framework)
- Docker / docker-compose
- Inversify (dependency injection)
- Jest (Testing Framework)
- Mongoose (ORM)
- swagger (API documentation)







