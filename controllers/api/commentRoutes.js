const router = require('express').Router();
const { comment } = require('postcss');
const {User,Post,Comment} = require('../../models');

router.get('/', async (req,res)=>{
    res.render('comment');
});

router.post('/', async(req,res)=>{
        console.log("CCCCOOOMMMMENNNNTTTT****", req.body);
        const commentData = await Comment.create(req.body);
        res.status(200).json(commentData);
    }
);

module.exports = router;