import { MenuModel } from "../models/menu.js";
import { validateMenu } from "../validations/chefValidations.js";

export const addMenuItems = async (req, res) => {
  try {
    const { description, image, name, price, availability, category } =
      req.body;
    const { data, success } = validateMenu({
      description,
      image,
      availability,
      name,
      category,
      price,
    });
    if (success) {
      const alreadyPresent = await MenuModel.findOne({ name: data.name });
      if (alreadyPresent) {
        return res.status(400).json({
          error: "menu item already exist",
        });
      }
      const item = await MenuModel.create(data);

      return res.status(201).json({
        data: item,
        message: "item added successfully",
      });
    } else {
      return res.json({
        error: "Validation failed",
      });
    }
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMenu = await MenuModel.findByIdAndDelete(id);

    if (deletedMenu) {
      return res.status(201).json({
        data: id,
        message: "item deleted successfully",
      });
    }
    return res.json({
      error: "deltetion failed",
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

export const getMenuItems = async (req, res) => {
  const items = await MenuModel.find();
  return res.status(200).json({
    data: items,
    message: "items fetched successfully",
  });
};

export const toggleAvailability = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedMenu = await MenuModel.findByIdAndUpdate(
      id,
      [
        {
          $set: {
            availability: {
              $cond: {
                if: { $eq: ["$availability", "available"] },
                then: "unavailable",
                else: "available",
              },
            },
          },
        },
      ],
      { new: true }
    );
    return res.status(200).json({
      data: updatedMenu.availability,
      message: "availability updated successfully",
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};
