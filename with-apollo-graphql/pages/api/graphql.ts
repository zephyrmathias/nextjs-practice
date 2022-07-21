import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-micro'
import { buildSchema } from 'type-graphql'
import { DogsResolver } from '../../src/schema/dogs.resolver'

const schema = await buildSchema({
  resolvers: [DogsResolver],
})

const apolloServer = new ApolloServer({ schema })

const startServer = apolloServer.start()

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://studio.apollographql.com'
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )

  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }

  await startServer

  await apolloServer.createHandler({ path: '/api/graphql' })(req, res)
}

// Apollo Server Micro takes care of body parsing
export const config = {
  api: { bodyParser: false },
}
