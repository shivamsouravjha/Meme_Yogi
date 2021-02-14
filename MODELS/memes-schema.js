const mongoose = require('mongoose');
const schema=  mongoose.Schema;
const memesSchema = new schema({
    caption: {type :String,required:true },
    tags: {type :String,required:true },
    memepic: {type :String,required:true },
    memer: {type :String,required:true },
});
module.exports =mongoose.model('Memes',memesSchema);