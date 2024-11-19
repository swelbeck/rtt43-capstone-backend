import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  readingList: [
    {
      bookId: { type: mongoose.Schema.Types.ObjectId, ref: "book" },
      status: {
        type: String,
        enum: ["want to read", "currently reading", "finished"],
        default: "want to read",
      },
    },
  ],
});

const User = mongoose.model("user", UserSchema);

export default User;
