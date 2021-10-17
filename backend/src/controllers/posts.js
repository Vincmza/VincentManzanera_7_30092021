const connection = require('../service/database');

exports.getAllPosts = (req, res) => {
    connection
        .query("SELECT posts.id, posts.title, posts.content_post, posts.user_id, commentaires.id as commentaires_id, commentaires.content_comment, commentaires.user_id, user_post.username, user_comment.username as comment_username FROM posts INNER JOIN commentaires ON posts.id = commentaires.post_id INNER JOIN users as user_post ON user_post.id = posts.user_id INNER JOIN users as user_comment ON user_comment.id = commentaires.user_id ORDER BY posts.id DESC")
        .then((postList) => {
            const listOfAllPosts = []
            postList.forEach(postData => {
                const post = {
                    post_id : postData.id,
                    post_title : postData.title,
                    post_content : postData.content_post,
                    user_id : postData.user_id,
                    username : postData.username,
                    listComment : []
                }
                if(!listOfAllPosts.find(postElement => post.post_id == postElement.post_id)){
                    listOfAllPosts.push(post)
                }
            });
            postList.forEach(rowData =>{
                const comment = {
                    comment_id : rowData.commentaires_id,
                    comment_content : rowData.content_comment,
                    comment_username : rowData.comment_username
                }
                const post = listOfAllPosts.find(postElement => rowData.id == postElement.post_id)
                post.listComment.push(comment)
            })
            console.log(listOfAllPosts)
            res.status(200).json(listOfAllPosts);           
        })
        .catch((error) => {
            console.log(error)
            res.status(401).json({message : "Requête des posts échouée !"})
        });
}

//Get one post and all comments about it
exports.getOnePost = (req, res) => {
    connection
        .query("SELECT * FROM posts JOIN commentaires ON commentaires.post_id = posts.id WHERE posts.id = ?", req.params['postId'])
        .then((post) => {
            res.json(post);
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.createPost = (req, res) => {
    connection
        .query("INSERT INTO posts SET ?", [req.body])
        .then((post) => {
            res.json(post);
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.modifyPost = (req, res) => {
    connection
        .query("UPDATE posts SET ? WHERE id = ?", [req.body, req.params['postId']])
        .then((post) => {
            res.json(post);
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.deletePost = (req, res) => {
    connection
        .query("DELETE FROM posts WHERE id = ?", req.params['postId'])
        .then((post) => {
            res.json(post);
        })
        .catch((err) => {
            console.log(err);
        });
}