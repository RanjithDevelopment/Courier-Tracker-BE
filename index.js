const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const DB = require('./DBConnection');
const registerRouter = require('./Routers/registerRouter');
const packageRouter = require('./Routers/courierRouter');
const auth = require('./Modules/Authmodule');
//Environment Variable Configuration 
dotenv.config();
//DB Connection 
DB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api',registerRouter);
app.use('/',auth.AuthenticateUser)
app.use('/api/admin',auth.authorizeAdmin,packageRouter);
app.listen(process.env.PORT);
