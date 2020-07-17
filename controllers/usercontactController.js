var mongoose = require('mongoose');
var Contact = mongoose.model('usercontact');
var User = require('../models/user');


//this is a function to create post by logged in user
var createContact = function(req,res){

    User.findById(req.session.userId)
        .exec(function (error, user) {
    var contact = new Contact({
        "title":req.body.title,
        "name":user.username,
        "content":req.body.content
    });

        contact.save(function(err,users){
            if(!err){
                Contact.find((err, users) => {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        res.redirect('/loggedin')
                    }
                });
            }else{
                res.sendStatus(400);
            }
        });
        });
};

// enter create post page
var showCreateContactPage =function(req, res)  {
    res.render('newcontact');
}


//var showInputContactPage = function(req, res) {
//    res.render('newcontact');
//}
// Update a post by the id in the request
/*function(req,res){
console.log(req.params.id);
console.log(req.session.userId);
}*/
/*
                 User.findById(req.session.userId)
                     .exec(function (error, user) {
                 var post = Post.findByIdAndUpdate({
                     "title":req.body.title,
                     "name":user.username,
                     "postcontent":req.body.postcontent,
                 });

                     post.save(function(err,users){
                         if(!err){
                             Post.find((err, users) => {
                                 if (err) {
                                     res.sendStatus(500);
                                 } else {
                                     res.redirect('/index')
                                 }
                             });
                         }else{
                             res.sendStatus(400);
                         }
                     });
                     });
             };*/


//var update = function(req, res) {
// /* if (!req.body) {
//    return res.status(400).send({
//      message: "Data to update can not be empty!"
//    });
//  }*/
//
//      User.findById(req.session.userId)
//          .exec(function (error, user) {
//      var post = new Post({
//          "title":req.body.title,
//          "name":user.username,
//          "postcontent":req.body.postcontent,
//      });
//
//
//  const id = req.params.id;
//
//  post.findByIdAndUpdate(id, post, { useFindAndModify: false })
//    .then(data => {
//      if (!data) {
//        res.status(404).send({
//          message: `Cannot update post with id=${id}. Maybe post was not found!`
//        });
//      } else res.send({ message: "Post was updated successfully." });
//    })
//    .catch(err => {
//      res.status(500).send({
//        message: "Error updating Post with id=" + id
//      });
//    });
//});
//};


var deleteContact = (req, res) => {
  Contact.findByIdAndRemove(req.params.id)
    .then((post) => {
      if (!post) {
        return res.status(404).send({
          message: "Post not found ",
        });
      }
      res.send({ message: "Post deleted successfully!" });
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Could not delete post ",
      });
    });
};


module.exports.createContact = createContact;
module.exports.showCreateContactPage = showCreateContactPage;
//module.exports.update = update;
module.exports.deleteContact = deleteContact;
