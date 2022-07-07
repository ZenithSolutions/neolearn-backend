var mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const confiq=require('../config/config').get(process.env.NODE_ENV);
const salt=10;

const UserSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        maxlength: 100
    },
    lastName:{
        type: String,
        required: true,
        maxlength: 100
    },
    photo: {
        type: String
    },
    designation: {
        type: String
    },
    companyLogo: {
        type: String,
    },
    companyName: {
        type: String
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password:{
        type:String,
        required: true,
        minlength:8
    },
    password2:{
        type:String,
        required: true,
        minlength:8

    },
    token:{
        type: String
    }
});

UserSchema.pre('save',function(next){
    var user=this;
    
    if(user.isModified('password')){
        bcrypt.genSalt(salt,function(err,salt){
            if(err)return next(err);

            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) return next(err);
                user.password=hash;
                user.password2=hash;
                next();
            })

        })
    }
    else{
        next();
    }
})

UserSchema.methods.comparepassword=function(password,cb){
    bcrypt.compare(password,this.password,function(err,isMatch){
        if(err) return cb(next);
        cb(null,isMatch);
    });
}

const secretString = 'D5FFB23A8875B377EDECCA0281838BA4'

UserSchema.methods.generateToken=function(cb){
    var user =this;
    let userSign = {
        id: user._id,
        email: user.email
    }
    var token=jwt.sign(userSign,secretString);
    
    user.token=token;
    console.log(token,token)
    user.save(function(err,user){
        if(err) return cb(err);
        cb(null,user);
    })
}

UserSchema.statics.findByToken=function(token,cb){
    var user=this;

    jwt.verify(token,secretString,function(err,decode){
        user.findOne({"_id": decode, "token":token},function(err,user){
            if(err) return cb(err);
            cb(null,user);
        })
    })
};

UserSchema.methods.deleteToken=function(token,cb){
    var user=this;

    user.update({$unset : {token :1}},function(err,user){
        if(err) return cb(err);
        cb(null,user);
    })
}

module.exports=mongoose.model('User',UserSchema);