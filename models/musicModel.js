const mongoose = require('mongoose');

// Work Schema and Model
const WorkSchema = new mongoose.Schema({
  workNumber: String,
  workTitle: String,
});

const Work = mongoose.model('Work', WorkSchema);

// Creator Schema and Model
const CreatorSchema = new mongoose.Schema({
  type: String,
  name: String,
});

const Creator = mongoose.model('Creator', CreatorSchema);

// Encoding Schema and Model
const EncodingSchema = new mongoose.Schema({
  software: String,
  encodingDate: String,
  supports: [String],
});

const Encoding = mongoose.model('Encoding', EncodingSchema);

// Identification Schema and Model
const IdentificationSchema = new mongoose.Schema({
  creator: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Creator' }],
  rights: String,
  encoding: { type: mongoose.Schema.Types.ObjectId, ref: 'Encoding' },
});

const Identification = mongoose.model('Identification', IdentificationSchema);

// Part Schema and Model
const PartSchema = new mongoose.Schema({
  measure: [String], // Adjust based on actual data structure
  id: String,
});

const Part = mongoose.model('Part', PartSchema);

// Score Schema and Model with references
const ScoreSchema = new mongoose.Schema({
  work: { type: mongoose.Schema.Types.ObjectId, ref: 'Work' },
  identification: { type: mongoose.Schema.Types.ObjectId, ref: 'Identification' },
  defaults: Object, // Can be refined into another schema if needed
  credit: [Object], // Adjust this schema if more details are needed
  partList: Object,
  parts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Part' }],
  version: String,
});

const Score = mongoose.model('Score', ScoreSchema);


module.exports = { Work, Creator, Encoding, Identification, Part, Score };