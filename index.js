const app = require('./app')


// server start
app.listen(8000 || process.env.PORT,() => {
    console.log(`Server is listening on : http://localhost:8000`);
});