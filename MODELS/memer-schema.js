const mongoose = require('mongoose');
const schema=  mongoose.Schema;
const memerschema = new schema({
    Memer: {type :String,required:true },
    Email: {type :String,required:true,unique:true },
    Password: {type :String,required:true,minlength:8 },
    Profile_Pic: {type :String,required:true },
    Meme: [{type :mongoose.Types.ObjectId,required:true,ref:'Memes'}],
});

memerschema.plugin(uniquevalidator);
module.exports =mongoose.model('Memer',memerschema);