import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: [true, "User display name is required"],
  },
  email: {
    type: String,
    unique: [true, "Email address already exists"],
    required: [true, "User email is required"],
    validate: {
      validator: function (v) {
        return /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone email`,
    },
  },
  password: {
    type: String,
    required: [true, "User password is required"],
    minLength: [6, "Password must be at least 6 characters long"],
    maxLength: [12, "Password must be less than 12 characters long"],
  },
  token: String,
});

export const Users = mongoose.model("Users", userSchema);
