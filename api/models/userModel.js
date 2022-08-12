const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "email address is required"],
    unique: true,
    validate: {
      validator: function (val) {
        return validator.isEmail(val);
      },
      message: "please input a valid email address",
    },
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// userSchema.methods.comparePassword = async function (
//   providedPassword,
//   candidatePassword
// ) {
//   return await bcrypt.compare(providedPassword, candidatePassword);
// };
module.exports = mongoose.model("user", userSchema);
