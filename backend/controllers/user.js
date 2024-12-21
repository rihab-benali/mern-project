import user from "../models/User.js";

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await user.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateduser);
  } catch (err) {
    next(err);
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    await user.findByIdAndDelete(req.params.id);
    res.status(200).json("user has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getOneUser = async (req, res, next) => {
  try {
    const user = await user.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
export const getAllUsers = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  console.log("Query parameters received:", req.query); // Log the query params

  try {
    const users = await user.find({
      ...others,
    });
    console.log("Filtered users:", users); // Log the users
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
