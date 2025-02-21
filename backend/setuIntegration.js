const axios = require("axios");

const generateToken = async () => {
  try {
    const response = await axios.post(
      "https://sandbox.setu.co/api/v2/auth/token",
      {
        clientId: "1df40648-0fbf-426e-9fca-bad7a801f9d3", // Replace with actual client_id
        clientSecret: "5VLsnbVOJrhAc2F5xUahV36Lp3QGJIw7", // Replace with actual client_secret
      }
    );

    return response.data.accessToken; // Return the token
  } catch (error) {
    console.error("Error generating token:", error.response.data);
    throw new Error("Token generation failed");
  }
};

module.exports = { generateToken };
