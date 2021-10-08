const express = require("express");
const postsRelatedRoutes = require("./routes/posts");
const commentsRoutes = require("./routes/commentaires");
const likesRoutes = require("./routes/likes");
const connectionRoutes = require("./routes/userConnection");
const cors = require("cors");
const auth = require("./middlewares/auth");

const app = express();

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next(); 
});

app.use(cors());

app.use(express.json());

app.use("/api/posts", postsRelatedRoutes);
app.use("/api/commentaires", commentsRoutes);
app.use("/api/likes", likesRoutes);
app.use("/api/auth", connectionRoutes);

app.listen(8081, () => {
    console.log("Server is running on port 8081");
});
