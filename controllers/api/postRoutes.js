const router = require('express').Router();
const {User, Post, Comment} = require('../../models');
const { route } = require('./userRoutes');

router.get('/', async(req,res)=>{
    try{
       postData = await Post.findAll({include:[{model:User,attributes:['name']}]});
    const posts = postData.map((post) => post.get({ plain: true }));
       res.render('posts',{
        posts,
        logged_in: req.session.logged_in
       });
    }catch(err){
        res.status(400).json(err);
    }
});

router.put('/:id', async(req,res)=>{
    try{
        const postData = await Post.update({
            description:req.body.description},
            {where:{id:req.params.id}}
        )
        res.status(200).json(postData);
    }catch(err){
        res.status(400).json(err);
    }
});

router.post('/', async(req,res)=>{ 
    try{
        const postData = await Post.create({...req.body, created_by: req.session.user_id});
        res.status(200).json(postData);
    }catch(err){
        res.status(400).json(err);
    }
});

router.get('/:id/comment', async(req,res)=>{
    try{
        const postData = await Post.findByPk(req.params.id,{
        include:[{model:User,attributes:['name']}]
        });
        const post = postData.get({plain:true});
        res.render('comment',{
            ...post,
            logged_in: req.session.logged_in,
            logged_user_name: req.session.user_name,
            logged_user_id: req.session.user_id
        });
    }catch(err){
        res.status(400).json(err);
    }
});

router.get('/:id', async(req, res)=>{
    try{
        const postData = await Post.findByPk(req.params.id,{
            include:[
                {model:User},
                {model:Comment,
                    include:{model:User
                    , attributes:['name']
                    },
                }
            ]
        });
        const post = postData.get({ plain: true });
        res.render('post',{
            ...post,
            logged_in: req.session.logged_in,
            logged_user_id: req.session.user_id
        });
    }catch(err){
        res.status(400).json(err);
    }    
});

router.delete('/:id', async(req, res)=>{
    try{
        const postData = await Post.destroy({
            where:{
                id: req.params.id,
            },
        });
        return res.status(200).json(postData);
    } catch(err) {
        res.status(400).json(err);
    }
});

module.exports = router;