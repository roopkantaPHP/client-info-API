# client-info-API
Rest API for clients information CRUD operation. This API expose below URIs as an API on http://HOST:PORT (default HOST is localhost and default PORT is 3000)
 * Create Client: /client (HTTP Method: POST)
 * Get All Client: /client (HTTP Method: GET)
 * Get Client by ID: /client/:id (HTTP Method: GET)
 * Update existing client Info: /client/:id (HTTP Method: PUT)
 * Delete existing client: /client/:id (HTTP Method: DELETE)

**Pre-Requisite**
  * NodeJs 10.19.0
  * MongoDB 2.2.0
  * Express Js 4.17.1
  * git client

**Database Setup**
 * Install Mongo DB Server
 * Create clientdb database
 * create client collection
 
**Project Setup:**
 * Clone the code from master branch of the repository
 * Navigate to the project folder and execute npm install command on the terminal
 
**Additional Consideration**
 * This API doesnot create schema for client collection. Use your own definition for client information properties.
 * This API adds one additional field named "dateAdded" to client information and it is inserted into db for every new entry.
 * This API doesnot generate manual unique ID for a client rather it uses MongoDB generated ObjectID

