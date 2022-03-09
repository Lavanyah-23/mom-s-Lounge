const { Router } = require("express");
const Story = require("../models/").story;
const Category = require("../models").category;

const router = new Router();

router.get("/", async (req, res) => {
  try {
    const allStories = await Story.findAll();
    console.log("All stories", allStories);
    res.send(allStories);
  } catch (error) {
    console.log("No stories related to your search", error);
    res.status(500).send("something went wrong");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = request.params.id;
    console.log("id is", id);

    const story = await Story.findByPk(id);
    console.log("story", story);
  
    if (!story) {
      res.status(404).send("No story was found");
    } else {
      res.status(200).send(story);
    }
  } catch (e) {
    res.status(500).send("Internal error");
  }
});

router.post("/mystory", async (req, res) => {
  const { title = "", imageUrl = "", description } = req.body;
  const userId = req.user.id;
  console.log({ userId });
  try {
    await artwork.create({ title, imageUrl, description, userId });
    res.send({
      message: "story posted successfully",
      status: 200,
      data: null,
    });
  } catch (err) {
    res.status(500).send({
      message: `error while posting story, ${err}`,
      data: null,
      status: 500,
    });
  }
});

module.exports = router;
