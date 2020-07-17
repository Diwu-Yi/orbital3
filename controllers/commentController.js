var mongoose = require('mongoose');

var Comment = require('../models/comment');
var Post = mongoose.model('userposts');

//var createComment = function(req, res ){
//
//    var comment = new Comment({
//        "username" : req.body.username,
//        "content" : req.body.content,
//        "created" : Date.now()
//    });
//
////这个地方不知道改不改
//
//
//      comment.save( function( err, comments, count ){
//              res.render('postfeedback');
//          });
//
//};

//换成了这个试一下先

var createComment = function(req , res ) {
//  return db.Comment.create(comment).then(docComment => {
//    console.log("\n>> Created Comment:\n", docComment);
    var comment1 = new Comment({
            "username" : req.body.username,
            "content" : req.body.content,
            "created" : Date.now()
        });

    console.log(req.params);
    var id = req.params.id;
    //console.log(id);

    comment1.save(function(err, comments , count){

    //res.render('postfeedback');
    console.log(comment1._id);
    //console.log(comments);

    Post.findByIdAndUpdate(
              id,
              { comment : comment1._id },
              { new : true, useFindAndModify : false }
            );
    });
};




module.exports.createComment = createComment;
