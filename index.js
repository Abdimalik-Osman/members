const express = require('express');
const path = require('path');
var exphbs = require('express-handlebars');
const members = require('./Members')
const logger = require('./middleware/logger');
const PORT = 5000;


const app = express();

// app.get('/', (req, res)=>{
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })

// handlebars middleware
app.engine('handlebars', exphbs.engine({defaultLayout:'main'}));
app.set('view engine', 'handlebars');


// body parser
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Homepage route
app.get('/',(req,res)=>res.render('index',{
    title:'members app',
    members,
}))

// init middle wares
app.use(logger);
// static Folder..
app.use(express.static(path.join(__dirname, 'public',)))

// Members API routes
app.use('/api/members', require('./routes/api/members'))

app.listen(PORT,()=>{
    console.log('Listening on port '+PORT);
})
