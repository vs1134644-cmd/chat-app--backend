import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const authSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

authSchema.pre("save", async function () {
  const count = await model("Auth").countDocuments({
    email: this.email,
  });

  if (count > 0) {
    throw new Error("Email already exists");
  }
});

authSchema.pre("save", async function () {
  const encryptedPassword = await bcrypt.hash(this.password.toString(), 12);

  this.password = encryptedPassword;
});

const AuthModel = model("Auth", authSchema);

export default AuthModel;
