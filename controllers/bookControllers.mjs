import Book from "../models/Books.mjs";

// Create
async function createBook(req, res) {
  try {
    // Create a new produce object
    let newBook = new Book(req.body);

    // Save new object to DB
    await newBook.save();

    // Return result
    res.json({ newBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: `Server Error` });
  }
}

export default { createBook };
