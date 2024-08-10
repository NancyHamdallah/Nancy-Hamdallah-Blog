import express, { Application } from 'express';
import sequelize from './config/database';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import categoryRoutes from './routes/categoryRoutes';
import commentRoutes from './routes/commentRoutes';
import bodyParser from 'body-parser'
import auth from './routes/auth'
//create express app
const app:Application = express();

//Middleware

app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
 }));
 
 

//Routes
app.use('/auth',auth)
app.use('/api/users',userRoutes);
app.use('/api/posts',postRoutes);
app.use('/api/posts',commentRoutes);
app.use('/api/posts',categoryRoutes);


//Sync database
sequelize.sync().then(() => {
console.log('Database & tables created ');
});

export default app;