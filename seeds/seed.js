const sequelize = require('../config/connection');
const { clearUsers, seedUsers }= require('./userData');
const { clearPosts, seedPosts } = require('./postData');
const { clearComments, seedComments } = require('./commentData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await clearComments();

  await clearPosts();

  await clearUsers(); 
  
  await seedUsers();

  await seedPosts();

  await seedComments();

  process.exit(0);
};

seedAll();
