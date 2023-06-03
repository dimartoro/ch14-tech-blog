const { Post } = require('../models');

const postData = 
  [
    {
      title: "AI and its implications on humanity",
      description: "AI could change humanity to a different level.",
      created_by: 4
    },
    {
      title: "What is Angular.",
      description: "Angular is a development platform, built on Typescript.",
      created_by: 5
    },
    {
      title: "Comparisons between Angular and React.",
      description: "It depends on your needs and the type of technology your company wants to go for.",
      created_by: 2
    }
  ]

const clearPosts = () => Post.destroy({ where: {} });
const seedPosts = () => Post.bulkCreate(postData);

module.exports = { clearPosts, seedPosts };
