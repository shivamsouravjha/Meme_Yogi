const mongoose = require('mongoose');
const schema=  mongoose.Schema;
const memesSchema = new schema({
    caption: {type :String,required:true },
    tags: {type :String,required:true },
    meme: {type :String,required:true },
    memer: {type :mongoose.Types.ObjectId,required:true,ref:'Memer' },
});
module.exports =mongoose.model('Memes',memesSchema);