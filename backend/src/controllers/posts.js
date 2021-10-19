const connection = require('../service/database');

exports.getAllPosts = (req, res) => {
    connection
        .query("SELECT posts.id, posts.title, posts.content_post, posts.user_id, commentaires.id as commentaires_id, commentaires.content_comment, commentaires.user_id, user_post.username, user_comment.username as comment_username, likes.id as likes_id, likes.user_id as likes_user_id, likes.post_id as likes_post_id, likes.liked, likes.disliked FROM posts LEFT JOIN commentaires ON posts.id = commentaires.post_id LEFT JOIN users as user_post ON user_post.id = posts.user_id LEFT JOIN users as user_comment ON user_comment.id = commentaires.user_id LEFT JOIN likes ON likes.post_id = posts.id ORDER BY posts.id DESC")
        .then((postList) => {
            const listOfAllPosts = []
            postList.forEach(postData => {
                const post = {
                    post_id : postData.id,
                    post_title : postData.title,
                    post_content : postData.content_post,
                    user_id : postData.user_id,
                    username : postData.username,
                    listComment : [],
                    listLikes : []
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
    
                /*VERIFICATION DE DOUBLON*/
                if(!post.listComment.find(commentElement => comment.comment_id == commentElement.comment_id)){
                    if(rowData.commentaires_id != null){
                        post.listComment.push(comment)
                    }                    
                }    
            });    
            postList.forEach (rowData => {
                const likes = {
                    id : rowData.likes_id,
                    likes_post_id : rowData.likes_post_id,
                    likes_user_id : rowData.likes_user_id,
                    liked_post : rowData.liked,
                    disliked_post : rowData.disliked
                }   
                const post = listOfAllPosts.find(postElement => rowData.id == postElement.post_id)
    
                /*VERIFICATION DE DOUBLON*/
                if(!post.listLikes.find(likeElement => likes.id == likeElement.id)){
                    if(rowData.likes_post_id != null){
                        post.listLikes.push(likes)
                    }
                    
                }
                
            });
    
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