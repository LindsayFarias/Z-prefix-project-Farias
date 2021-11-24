const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV]);

const app = express();

const saltRounds = 10;
const { hash, compare } = bcrypt;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(morgan('dev'));
const baseURL = 'https://z-prefix-prject-farias.herokuapp.com'
app.use(
    cors({
        origin: 'baseURL',
        methods: 'GET, POST, PATCH, DELETE'
    })
);
app.use(cookieParser());

//function for creating a new user and finding their hashed password upon logging in
const createUser = (username, password) => {
    return knex('users')
        .returning('id')
        .insert({username: username, password_hash: password})
        .then(data=>data)
}

const getPassword = (username) => {
    return knex('users')
        .where({username})
        .select('password_hash')
        .then(data => data[0].password_hash)
        .catch(err => err)
};

app.get('/', (req, res) => {
    res.status(200).json('successful hit')
})

app.post('/create', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    hash(password, saltRounds)
        .then((hash) => {
            createUser(username, hash)
                .then(data => res.status(201).json(data))
                .catch(err => res.status(500).json(err));
        })
        .catch(err => console.log(err));

    res.cookie('username', username)
});

app.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    getPassword(username).then(hashedPassword => {
        compare(password, hashedPassword)
            .then((isMatch) => {
                if (isMatch) res.status(202).json('SUCCESSFUL LOGIN');
                else res.status(401).json('NO MATCH');
            })
            .catch(err => res.status(500).json(err));
    });
});

app.post('/blogs/:userId', async (req, res) => {
    const post = req.body
    const title = req.body.title;
    const content = req.body.content;
    const shortened_content = req.body.content.substring(0,100);
    const userId = parseInt(req.params.userId, 10);

    let blogId = await knex('blogs')
        .returning('id')
        .insert({title: title, content: content, shortened_content: shortened_content})
        .then(data=>data);
    
    blogId = blogId[0];

    await knex('blogs_user')
        .insert({blog: blogId, user: userId})
        .then(data => data);

    res.status(201).json('BLOG HAS BEEN POSTED');
});

app.get('/blogs/:userName', async (req, res) => {
    const userName = req.params.userName
    
    const userId = await knex('users')
        .select('id')
        .where({username: userName})
        .then((data) => data[0].id)

    const blogs = await knex
        .select('*')
        .from('blogs')
        .where('blogs_user.user', userId)
        .innerJoin('blogs_user', 'blogs.id', '=', 'blogs_user.blog')
        .then(data => data);

    const result = [
        {bloggerId: userId},
        blogs
    ]

    res.status(200).json(result);
});

app.get('/blogs', async (req, res) => {
    const blogs = await knex('blogs')
        .select('*')
        .then(data => data);

    res.status(200).json(blogs);
});

app.get('/blogs/individual/:postId', async (req, res) => {
    const postId = parseInt(req.params.postId, 10);

    const blog = await knex('blogs')
        .select('*')
        .where({id: postId})
        .then(data=>data)
        .catch(err => res.status(401).json('POST NOT FOUND'));

    res.status(200).json(blog);
});

app.patch('/blogs/:postId', async (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const postUpdate = req.body;

    let shortened_content;
    shortened_content = postUpdate.content ?
        postUpdate.content.substring(0,100)
        : null;

    postUpdate.title && postUpdate.content ?
    await knex('blogs')
            .update({
                title: postUpdate.title,
                content: postUpdate.content,
                shortened_content: shortened_content
            })
            .where({id: postId})
            .then(data=> res.status(201).json('BLOG HAS BEEN UPDATED'))
            .catch(err => res.status(404).json('BLOG NOT FOUND'))
    : postUpdate.title ?
        await knex('blogs')
            .update({
                title: postUpdate.title
            })
            .where({id: postId})
            .then(data=> res.status(201).json('BLOG HAS BEEN UPDATED'))
            .catch(err => res.status(404).json('BLOG NOT FOUND'))
    :   await knex('blogs')
            .update({
                content: postUpdate.content,
                shortened_content: shortened_content
            })
            .where({id: postId})
            .then(data=> res.status(201).json('BLOG HAS BEEN UPDATED'))
            .catch(err => res.status(404).json('BLOG NOT FOUND'));
});

app.delete('/blogs/:postId', async (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    console.log(postId);

    await knex
        .delete('*')
        .from('blogs')
        .where({id: postId})
        .catch(err=>res.status(404))

    await knex('blogs_user')
        .delete('*')
        .from('blogs_user')
        .where({id: postId})
        .catch(err=>res.status(404))

    res.status(200);
});

module.exports = { app, knex };