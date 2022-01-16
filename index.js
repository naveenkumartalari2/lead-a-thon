const express= require('express')
const app = express();
require('dotenv').config()
const router = require('./app/RestController/routes')

const port = process.env.PORT

app.use(express.json())
app.use("/", router)

app.listen(port, () => {
    console.log(`server listinig on ${port}`)
})