const mongoose = require('mongoose');

const userpostsSchema = mongoose.Schema(

    {
        "title"  : String,
        "name" : String,
        "postcontent":String,
        "posttype":String,
        "comment" : [{
                        type : mongoose.Schema.Types.ObjectId,
                        ref : "comment"

                        }],

        "date": { type: Date, default: Date.now },
        "isSolved":Boolean

    }

);
mongoose.model('userposts', userpostsSchema);
