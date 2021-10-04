const express = require("express");
const postsRelatedRoutes = require("./routes/posts");
const commentsRoutes = require("./routes/commentaires");
const likesRoutes = require("./routes/likes");
const connectionRoutes = require("./routes/userConnection");
const auth = require("./middlewares/auth");

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
//     );
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
//     next();
// });

const app = express();

app.use(express.json());

app.use("/api/users", userInfosRoutes);
app.use("/api/posts", postsRelatedRoutes);
app.use("/api/commentaires", commentsRoutes);
app.use("/api/likes", likesRoutes);
app.use("/api/auth", auth, connectionRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
