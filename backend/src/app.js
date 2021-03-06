const express = require("express");
const app = express();
/*security*/
const nocache = require("nocache");
const helmet = require("helmet");
/*routes*/
const postsRelatedRoutes = require("./routes/posts");
const commentsRoutes = require("./routes/commentaires");
const likesRoutes = require("./routes/likes");
const connectionRoutes = require("./routes/userConnection");
const userRoute = require("./routes/user");
/*authentification middleware*/
const auth = require("./middlewares/auth");

const cors = require("cors");
const path = require("path");

app.use((req,res, next)=>{
    res.setHeader('Access-Control-Allow-Origin',"http://localhost:3000");
    res.setHeader('Access-Control-Allow-Headers',"*");
    res.header('Access-Control-Allow-Credentials', true);
    next();
})
app.use(express.json());
app.use(helmet());
app.use(cors({ origin: true }));

app.use("/images", express.static(path.join(__dirname, "../images")));

app.use("/api/posts", auth, postsRelatedRoutes);
app.use("/api/commentaires", auth, commentsRoutes);
app.use("/api/likes", auth, likesRoutes);
app.use("/api/auth", nocache(), connectionRoutes);
app.use("/api/users", auth,userRoute);


app.listen(8081, () => {
    console.log("Server is running on port 8081");
});
