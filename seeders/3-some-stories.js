'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "stories",
      [
        {
          
          title: "My Big Day",
          imageUrl: null,
          description:"The day my Hero came to this world and a mother inside me is born!",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
         categoryId:1
        },
        {
          
          title: "My first kid",
          imageUrl: null,
          description:"My first kid is my baby boy who is % months old. He is greatest thing happend to me in a really long time. My Arjun is world to me i will do anything for him. He deserves all good things in this world !",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 2,
          categoryId:2
        },
        {
          
          title: "My Pregnancy journey",
          imageUrl: null,
          description:"Its roller coaster Ride !! Started with Excitement(I am Pregnant Yay!!), Faced many hurdles in between like GestationalDiabetes, Back Pain, Nausea(to state few butthere are many more).Climax 1.5 days contarctions Epidural vomitings, I remember puking a lot! Ended with absolute Bliss! that look my baby gave for the first time is really something that i can never forget in my life!!",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
          categoryId:3
        },
        {
          
          title: "My Toddler",
          imageUrl: null,
          description:"Toddlers are fun to watch and hard to manage for any mother. It feels great to see that they are growing really well and then they show their other side by being cranky stubborn and super annoying sometimes. we love this phase a lot!!!",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 2,
          categoryId:5
        },
        {
          
          title: "My Teenager",
          imageUrl: null,
          description:"wel well well Teenage is super exciting to everyone! This is the right age to learn things(Good/Bad). ",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
          categoryId:4
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("stories", null, {});
  },
};
