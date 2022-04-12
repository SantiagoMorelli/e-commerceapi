const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
//import router
const userRoute = require('./routes/user');
const productRoute = require('./routes/product');
const authRoute = require('./routes/auth');

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('DB Connection successfull!'))
  .catch((err) => {
    console.log(err);
  });
//endpoints
// app.get('/api/test', () => {
//   console.log('test is successfull');
// });

app.use(express.json()); //para poder obtener json
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);

//cuando valla al endpint api/user va a abrir userRoute.
app.use('/api/auth', authRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log('backend server is running!');
});
