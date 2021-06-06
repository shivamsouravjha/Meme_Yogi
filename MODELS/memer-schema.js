const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schema=  mongoose.Schema;

const memerschema = new schema({
    name: {type :String,required:true },
    username: {type :String,required:true,unique:true },
    type: {type :String,required:true},
    contact: {type :String,required:true,unique:true },
    password: {type :String,required:true,minlength:8 },
    profile_Pic: {type :String,required:true },
    about:{type :String,require:true },
    meme_ID: [{type :mongoose.Types.ObjectId,required:true,ref:'Memes'}],
    saved_posts: [{type :mongoose.Types.ObjectId,required:true,ref:'Memes'}],
    following:[{type :mongoose.Types.ObjectId,required:true,ref:'Memer'}]
},{
    versionKey: false 
  });

memerschema.plugin(uniqueValidator);
module.exports = mongoose.model('Memer',memerschema);