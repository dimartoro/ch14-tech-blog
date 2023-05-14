const router = require('express').Router();
const {User, Post, Comment} = require('../../models');
const { route } = require('./userRoutes');

router.get('/', async(req,res)=>{
    try{
       postData = await Post.findAll();
    //    return res.status(200).json(postData);
    const posts = postData.map((post) => post.get({ plain: true }));
       res.render('posts',{
        posts
       });
    }catch(err){
        res.status(400).json(err);
    }
});

router.post('/', async(req,res)=>{ 
    console.log("Userid: ", req.session.user_id);
    try{
        const postData = await Post.create({...req.body, created_by: req.session.user_id});
        res.status(200).json(postData);
    }catch(err){
        res.status(400).json(err);
    }
});

router.get('/:id', async(req, res)=>{
    console.log("******LLLL::::::",req.params.id);
    // try{
        const postData = await Post.findByPk(req.params.id,{
            include:{model:Comment},
            include:{model:User}
        });
        console.log('1post',postData);
        const post = postData.get({ plain: true });
        console.log('1post',post);
        return res.status(200).json(postData);
        res.render('post',{
            ...post,
            logged_in: req.session.logged_in
        });
    // }catch(err){
    //     res.status(400).json(err);
    // }    
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