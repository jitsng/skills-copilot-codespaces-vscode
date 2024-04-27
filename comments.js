// create web server
// npm install express
import express from 'express';
const app = express();

// npm install body-parser
import { json } from 'body-parser';
app.use(json());

// npm install cors
import cors from 'cors';
app.use(cors());

// npm install mongoose
import { connect, model } from 'mongoose';
connect('mongodb://localhost:27017/comments');

const Comment = model('Comment', {
    username: String,
    body: String,
    date: Date
});

app.get('/comments', async (req, res) => {
    const comments = await Comment.find();
    res.send(comments);
});

app.post('/comments', async (req, res) => {
    const comment = new Comment(req.body);
    await comment.save();
    res.send(comment);
});

app.listen(3001, () => console.log('Server listening on port 3001!'));