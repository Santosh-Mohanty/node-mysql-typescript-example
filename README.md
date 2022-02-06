# node-mysql-typescript-example

## About

This is a sample project to demonstrate NodeJS, Express, MySql with Typescript implementation. This project uses JOI for request schema validation. Prettifier is also built in to the build command directly to mantain your code neatly.

## Installation

### Database Setup

This Project needs you to have MySql Installed with a Database and sample tables created. Please use the below commands to setup database and tables in a already installed MySql Instance

#### Company Table
```sh
mysql> CREATE TABLE company (
    ->     UUID varchar(255),
    ->     companyName varchar(255),
    ->     CompanyCEO varchar(255),
    ->     companyAddress varchar(255),
    ->     inceptionDate varchar(255)
    -> );
```
#### Team Table
```sh
mysql> CREATE TABLE team (
    -> UUID varchar(255),
    -> CompanyID varchar(255),
    -> teamLead varchar(255)
    -> );
```
### Project Setup

Install the dependencies and start the server.  When you clone the respository, cd into it to start.  

```sh
$ cd <project_directory>
$ npm install
$ npm run build
$ npm start
```

## API Details -  Import the Curl into Postman

### 1. Login API - The API's are protected by JWT Token, in order to create a token, please use the login API to generate the Auth Token. The Token is valid for 1 hour.

```sh
curl --location --request POST 'localhost:1337/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "sample",
    "password": "sample"
}'
```

### 2. Create Company
```sh
curl --location --request POST 'localhost:1337/company/create' \
--header 'authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbXBsZSIsImlhdCI6MTY0NDE2ODg4NH0.PP3Hbxrp1_Bduv71KZ9WS18aS1Whb532aZ63L0P-iLI' \
--header 'Content-Type: application/json' \
--data-raw '{
    "companyName": "OLA",
    "CompanyCEO": "Bhavish Agarwal",
    "companyAddress": "India",
    "inceptionDate": "06/11/1989"
}'
```
### 3. Create Team
```sh
curl --location --request POST 'localhost:1337/team/create/b7485c6c-75bc-43d0-a3c8-8c3955dd788b' \
--header 'authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbXBsZSIsImlhdCI6MTY0NDE2ODg4NH0.PP3Hbxrp1_Bduv71KZ9WS18aS1Whb532aZ63L0P-iLI' \
--header 'Content-Type: application/json' \
--data-raw '{
    "teamLead": "Santosh"
}'
```
### 4. Get Company By ID
```sh
curl --location --request GET 'localhost:1337/company/companyId/b7485c6c-75bc-43d0-a3c8-8c3955dd788b' \
--header 'authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDQxNzYxMTMsInVzZXJuYW1lIjoic2FtcGxlIiwiaWF0IjoxNjQ0MTcyNTEzfQ.Sshe9zq3XW8TDvytp0ef7rZVjnLWBzBANha5MLRumjc' \
--data-raw ''
```

### 5. Get Company By Name
```sh
curl --location --request GET 'localhost:1337/company/companyName/ola' \
--header 'authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDQxNzYxMTMsInVzZXJuYW1lIjoic2FtcGxlIiwiaWF0IjoxNjQ0MTcyNTEzfQ.Sshe9zq3XW8TDvytp0ef7rZVjnLWBzBANha5MLRumjc' \
--data-raw ''
```

### 6. Get All Teams
```sh
curl --location --request GET 'localhost:1337/team/allTeams' \
--header 'authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDQxNzYxMTMsInVzZXJuYW1lIjoic2FtcGxlIiwiaWF0IjoxNjQ0MTcyNTEzfQ.Sshe9zq3XW8TDvytp0ef7rZVjnLWBzBANha5MLRumjc' \
--data-raw ''
```

