import {ApolloServer} from '@apollo/server'

const typeDefs = `#graphql
    type Query {helloWorld: String!}
`

const resolvers = {
    Query: {helloWorld: () => 'hello world'}
}

const schema = {typeDefs, resolvers}

export const runGqlServer = async () => {
    const server = new ApolloServer(schema)
    await server.start()
    return server
}