import path from 'path'
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { UserResolver } from './src/resolvers/UserResolver'
import { context } from './context'
import { AppointmentsResolver } from './src/resolvers/AppointmentsResolver';
import { BarberResolver } from './src/resolvers/BarberResolver';

async function main() {
    const schema = await buildSchema({
        resolvers: [UserResolver, AppointmentsResolver, BarberResolver],
        emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    })

    const server = new ApolloServer({ schema, context })

    const { url } = await server.listen()

    console.log(`Server runnig on ${url}`)
}

main()