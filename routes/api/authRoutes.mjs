import express from "express";
import auth from "../../middleware/auth.mjs";
import User from "../../models/Users.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// @route:   GET api/auth
// @desc:    Auth route/Get user info if signed in
// @access:  Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

// @route:   POST api/auth
// @desc:    Login route
// @access:  Public
router.post(
  "/",
  [
    check("email", "Please include valid email").isEmail(),
    check("password", "Password required").not().isEmpty(),
  ],
  async (req, res) => {
    // Run our validation 'checks'  on the request body
    const errors = validationResult(req);

    // If there are errors, respond with errors
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    try {
      // Check if user is in database
      let user = await User.findOne({ email });

      // If user does not exist, return with error message
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      // Check if password enters matches the user's password, returns a boolean
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      // Create payload (data for the front end)
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 3600 }, // optional options object
        (err, token) => {
          if (err) throw err;

          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
  }
);
export default router;
