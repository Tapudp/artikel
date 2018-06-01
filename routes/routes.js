const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

router.get('/', (req, res) => {
    res.status(201).render('index');
});

router.get('/create', (req, res) => {
    res.status(201).render('create');
});

router.post('/create', (req, res) => {
    var title = req.body.post_title;
    var content = req.body.content;
    var author = req.body.author;
    var category = req.body.category;

    var blogPost = new Blog({
        title : title,
        content: content,
        author: author,
        category: category
    });

    blogPost.save().then(item => console.log(`item saved to database ${item}`)).catch(err => console.log(err));
    console.log(title);
    console.log(content);
    console.log(author);
    console.log(category);

    res.redirect('/create');
});

router.get('/blog', (req, res) => {
    /* working perfectly
    Blog.find({}, (err, posts) => {
        if(err) {console.log(err);}
        else if(posts.length){
            console.log('found:', posts);
            res.render('blogposts', {posts: posts});
        } else {
            console.log('No document(s) found with defined "find" criteria');
        }
    });
    */

    // https://stackoverflow.com/questions/46565239/displaying-data-from-a-mongodb-collection-in-ejs-using-mongoose so much helpful
    Blog.find()
        .then(posts => {
            for(post in posts){
                console.log(posts[post].title);
            }
            res.status(201).render('blogposts', { posts: posts });
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports = router;