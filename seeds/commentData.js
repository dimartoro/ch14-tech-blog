const { Comment } = require('../models');

const commentData = 
  [
    {
        post_id: 1,
        description: "I think AI will destroy humanity.",
        created_by: 5
    },
    {
        post_id: 1,
        description: "I think AI is the best thing that could happen to humanity.",
        created_by: 3,
    },
    {
        post_id: 2,
        description: "I love Angular, and I think it will only grow in the coming years.",
        created_by: 6
    },
    {
        post_id: 2,
        description: "I wonder if Angular is not another framework that will just go away in a few years.",
        created_by: 4
    },
    {
        post_id: 3,
        description: "I prefer knockout.",
        created_by: 1
    }
  ]

  
const clearComments = () => Comment.destroy({ where: {} });
const seedComments = () => Comment.bulkCreate(commentData);

module.exports = {clearComments, seedComments};
