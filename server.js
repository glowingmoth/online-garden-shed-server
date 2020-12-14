const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const path = require('path');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

require('./config/passport')(passport);

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
  err => {
    if (err) {
      console.log('err:', err);
    } else {
      console.log('MongoDB is connected');
    }
  }
)

const app = express();

app.use(logger('dev'));

const whiteList = ['http://localhost:3000', 'https://gardenshed.netlify.app'];
// app.use(cors({
//   credentials: true,
//   origin: (origin, callback) => {
//     if (whiteList.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   }
// }))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/sheds', require('./routes/sheds_routes'));
app.use('/api/auth', require('./routes/auth_routes'))

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server is listening on ${port}`));