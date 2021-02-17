const mongoose = require('mongoose');
const schema=  mongoose.Schema;
const memesSchema = new schema({
    caption: {type :String,required:true },
    tags: {type :String,required:true },
    memepic: {type :String,required:true },
    memer_ID: {type :mongoose.Types.ObjectId,required:true,ref:'Memer' },
});
module.exports =mongoose.model('Memes',memesSchema);