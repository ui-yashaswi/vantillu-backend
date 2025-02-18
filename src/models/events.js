import mongoose from "mongoose";

const bookEventSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    time: { type: String, required: true },
    contact: { type: String, required: true },
    location: { type: String, required: true },
    eventDate: { type: Date, required: true },
    people: { type: Number, required: true },
    message: { type: String, required: false },
  },
  { timestamps: true }
);

export const BookEventModel = mongoose.model("BookEvent", bookEventSchema);
