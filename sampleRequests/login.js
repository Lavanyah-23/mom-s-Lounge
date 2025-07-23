const axios = require("axios");
const { PORT } = require("../config/constants");

async function loginExample() {
  try {
    const response = await axios.post(`http://localhost:4000/auth/login`, {
      email: "testwithaxios2@test.com",
      password: "testwithaxios1234"
    });
    console.log("RESPONSE FROM SERVER", response.data);
  } catch (error) {
    console.log("OH NO AN ERROR", error.message);
    console.log("WHAT HAPPENED?", error.response.data);
  }
}

loginExample();
