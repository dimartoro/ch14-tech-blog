const router = require('express').Router();
//const { comment } = require('postcss');
const {Comment} = require('../../models');

router.get('/', async (req,res)=>{
    res.render('comment');
});

router.post('/', async(req,res)=>{
        const commentData = await Comment.create(req.body);
        res.status(200).json(commentData);
    }
);

module.exports = router;