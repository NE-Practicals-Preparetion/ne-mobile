//setting up server
const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const {
    dbConnection
} = require('./src/db/db');
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger.json")
const tokenRouter = require("./src/routes/token.routes")

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocs, false, {
    docExpansion: "none"
}))

app.use("/", tokenRouter)

const port = process.env.PORT || 6000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
//connecting to database
dbConnection();