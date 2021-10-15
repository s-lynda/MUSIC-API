const mongoose = require("mongoose"),
jwt=require("jsonwebtoken"),
bcrypt = require("bcrypt");
let rateSchema = new mongoose.Schema({
    track_id: {
        type: mongoose.Types.ObjectId,
        ref: "track",
        required: true,
    },
    rating: {
        required: true,
        type: Number,
        min:1,
        max:5,
    },
    comment: {
        default: "",
        type: String,
    },
});
 ArtistSchema= new mongoose.Schema({
    realName: {
        type: String,
        required:true   
    },
    //ArtName === Username
    artName: {
        type: String,
         unique:true,
         required:true
    },
    mail: {
        type: String,
        required: true,
        unique:true
    },
    Password: {
        type: String,
        required: true
    },
    role:[{
        type:String,
        required: true
    }],
    yearBirth: {
        type: Date
    },
    instruments:[{
        type:String,
    }],
    City: {
        type: String
    },
    Country: {
        type: String,
    },
    isArtist: {
        required:true,
        type: Boolean,
    },
    tracks:
    [{type:mongoose.Types.ObjectId,
      ref:"track",
      default:[]
     }
    ],
    Albums: 
    [{ type: mongoose.Types.ObjectId, 
      ref: "Album",
      default:[] }],
    Playlists: 
      [{ type: mongoose.Types.ObjectId, 
        ref: "playlist" ,
        default:[]
    }],
    rates: [rateSchema],

});
ArtistSchema.pre("save", async function (next) {
    try {
        if (this.isModified("Password")) 
        //13: saltRounds 
          this.Password = await bcrypt.hash(this.Password, 13);
        next();
    } catch (e) {
        next(e);
    }
});
ArtistSchema.methods.comparePasswords = async function (passwordSent, next) {
    try {
        return await bcrypt.compare(passwordSent, this.Password);
    } catch (e) {
        next(e);
    }
};
ArtistSchema.methods.insertToken = function () {
    let user = this.toObject();
    //we delete the password bach manb3tuche f token 
    delete user.password;
    user.token = jwt.sign(
        { //PAYLOAD
            id: user._id,
            realName: user.realName,
        },
        process.env.SECRET_KEY,
        { //time expiring of the token 
            expiresIn: "100h",
        } 
        
    );
    return user;
};
module.exports=mongoose.model("user",ArtistSchema);