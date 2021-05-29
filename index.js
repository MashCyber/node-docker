const express = require('express');
const app = express();
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose');
const redis = require('redis')
const session = require('express-session')
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT,REDIS_PORT, REDIS_URL,SESSION_SECRET } = require('./config/config');
const port = process.env.PORT || 3000;
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
//Routes
const postRouter = require('./routes/postRoutes')
const userRouter = require('./routes/userRoutes')

//Middlewares
app.use(express.json());
app.use(morgan('tiny'));
app.enable("trust proxy");
app.use(cors());

//Session
let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT
})

const connectWithRetry = () =>{
    mongoose
    .connect(`${mongoURL}`,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(() =>{
        console.log("####################")
        console.log("CONNECTED TO DB!!")
        console.log("####################")
    })
    .catch((e) => {
        console.log(`Error:`,e)
        setTimeout(connectWithRetry,5000)
        console.log('==================================')
    })
};

connectWithRetry();

app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: SESSION_SECRET,
      cookie:{
        saveUninitialized: false,
        resave: false,
        secure:false,
        httpOnly:true,
        maxAge: 300000
      }
    })
  )

  app.get('/api/v1/',(req,res)=>{
      res.status(200).send(`
        <h2>Hey There Eng.Titus M!!</h2>
      `)
  })

app.use("/api/v1/posts",postRouter)
app.use("/api/v1/users",userRouter)


app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})