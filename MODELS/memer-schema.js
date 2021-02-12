const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schema=  mongoose.Schema;
const memerschema = new schema({
    Memer: {type :String,required:true },
    Username: {type :String,required:true,unique:true },
    Email: {type :String,required:true,unique:true },
    Password: {type :String,required:true,minlength:8 },
    Profile_Pic: {type :String,required:true },
    About:{type :String,require:true },
    Meme: [{type :mongoose.Types.ObjectId,required:true,ref:'Memes'}],
});

memerschema.plugin(uniqueValidator);
module.exports =mongoose.model('Memer',memerschema);