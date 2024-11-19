import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: [{ type: String, required: true }],
  description: { type: String },
  coverImageUrl: { type: String },
  publishedDate: { type: String },
  genre: [{ type: String }],
});

const Book = mongoose.model("book", BookSchema);

export default Book;
