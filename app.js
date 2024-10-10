const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
var fs = require("fs");
var axios = require("axios");
var xml2js = require("xml2js");
var path = require("path");
const { upload } = require("./middlewares/multer");
const { XMLParser } = require("fast-xml-parser");
const { Part, Score, Identification, Encoding, Creator, Work } = require("./models/musicModel");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text({ type: "application/xml" }));
app.use(bodyParser.json());
dotenv.config();

app.use("/uploads", express.static("uploads"));

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
  app.post("/upload-xml", upload.single("file"), async (req, res) => {
    const filePath = 'https://res.cloudinary.com/dnwbsmjdi/raw/upload/v1725182805/BeetAnGeSample_xd8kad.xml';
  
    async function trimXML() {
      try {
        console.log("Fetching XML data from Cloudinary...");
  
        const response = await axios.get(filePath);
        if (response.status !== 200) {
          throw new Error(`Failed to fetch XML file. Status: ${response.status}`);
        }
  
        const xmlData = response.data;
        console.log("XML Data fetched successfully");
  
        const parser = new XMLParser({ ignoreAttributes: false });
        const sitemap = parser.parse(xmlData);
        // console.log("Parsed Sitemap:", sitemap);
  
        // Check if the necessary sections exist in the parsed XML
        if (!sitemap['score-partwise']) {
          console.log("The 'score-partwise' element is not found in the parsed object.");
          return res.status(400).json({ error: "'score-partwise' element is missing in XML." });
        }
  
        const scorePartwise = sitemap['score-partwise'];
  
        // Save the work
        const workData = {
          workNumber: scorePartwise.work?.['work-number'],
          workTitle: scorePartwise.work?.['work-title'],
        };
        const work = new Work(workData);
        const savedWork = await work.save();
  
        // Save creators if they exist
        const creators = scorePartwise.identification?.creator?.map(c => new Creator({ type: c['@_type'], name: c['#text'] })) || [];
        const savedCreators = await Creator.insertMany(creators);
  
        // Save encoding
        const encodingData = {
          software: scorePartwise.identification?.encoding?.software,
          encodingDate: scorePartwise.identification?.encoding?.['encoding-date'],
          supports: scorePartwise.identification?.encoding?.supports,
        };
        const encoding = new Encoding(encodingData);
        const savedEncoding = await encoding.save();
  
        // Save identification
        const identificationData = {
          creator: savedCreators.map(creator => creator._id),
          rights: scorePartwise.identification?.rights,
          encoding: savedEncoding._id,
        };
        const identification = new Identification(identificationData);
        const savedIdentification = await identification.save();
  
        // Save parts
        const parts = scorePartwise.part?.map(p => new Part({
          measure: p.measure, // adjust if necessary
          id: p['@_id'],
        })) || [];
        const savedParts = await Part.insertMany(parts);
  
        // Save score with references
        const scoreData = {
          work: savedWork._id,
          identification: savedIdentification._id,
          defaults: scorePartwise.defaults,
          credit: scorePartwise.credit,
          partList: scorePartwise['part-list'],
          parts: savedParts.map(part => part._id),
          version: scorePartwise['@_version'],
        };
        const score = new Score(scoreData);
        await score.save();
  
        console.log("Data saved to MongoDB successfully.");
        return res.status(201).json({ message: "Records processed and saved successfully" });
  
      } catch (err) {
        console.error("Error loading or parsing sitemap XML:", err);
        return res.status(500).json({ error: "Failed to process XML data", details: err.message });
      }
    }
  
    await trimXML(); // Wait for trimXML to complete before proceeding
  });
app.listen(PORT, () => console.log(`Server Up and Running on Port ${PORT}`));
