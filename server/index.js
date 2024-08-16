const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const {mongoose} = require('mongoose');
const cookieParser = require('cookie-parser')
dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database connected'))
.catch((err) => console.log('Database not connected',err))

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))


app.use('/', require('./routes/authRoutes'));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
