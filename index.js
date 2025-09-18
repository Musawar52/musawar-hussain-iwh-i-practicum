// index.js
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "pug");
app.set("views", "./views");

// ✅ 1. Homepage route
app.get("/", (req, res) => {
  res.send("Welcome to my HubSpot Custom Object Practicum!");
});

// ✅ 2. GET route → show form
app.get("/update-cobj", (req, res) => {
  res.render("updates"); // yeh pug file form show karegi
});

// ✅ 3. POST route → send data to HubSpot
app.post("/update-cobj", async (req, res) => {
  const { pet_name, type, breed } = req.body; // yeh fields form se aayengi

  try {
    const response = await axios.post(
      `https://api.hubapi.com/crm/v3/objects/2-173494316`, // pets = aapka custom object
      {
        properties: {
          pet_name: pet_name,
          type: type,
          breed: breed,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`, // .env file se lega
          "Content-Type": "application/json",
        },
      }
    );

    res.send(`Record created successfully: ${JSON.stringify(response.data)}`);
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.send("Error creating record");
  }
});

// Server run
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
