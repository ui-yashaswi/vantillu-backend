import mongoose, { Schema } from "mongoose";

const BookCateringSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, match: /.+\@.+\..+/ },
  contact: { type: String, required: true, match: /^\d{10}$/ },
  message: { type: String },
});

const BookCateringModel = mongoose.model("BookCatering", BookCateringSchema);

export default BookCateringModel;
