const { Router } = require("express");
const { TICK_CHAR } = require("sequelize/types/lib/utils");
const Story = require("../models/").Story

const router = new Router();

router.get("/stories", async (req, res, next) => {
    try {
      const allStories = await Story.findAll()
      console.log()
      }
  
     
     catch (error) {
     
    }
  });
  






module.exports = router;
