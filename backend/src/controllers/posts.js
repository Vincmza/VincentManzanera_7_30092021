const connection = require('../service/database');
const xss = require("xss");
const fs = require("fs");

exports.getAllPosts = (req, res) => {
    connection
        .query("SELECT posts.id, posts.title, posts.content_post, posts.user_id as post_user_id, posts.imageUrl as imageUrl, commentaires.id as commentaires_id, commentaires.content_comment, commentaires.user_id, user_post.username, user_comment.username as comment_username, likes.id as likes_id, likes.user_id as likes_user_id, likes.post_id as likes_post_id, likes.liked FROM posts LEFT JOIN commentaires ON posts.id = commentaires.post_id LEFT JOIN users as user_post ON user_post.id = posts.user_id LEFT JOIN users as user_comment ON user_comment.id = commentaires.user_id LEFT JOIN likes ON likes.post_id = posts.id ORDER BY posts.id DESC")
        .then((postList) => {
            /*tableau dans lequel je range mes données*/
            const listOfAllPosts = []
            postList.forEach(postData => {
                const post = {
                    post_id : postData.id,
                    post_title : postData.title,
                    post_content : postData.content_post,
                    user_id : postData.post_user_id,
                    username : postData.username,
                    imageUrl : postData.imageUrl,
                    listComment : [],
                    listLikes : []
                }
                /*si il ne trouve pas le post dans le tableau listOfAllPosts il le push en bouclant sur la réponse postList*/
                /*évite les doublons*/
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
    
                /*idem que pour les posts*/
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
    
                /*idem que pour les posts*/
                if(!post.listLikes.find(likeElement => likes.id == likeElement.id)){
                    if(rowData.likes_post_id != null){
                        post.listLikes.push(likes)
                    }                    
                }
                
            });
    
            res.status(200).json(listOfAllPosts);
        })
        .catch((error) => {
            res.status(401).json(error)
        });
}
/*Create a post*/
exports.createPost = (req, res) => {
    for (let post in req.body) req.body[post] = xss(req.body[post]);
    /*variable qui contient l'adresse vers le fichier si il y en a un, sinon renvoie null*/
    const postImage = req.file ? "http://localhost:8081/images/" + req.file.filename : null ;
    try {
        /*le post doit contenir au moins une image ou du texte*/
        if(postImage == null && req.body.postContent == ""){
            throw "Ce post ne contient aucun contenu"
        }
        /*le post doit contenir obligatoriement un titre*/
        if(!req.body.postTitle){
            throw "Ce post n'a pas de titre"
        }
        connection
            .query("INSERT INTO posts (title, content_post, imageUrl, user_id) VALUES (?, ?, ?, ?)", [req.body.postTitle, req.body.postContent, postImage, req.userId])
            .then((newPost) => {
                res.status(201).json(newPost)
            })            
            .catch((error) => {
                res.status(400).json(error);
            });
    }
    catch(error){
        res.status(400).json(error)
    }
        
}

//Get one post and all comments about it
exports.getOnePost = (req, res) => {
    connection
        .query("SELECT posts.id, posts.title, posts.content_post, posts.user_id as post_user_id, posts.imageUrl as imageUrl, commentaires.id AS comment_id, commentaires.user_id as comment_user_id, commentaires.content_comment AS comment_content, users.username, likes.id as like_id, likes.user_id AS like_user_id, likes.liked, comment_user.username AS comment_username FROM posts LEFT JOIN users ON posts.user_id = users.id LEFT JOIN commentaires ON posts.id = commentaires.post_id LEFT JOIN likes ON posts.id = likes.post_id LEFT JOIN users AS comment_user ON commentaires.user_id = comment_user.id WHERE posts.id = ? ORDER BY commentaires.id DESC", req.params['postId'])
        .then((post) => {        
                const onePost = {
                    post_id : post[0].id,
                    post_user_id : post[0].post_user_id,
                    post_user_username : post[0].username,
                    post_title : post[0].title,
                    post_content : post[0].content_post,
                    imageUrl : post[0].imageUrl,
                    comments : [],
                    likes : []
                }                           
            post.forEach(rowData => {
                const oneComment = {
                    comment_id : rowData.comment_id,
                    comment_user_id : rowData.comment_user_id,
                    comment_content : rowData.comment_content,
                    comment_username : rowData.comment_username                  
                }
                /*si un commentaire a pour valeur null on ne le push pas*/
                if(!onePost.comments.find(comment => comment.comment_id == oneComment.comment_id)){
                    if(rowData.comment_id != null){
                        onePost.comments.push(oneComment)
                    }
                    
                }
            })
            post.forEach(rowData => {
                const oneLike = {
                    like_id : rowData.like_id,
                    like_user_id : rowData.like_user_id,
                    liked : rowData.liked
                }
                /*si un like a pour valeur null on ne le push pas*/
                if(!onePost.likes.find(like => like.like_id == oneLike.like_id)){
                    if(rowData.like_id !=null){
                        onePost.likes.push(oneLike)
                    }
                    
                }
            })            
            res.status(200).json(onePost);
            
        })
        .catch((error) => {
            res.status(400).json(error)
        });
}

exports.modifyPost = async (req, res) => {
    for (let post in req.body) req.body[post] = xss(req.body[post]);
    /*le post doit contenir au moins un titre et du texte*/
    try {
        /*si l'image est effacé et que le post ne contient pas de texte = erreur*/
        if(req.body.imgDeleted == "true" && req.body.updatedPostContent == ""){
            throw "La mise à jour du post ne contient aucun contenu"
        }
        /*si le post ne contient pas de titre*/
        if(!req.body.updatedPostTitle){
            throw "La mise à jour du post ne contient aucun titre"
        }
        /*requête SQL permettant de seléctionner les infos relative au post*/
        const row = (await connection.query("SELECT * FROM posts WHERE id = ?", [req.params["postId"]]))[0]
        /*si il y a un fichier dans la requête*/
        /*et si la base de donnée contient un url vers un ficher*/
        /*effacement du fichier dans le dossier images*/
        if(req.file && row.imageUrl != null){
            const filePath = row.imageUrl.replace("http://localhost:8081/images/", __dirname + "/../../images/");
            console.log(filePath)
            fs.unlinkSync(filePath);
        }
        let imageUrl = ""
        /*si il y a un fichier dans la requête*/
        if(req.file){
            imageUrl = "http://localhost:8081/images/" + req.file.filename;
        }
        /*si il y en a pas on garde l'url présent tel quel dans la bdd si le champ en contient déjà un*/
        else {
            imageUrl = row.imageUrl
        }
        connection
        .query("UPDATE posts SET title = ?, content_post = ?, imageUrl = ? WHERE id = ?", [req.body.updatedPostTitle, req.body.updatedPostContent, imageUrl, req.params['postId']])
        .then((modifiedPost) => {
            res.status(200).json(modifiedPost)
        })
        .catch((error) => {
            res.status(400).json(error);
        });
    }
    catch(error){
        res.status(400).json(error)
    }  
}

exports.deletePost = async (req, res, next) => {
    try {
        const row = (await connection.query("SELECT * FROM posts WHERE id = ?", [req.params["postId"]]))[0]
        if(row.imageUrl){
            const filePath = row.imageUrl.replace("http://localhost:8081/images/", __dirname + "/../../images/");
            fs.unlinkSync(filePath);
        }
        connection
        .query("DELETE FROM posts WHERE id = ?", [req.params["postId"]])
        .then((postDeleted) => {
            res.status(200).json(postDeleted);
        })
        .catch((error) => {
            console.log(error)
            res.status(400).json(error);
        });
    }
    catch (error) {
        res.status(400).json(error)
    }
    
}