<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Run in development
1. Clone repository
2. Run
```
npm install
```
3. Install nest
```
npm install -g @nestjs/cli
```
4. Raise the database
```
docker-compose up -d 
```
5. Start app
```
npm run start:dev
```
6. Seed
```
Excecute this Enpoint
GET 
localhost:3000/api/seed
```

# Build production
1. Build 
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```
2. Run
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up
```

# Endpoind for authenticate
1. Register
```
POST 
localhost:3000/api/auth/register

parameter body 
{
    "email":"example@gmail.com",
    "password":"123456",
    "name":"Example   "
}
```
2. Login
```
POST 
localhost:3000/api/auth/login

parameter body 
{
    "email":"example@gmail.com",
    "password":"123456"
}
```

# Endpoint user
1. Create
```
POST
localhost:3000/api/user

parameter body 
file: file
name: string
last_name: string
addres: string
```
2. Read
```
GET 
localhost:3000/api/user

GET
localhost:3000/api/user/:id
```
3. Update
```
localhost:3000/api/user/:id

parameter body 
name: string
last_name: string
addres: string
```

## Stack used

* MongoDB
* Nestjs