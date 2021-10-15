require("dotenv").config();
const express = require("express"),
 app = express(),
 mongoose = require("mongoose"),
 userRouter = require("./routes/user"),
 authRouter=require("./routes/auth"),
 trackRouter = require("./routes/track"),
 albumRouter=require("./routes/album"),
 playlistRouter = require("./routes/playlists"),
 Port= process.env.port || 3000;
app.use(express.json());
app.use("/",authRouter);
app.use("/users", userRouter);
app.use("/tracks",trackRouter);
app.use("/albums",albumRouter);
app.use("/playlists",playlistRouter);

app.use("*",function(req,res,next){
    //404 page 
    res.json({error:"this route doesn't exist "})
});
// Errors handler function
app.use(function (err, req, res, next) {
    console.error(err);
    res.status(err.status).json({ error: err.message });
});
mongoose.set("debug", true); // in development process
mongoose
    .connect(process.env.API_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then((con) => {
        console.log("Database is connected");
        app.listen(Port, () => {
            console.log(`Server started on ${Port}`);
        });
    })
    .catch((err) => {
        console.error(err);
    });