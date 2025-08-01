const axios = require("axios");
const { PORT } = require("../config/constants");

async function signUpExample() {
  try {
    const response = await axios.post(`http://127.0.0.1:${PORT}/auth/signup`, {
      // NOTE: If you run this example more than once
      // you will have to change this email (emails must be unique)
      email: "testwithaxios2@test.com",
      password: "testwithaxios1234",
      name: "testwithaxios"
    });
    console.log("RESPONSE FROM SERVER", response.data);
  } catch (error) {
    console.log("OH NO AN ERROR", error.message);
    console.log("WHAT HAPPENED?", error.response?.data);
  }
}

signUpExample();
