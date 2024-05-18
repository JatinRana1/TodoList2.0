const express = require('express')
const { connectDb, sequelize } = require('./connection/connectWithDb');
const userRouter = require('./router/userRouter');
const noteRouter = require('./router/noteRouter');
const cors = require('cors')
require('dotenv').config()


const app = express();
const PORT = process.env.PORT || 4000

//middleware
app.use(cors({
    origin: '*'
}))
app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.method, req.path)
    next()
})

//routes
app.use("/user", userRouter)
app.use("/note", noteRouter)

app.listen(PORT, ()=>{console.log(`Listening on port ${PORT} `)})
connectDb()


sequelize.sync({ logging: false })
    .then(() => console.log('Database synchronized'))
    .catch(err => console.error('Error synchronized database: ', err))
