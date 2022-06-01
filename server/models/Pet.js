const { Schema, model } = require("mongoose");

const petSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  petName: {
    type: String,
    trim: true,
    default: null,
  },
  petType: {
    // what type they picked axiotl, cat, parrot etc
    type: String,
    default: null,
  },
  lastFed: {
    /* Could use to calculate how long it has been since last feeding and adjust the pets hunger and thirst. On login pass username of logged in user to a function which calculates how much hunger, thirst etc the pet has lost. Then modifies the users pet before its stats are rendered.  Modify this when pet is fed*/
    type: Date,
  },
  hunger: {
    type: Number,
  },
  thirst: {
    type: Number,
  },
  affection: {
    type: Number,
  },
  imgName: {
    type: String,
  },
});

const Pet = model("Pet", petSchema);

module.exports = Pet;
