const { User } = require('../models');

const userData =
  [
    {
      name: "Eliana",
      email: "eliana@hotmail.com",
      password: "pass1234"
    },
    {
      name: "Diana",
      email: "diana@gmail.com",
      password: "pass1234"
    },
    {
      name: "Maloco",
      email: "malocoelloco@aol.com",
      password: "pass1234"
    },
    {
      name: "Kacarotto",
      email: "kacarotto@yahoo.com",
      password: "pass1234"
    },
    {
      name: "Yacoda",
      email: "yacoda@someplace.com",
      password: "pass1234"
    },
    {
      name: "Rosa Maria Erica Tatiana",
      email: "rosamaria@fbi.gov",
      password: "pass1234"
    }
  ]

const clearUsers = () => User.destroy({  where: {} });
const seedUsers = () => User.bulkCreate(userData, {individualHooks: true});


module.exports = { clearUsers, seedUsers };
