import express from 'express'
import { resolve } from 'node:dns'
import cors from 'cors'
import { expressMiddleware } from '@apollo/server/express4';
import { runGqlServer } from './graphql'

const run = async () => {
  const app = express()
  const port = 3000
  const gqlServer = await runGqlServer()

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.use('/graphql', 
    cors(),
    express.json(),
    expressMiddleware(gqlServer),
  )

  new Promise(function(resolve, _reject) {
      app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
      resolve(app)
      })
  })
}

run()