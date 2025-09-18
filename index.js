
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

// ✅ Homepage - GET all records
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.hubapi.com/crm/v3/objects/2-173494316?properties=pet_name,type,breed", // 👈 apna objectTypeId yahan lagao
      {
        headers: {
          Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const records = response.data.results;
    res.render("homepage", {
      title: "Custom Object Records",
      records,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.send("Error fetching records");
  }
});

// ✅ GET route → show form
app.get("/update-cobj", (req, res) => {
  res.render("updates", { title: "Update Custom Object Form | Practicum" });
});

// ✅ POST route → create record
app.post("/update-cobj", async (req, res) => {
  const { pet_name, type, breed } = req.body;

  try {
    await axios.post(
      "https://api.hubapi.com/crm/v3/objects/2-173494316", // 👈 apna objectTypeId lagao
      {
        properties: {
          pet_name,
          type,
          breed,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.redirect("/"); // 👈 record create hone ke baad homepage pe redirect
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.send("Error creating record");
  }
});

// Server run
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

