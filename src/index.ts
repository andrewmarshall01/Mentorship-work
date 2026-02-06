import express from 'express'
import { resolve } from 'node:dns'
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

new Promise(function(resolve, _reject) {
    app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    resolve(app)
    })
})
