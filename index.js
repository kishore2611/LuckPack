import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import fs from 'fs/promises'; // Uncomment and use fs/promises if needed
import path from "path";
import { fileURLToPath } from "url";  // Import necessary utilities to use __dirname
import cron from "node-cron";
import xml2js from "xml2js";
import * as Tone from "tone"; // Uncomment if you use Tone.js
import MusicRecord from "./models/musicModel.js";
// import apiRoutes from "./routes/api.js"; // Uncomment and adjust with correct paths
// import Content from "./models/contentModel.js"; // Uncomment and adjust with correct paths
const { upload } = require("./middlewares/multer");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text({ type: 'application/xml' }));
app.use(bodyParser.json());
dotenv.config();

const PORT = process.env.PORT || 3056;

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB_CONNECT, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // useCreateIndex: true,
  })
  .then((data) =>
    console.log(`MongoDB connected with server: ${data.connection.host}`)
  )
  .catch((err) => {
    console.log(err);
  });

// API endpoint to upload XML data

const playMusic = async () => {
  try {
    // Start the Tone.js context
    await Tone.start();

    // Create a new Synth instance and connect it to the audio context
    const synth = new Tone.Synth().toDestination();

    // Trigger a note
    synth.triggerAttackRelease("C4", "8n");
  } catch (error) {
    console.error('Error with Tone.js:', error);
  }
};

// Call the function to play the music
// playMusic();
app.post("/upload-xml", upload.single('file'), (req, res) => {
  const xmlData = req.body;
  console.log('xmlData :>> ', xmlData);
  const parser = new xml2js.Parser({ explicitArray: false });

  parser.parseString(xmlData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to parse XML" });
    }

    // Assuming XML structure has a root element with child elements representing records
    const musicRecords = result.records.record.map((record) => ({
      title: record.title,
      artist: record.artist,
      album: record.album,
      genre: record.genre,
      year: parseInt(record.year, 10),
      melody: record.melody, // assuming the XML file contains a melody field
    }));

    console.log('musicRecords :>> ', musicRecords);

    // If you want to generate or manipulate sound using Tone.js:
    // Tone.start().then(() => {
    //   const synth = new Tone.Synth().toDestination();

    //   musicRecords.forEach((record) => {
    //     if (record.melody) {
    //       synth.triggerAttackRelease(record.melody, "8n"); // Example usage
    //     }
    //   });

    //   MusicRecord.insertMany(musicRecords)
    //     .then(() => res.status(201).json({ message: "Records saved successfully" }))
    //     .catch((saveErr) =>
    //       res.status(500).json({ error: "Failed to save records", details: saveErr })
    //     );
    // }).catch((audioErr) =>{
    //   console.log(audioErr, "Audio")
    //   res.status(500).json({ error: "Failed to start Tone.js", details: audioErr })
    // }
    // );
  });
});

app.post('/set-audio-param', async (req, res) => {
  try {
    const { frequency, envelope, volume } = req.body;

    // Ensure Tone.js context is started
    await Tone.start();

    // Create a Synth and configure it
    const synth = new Tone.Synth().toDestination();

    // Set frequency
    synth.set({ frequency });

    // Configure envelope
    synth.envelope.attack = envelope.attack;
    synth.envelope.decay = envelope.decay;
    synth.envelope.sustain = envelope.sustain;
    synth.envelope.release = envelope.release;

    // Set volume (using Tone.js Volume component)
    volume = new Tone.Volume(volume).toDestination();

    // Trigger a note for demonstration
    synth.triggerAttackRelease('C4', '8n');

    res.status(200).json({ message: 'Audio parameters set successfully' });
  } catch (error) {
    console.error('Error setting audio parameters:', error);
    res.status(500).json({ error: 'Failed to set audio parameters' });
  }
});

/** Content seeder */
// const contentSeeder = [
//   {
//     title: "Privacy Policy",
//     content:
//       "Lorem ipsum dolor sit amet.Ea iste consectetur qui harum libero exercitationem harum et quam earum At cupiditate perferendis qui aspernatur vero!",
//     type: "privacy_policy",
//   },
//   {
//     title: "Terms and Conditions",
//     content:
//       "Lorem ipsum dolor sit amet.Ea iste consectetur qui harum libero exercitationem harum et quam earum At cupiditate perferendis qui aspernatur vero!",
//     type: "terms_and_conditions",
//   },
// ];
// var abc;
// const dbSeed = async () => {
//   const d = await Content.find({ type: "privacy_policy" });
//   if (d.length > 1 || d.length < 1) {
//     await Content.deleteMany({ type: "privacy_policy" });
//     await Content.insertMany(contentSeeder[0]);
//   }

//   const e = await Content.find({ type: "terms_and_conditions" });
//   if (e.length > 1 || e.length < 1) {
//     await Content.deleteMany({ type: "terms_and_conditions" });
//     await Content.insertMany(contentSeeder[1]);
//   }

//   abc = await Content.find();
// };
// dbSeed();

// app.set("views", "./views");
// app.set("view engine", "pug");
// app.get("/privacy_policy*", (req, res, next) => {
//   res.render("index", {
//     title: "Privacy Policy",
//     heading: "Privacy Policy",
//     paragraph: abc[0].content,
//   });
// });
// app.get("/terms_and_conditions*", (req, res, next) => {
//   res.render("index", {
//     title: "Terms And Conditions",
//     heading: "Terms And Conditions",
//     paragraph: abc[1].content,
//   });
// });

// Use ES Modules for static file serving
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.use(express.static(path.join(__dirname, "build")));
// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

app.listen(PORT, () => console.log(`Server Up and Running on Port ${PORT}`));

// Adjust export for ES Modules
// export { dbSeed }; // Uncomment if you want to export the dbSeed function
