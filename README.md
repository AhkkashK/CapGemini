# CapGemini

## Presentation

This project is carried out in collaboration with the company Capgemini, which sponsors our “Data Engineering” major. It aims to design and develop robust and efficient REST APIs by following good software development practices. The goal is to create an API to allow for querying Data using the SIRET number.

The main objective is to implement CRUD (Create, Read, Update, Delete) functionalities to manage data efficiently and securely. These basic operations ensure full interaction with the resources exposed by our REST APIs, while respecting the fundamental principles of this architecture, including:

Statelessness: each query is independent, which guarantees better scalability.
Uniform Interface: Clear and intuitive endpoints, aligned with REST conventions.
Resource Orientation: each resource is identified by a unique URI, allowing precise and modular management.

## Installation

Clone the project
```
git clone https://github.com/AhkkashK/CapGemini.git
```
Create a .env file in the root of the project to configure variables
```touch .env
```
In the .env file set your variables like the following
```
POSTGRES_USER=XXXXX
POSTGRES_PASSWORD=XXXX
POSTGRES_DB=XXXX
```
Run the following command (Make sure to have Docker running)
```
docker-compose up
```
## Informations about files

### Dockerfile
Dockerfile for the node app.

### Docker-compose.yml
File that create a custom container (postgresql and node container).

### server.js
Node server

### init.sql
Create the schema of the database.

### init.sh
Script ensuring the synchronization between each container and the importation of the data into postgresql.

### data.csv
CSV file containing data about establishments.

## API

### GET /etablissements/:siret

Return the data about this siret number

### POST /etablissements/:siret

Create a establishments with a new siret number

### PUT /etablissements/:siret

Modify an establishments using the siret number (can't modify the siret number)

### DELETE /etablissements/:siret

Delete an establishments using the siret number


## Technologies

This project uses PostgreSQL, Node.js, and Docker to ensure scalability, efficiency, and portability. PostgreSQL is chosen for its reliability in managing structured relational data, making it ideal for handling SIRET records with advanced query support. Node.js provides a fast, non-blocking runtime for building the REST API, ensuring smooth handling of concurrent CRUD operations. Finally, Docker simplifies the deployment process by containerizing the application and its dependencies, ensuring consistency across environments and facilitating seamless collaboration and scalability. Together, these technologies deliver a robust, modern, and efficient solution.








