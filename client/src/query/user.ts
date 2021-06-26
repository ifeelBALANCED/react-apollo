import {gql} from "@apollo/client";


export const GET_ALL_USERS = gql`
 query {
    getAllUsers {
      name, username, email
    } 
 }
`

export const GET_ONE_USER = gql`
  query getOneUser($id: ID) {
    getOneUser(id: $id) {
       name, username, email
    } 
 }
`
