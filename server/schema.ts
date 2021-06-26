const {buildSchema} = require('graphql')

const schema = buildSchema(`
   type Geo {
        lat: String
        lng: String
   }
   type Company {
       name: String
       catchPhrase: String
       bs: String
   }
   type Address {
        street: String     
        suite: String     
        city: String     
        zipcode: String  
        geo: Geo 
   }
   type User {
     id: ID
     name: String
     username: String
     email: String
     address: Address
     phone: String
     website: String
     company: Company
   }
   type UserInput {
     id: ID
     name: String
     username: String
   }
   type Query {
     getAllUsers: [User]
     getUser(id: ID): User
   }
`)

module.exports = schema
