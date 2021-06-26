const express = require('express')
const cors = require('cors')
const {graphqlHTTP} = require('express-graphql')
const userSchema = require('./schema')
const users = require('./json/users.json')
const app = express()
const port = process.env.PORT || 5000
type User = {
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo: {
            lat: string,
            lng: string
        }
    },
    phone: string,
    website: string,
    company: {
        name: string,
        catchPhrase: string,
        bs: string
    }
}
const root = {
    getAllUsers: () => {
        return users
    },
    getOneUser: ({id}: User) => {
        return users.find((user: User) => user.id === id)
    },
}
app.use(cors())
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: userSchema,
    rootValue: root
}))
app.listen(port, () => console.log(`Server started on port ${port}.`))
