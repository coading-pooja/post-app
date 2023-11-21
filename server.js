const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

let posts = [];

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.redirect('/posts');
});

app.get('/posts', (req, res) => {
    res.json(posts);
});

app.post('/posts', (req, res) => {
    const { userName, message } = req.body;
    const newPost = { userName, message, comments: [] };
    posts.push(newPost);
    res.json(newPost);
});

app.get('/search/:phrase', (req, res) => {
    const { phrase } = req.params;
    const searchResults = posts.filter(post =>
        post.message.toLowerCase().includes(phrase.toLowerCase())
    );
    res.json(searchResults);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
