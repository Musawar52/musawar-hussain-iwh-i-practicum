// // index.js
// const express = require("express");
// const bodyParser = require("body-parser");
// const axios = require("axios");
// require("dotenv").config();

// const app = express();
// const PORT = 3000;

// // Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.set("view engine", "pug");
// app.set("views", "./views");

// // ✅ 1. Homepage route
// app.get("/", (req, res) => {
//   res.send("Welcome to my HubSpot Custom Object Practicum!");
// });

// // ✅ 2. GET route → show form
// app.get("/update-cobj", (req, res) => {
//   res.render("updates"); // yeh pug file form show karegi
// });

// // ✅ 3. POST route → send data to HubSpot
// app.post("/update-cobj", async (req, res) => {
//   const { pet_name, type, breed } = req.body; // yeh fields form se aayengi

//   try {
//     const response = await axios.post(
//       `https://api.hubapi.com/crm/v3/objects/2-173494316`, // pets = aapka custom object
//       {
//         properties: {
//           pet_name: pet_name,
//           type: type,
//           breed: breed,
//         },
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`, // .env file se lega
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("Record created:", response.data);

//     // 👇 Redirect back to homepage after success
//     res.redirect("/");

//   } catch (error) {
//     console.error(error.response?.data || error.message);
//     res.send("Error creating record");
//   }
// });

// //     res.send(`Record created successfully: ${JSON.stringify(response.data)}`);
// //   } catch (error) {
// //     console.error(error.response ? error.response.data : error.message);
// //     res.send("Error creating record");
// //   }
// // });

// // Server run
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });








// index.js
// const express = require("express");
// const bodyParser = require("body-parser");
// const axios = require("axios");
// require("dotenv").config();

// const app = express();
// const PORT = 3000;

// // Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.set("view engine", "pug");
// app.set("views", "./views");

// // ✅ 1. Homepage route → list all custom object records
// app.get("/", async (req, res) => {
//   try {
//     const response = await axios.get(
//       "https://api.hubapi.com/crm/v3/objects/2-173494316?properties=pet_name,type,breed",
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const pets = response.data.results || [];

//     res.render("homepage", {
//       title: "Homepage | HubSpot Practicum",
//       pets: pets,
//     });
//   } catch (error) {
//     console.error(error.response?.data || error.message);
//     res.send("Error fetching records");
//   }
// });

// // ✅ 2. GET route → show form
// app.get("/update-cobj", (req, res) => {
//   res.render("updates", {
//     title: "Update Custom Object Form | Integrating With HubSpot I Practicum",
//   });
// });

// // ✅ 3. POST route → create new record
// app.post("/update-cobj", async (req, res) => {
//   const { pet_name, type, breed } = req.body;

//   try {
//     await axios.post(
//       "https://api.hubapi.com/crm/v3/objects/2-173494316", // ✅ custom object type
//       {
//         properties: {
//           pet_name: pet_name,
//           type: type,
//           breed: breed,
//         },
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("✅ Record created successfully");

//     // Redirect back to homepage
//     res.redirect("/");
//   } catch (error) {
//     console.error(error.response?.data || error.message);
//     res.send("Error creating record");
//   }
// });

// // ✅ Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });






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

