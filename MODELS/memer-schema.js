const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schema=  mongoose.Schema;
const memerschema = new schema({
    memername: {type :String,required:true },
    username: {type :String,required:true,unique:true },
    email: {type :String,required:true,unique:true },
    password: {type :String,required:true,minlength:8 },
    profile_Pic: {type :String,required:true },
    about:{type :String,require:true },
    meme: [{type :mongoose.Types.ObjectId,required:true,ref:'Memes'}],
});

memerschema.plugin(uniqueValidator);
module.exports =mongoose.model('Memer',memerschema);