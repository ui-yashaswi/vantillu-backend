import BookCateringModel from "../models/catering.js";
import { BookEventModel } from "../models/events.js";
import { bookCateringValidation } from "../validations/cateringValidations.js";
import bookEventValidation from "../validations/eventValidations.js";

export const bookEvent = async (req, res) => {
  console.log(req.body);
  const { fullName, time, contact, location, eventDate, people, message } =
    req.body;
  const { success, data, error } = bookEventValidation.safeParse({
    fullName,
    time,
    contact,
    location,
    eventDate,
    people,
    message,
  });
  if (!success) {
    return res.json({
      error,
    });
  }

  const event = await BookEventModel.create({
    fullName,
    time,
    contact,
    location,
    eventDate,
    people,
    message,
  });
  res.json({
    data: event,
    message: "Event booked successfully",
  });
};
export const bookCatering = async (req, res) => {
  const { fullName, email, contact, message } = req.body;

  const { success, data, error } = bookCateringValidation.safeParse({
    fullName,
    contact,
    email,
    message,
  });
  if (!success) {
    return res.json({
      error,
    });
  }

  const catering = await BookCateringModel.create(data);
  res.json({
    data: catering,
    message: "Catering booked successfully",
  });
};

export const fetchCaterings = async (req, res) => {
  const caterings = await BookCateringModel.find();

  return res.json({
    message: "caterings fetched ",
    data: caterings,
  });
};

export const fetchEvents = async (req, res) => {
  const events = await BookEventModel.find();

  return res.json({
    message: "events fetched ",
    data: events,
  });
};
