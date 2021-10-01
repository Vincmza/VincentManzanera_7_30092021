const express = require("express");
const userInfosRoutes = require('../routes/userInfos');
const postsRelatedRoutes = require('../routes/posts');
const commentsRoutes = require('../routes/commentaires');

const app = express();

app.use(express.json());

app.use("/api/users", userInfosRoutes);
app.use("/api/posts", postsRelatedRoutes);
app.use("/api/commentaires", commentsRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

