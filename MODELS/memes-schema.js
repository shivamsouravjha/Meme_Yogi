const mongoose = require('mongoose');
const schema=  mongoose.Schema;
const MemesSchema = new schema({
    Caption: {type :String,required:true },
    Tags: {type :String,required:true },
    Meme: {type :String,required:true },
    Memer: {type :mongoose.Types.ObjectId,required:true,ref:'Memer' },
});
module.exports =mongoose.model('Memes',MemesSchema);