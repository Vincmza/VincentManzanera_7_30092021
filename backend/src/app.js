const express = require("express");
const userInfosRoutes = require('../routes/userInfos');
const postsRoutes = require('../routes/posts');

const app = express();

app.use(express.json());


app.use("/api/users", userInfosRoutes);
app.use("/api/posts", postsRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

