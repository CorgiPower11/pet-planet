const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");


// Password regex 8 to 30 characters, containe >0 uppercase, >0 lowercase, >0 digits and >0 of [!,$, %, #]
// pwRegex = "^(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,30}$";
// Separate Model for Quiz stats and associate it to the user ID - Makes it more scalable
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must match an email address!"],
    },
    password: {
      type: String,
      required: true,
      /*match: [
        pwRegex,
        "Passwords have a minimum length of eight, maximum length of thrity and must contain at least one lowercase letter, uppercase letter and digit",
      ],*/
      minlength: [8, "Password must be a minimum of eight characters."],
    },
    // Need to ask TA on this to verify syntax
    stats: 
      {
        type: Schema.Types.ObjectId, // Store ObjectId of users Stat instance
        ref: "Stat",
        default: null,
      },
    pet: [
      {
        type: Schema.Types.ObjectId, // Store ObjectId of users Pet instance
        ref: "Pet",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
