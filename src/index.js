import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import {testAPI, eraseDB, seedDB, allUsers, allUsersPopulate, createUser, getUser, updateUser, updateUserCar, deleteUser, getOrgs, getPersons} from './controllers/UserController'
import mongoose from 'mongoose'

mongoose.connect("mongodb://localhost:27017/onemanydb",{
  useNewUrlParser: true,
  useUnifiedTopology: true
},()=>{
  console.log("Connected")
})


const app = express();

app.use(cors());

app.get('/', (req, res) => {
  // res.send('Hello World!');
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/test', testAPI);
app.get('/seedDB', seedDB);
app.get('/eraseDB', eraseDB);
app.get('/users', allUsers);
app.get('/usersPopulate', allUsersPopulate);

app.post('/createUser', createUser);
app.get('/getUser', getUser);
app.put('/updateUser', updateUser);
app.put('/updateUserCar', updateUserCar);
app.delete('/deleteUser', deleteUser);

app.get('/getOrgs', getOrgs);
app.get('/getPersons', getPersons);

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
