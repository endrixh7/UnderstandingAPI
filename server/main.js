const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.get('/', (req, res)=>{
    res.send('Hello World')
});

app.post('/', (req, res)=>{
    res.status('201').send('Thanks for adding content')
});

app.put('/', (req, res)=>{
    res.status('200').send('Thanks for updating the content');
});

app.patch('/', (req, res)=>{
    res.status('20').send('Thanks for updating partially the content');
});

app.delete('/', (req, res)=>{
    res.delete('Ohhh my god our content is deleted :/')
});

app.listen(port, ()=>{
    console.log(`Server is listening on ${port}`);
});

// Dont forget to 'node main.js' to start the server