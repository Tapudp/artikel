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

router.get('/:titlename', (req, res) => {

    // https://stackoverflow.com/questions/37325246/fetch-from-multiple-separate-collections-with-express-and-mongodb
    // res.render('individual', {
    //     title: title,
    //     description: description,
    //     category: category
    // })
    //https://www.google.co.in/search?ei=M9UnW6DgD4vUvASxs6e4BQ&q=how+to+access+each+object+from+mongodb+render+them+on+separate+pages&oq=how+to+access+each+object+from+mongodb+render+them+on+separate+pages&gs_l=psy-ab.3...377440.392333.0.392512.55.45.1.0.0.0.604.6528.0j12j12j1j1j1.27.0....0...1c.1.64.psy-ab..31.9.1965...33i22i29i30k1j33i160k1.0.rdzpIDRhLTY
    Blog.find({})
        .then(posts => {
            for(post in posts){
                if(posts[post].title == req.params.titlename){
                    console.log(req.params.titlename+' post has been found and will be rendered shortly');
                    //res.send("<p>"+posts[post].content+"</p><br><hr>"+posts[post].author);
                    res.render('individual', {post: posts[post]});
                }
            }
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports = router;