import { gql } from "@apollo/client";

export const QUERY_USER = gql`
    query user($username: String!) {
        _id
        username
        email

    }
`