const { Router } = require("express");
const Story = require("../models/").story;
const Category = require("../models").category;
const Comment = require("../models").comment;
const authMiddleware = require("../auth/middleware");

const router = new Router();

router.get("/", async (req, res) => {
  try {
    const allStories = await Story.findAll({ include: [Comment] });
    console.log("All stories", allStories);
    res.send(allStories);
  } catch (error) {
    console.log("No stories related to your search", error);
    res.status(500).send("something went wrong");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("id is", id);

    const storyDetail = await Story.findByPk(id);
    console.log("story", storyDetail);

    if (!storyDetail) {
      res.status(404).send("No story was found");
    } else {
      res.status(200).send(storyDetail);
    }
  } catch (e) {
    res.status(500).send("Internal error");
  }
});

router.post("/", authMiddleware, async (req, res) => {
  const { title = "", imageUrl = "", description } = req.body;
  const userId = req.user.id;
  console.log({ userId });
  try {
    const newStory = await Story.create({
      title,
      imageUrl,
      description,
      userId,
    });
    res.send({
      message: "story posted successfully",
      status: 200,
      data: newStory,
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

router.put("/:id", authMiddleware, async (req, res) => {
  const story = await Story.findByPk(req.params.id);
  if (!story.userId === req.user.id) {
    return res
      .status(403)
      .send({ message: "You are not authorized to update this story" });
  }

  const { title, description, imageUrl } = req.body;
  try {
    await story.update({ title, description, imageUrl });
    return res.status(200).send(story);
  } catch (e) {
    res.status(500).send({ message: "something went wrong" });
  }
});
