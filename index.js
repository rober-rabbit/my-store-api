const express = require('express');
const cors = require('cors')
const routerApi = require('./routes');

//middlewares
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['http://127.0.0.1:5500/'];
const options = {
  origin: (origin, callback)=>{
    if(whitelist.includes(origin) || !origin){
      callback(null,true);
    }else{
      callback(new Error('no permitido'))
    }
  }
}
app.use(cors());

app.get('/',(req,res) => {
  res.send('hola mi server en express');
});

routerApi(app);
//usamos los middleware
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port,() => {
  console.log(`My port: ${port}`);
});
