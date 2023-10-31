const {User }= require("../models");

module.exports.createUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({
      where: { phone_number: req.body.phone_number },
    });

    if (existingUser) {
      // User with the same phone_number already exists
      return res
        .status(400)
        .json({ error: "User with this phone number already exists." });
    }
    // if not exist create new user
    const user = await User.create(req.body);

    res.status(201).json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports.generateOTP = async (req, res) => {
  try {
    // Check if the user exists
    const existingUser = await User.findOne({
      where: { phone_number: req.body.phone_number },
    });

    if (!existingUser) {
      return res
        .status(400)
        .json({ error: "User with this phone number does not exist." });
    }

    // Generate a 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000);

    // Get the current date
    const currentDate = new Date();

    // Add 5 minutes to the current date
    currentDate.setMinutes(currentDate.getMinutes() + 5);

    // Update user's OTP and OTP expiration date
    const updatedUser = await User.update(
      { otp: otp, otp_expiration_date: currentDate },
      { where: { phone_number: req.body.phone_number } }
    );

    // Return the user's ID and generated OTP
    res.status(201).json({ userId: existingUser.id });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.verifyOTP = async (req, res) => {
  try {
    // Find the user by their id
    const user = await User.findOne({
      where: { id: req.params.user_id },
    });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    // Check if the OTP is correct
    let otp = parseInt(req.query.otp);
    const userOTP = parseInt(user.otp);

    if (userOTP !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }
    // Check if the OTP has expired
    const currentDate = new Date();
    if (currentDate > user.otp_expiration_date) {
      return res.status(400).json({ error: "OTP expired" });
    }
    // Update the user's OTP and OTP expiration date
    const updatedUser = await User.update(
      { otp: null, otp_expiration_date: null },
      { where: { id: req.params.user_id } }
    );
    // Return the user's details
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
