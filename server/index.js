/* 
    body-parser: enable send requests
    cors: enable cors orgin requests
    express: routing epxress framework
    mongoose: creating models / connect mongoDB
    nodemon: auto reset
*/
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// import routers
import healthDetailRouter from './routes/healthDetail.js';
import userRouter from './routes/user.js';
import dietRouter from './routes/diet.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// HD Router
app.use('/HD', healthDetailRouter);
// user Router
app.use('/user', userRouter);
// diet Router
app.use('/diet', dietRouter);

app.get('/', (req, res) => {
    res.send("Hello to Daily Nutrients API");
});

// connect to mongoDB
// const CONNECTION_URL = 'mongodb://localhost:27017/userDB2';
//  const PORT = 4000;
// app.listen(PORT,()=>{
//     console.log(process.env.CONNECTION_URL)
//     console.log("listining")
// })

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(process.env.PORT, () => console.log(`Server running on PORT: ${process.env.PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false); //  no warnings in the console