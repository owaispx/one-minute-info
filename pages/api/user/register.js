import bcrypt from "bcrypt"
import User from "../../../models/usermodel";
import connectdb from "../../../utils/conndb";
import messagehandler from "../../../utils/features";
import  jwt  from "jsonwebtoken";

const handler = async (req, res) => {
  if (req.method !== "POST")
    return messagehandler(res, 400, "Only POST Method is allowed");

  try {
    const { firstname, lastname, email, password } = req.body;

    if (firstname === "" && lastname === "" && email === "" && password === "") {
      return messagehandler(res, 400, "All Credentials Required!");
    }

    await connectdb();
    let user = await User.findOne({ email });
    console.log (user)

    if (user) {
      return messagehandler(res, 400, "User already Exists");
    }

    const passCrypt = await bcrypt.hash(password, 10);
    user = await User.create({
      firstname,
      lastname,
      email,
      password: passCrypt,
    });
    if (user) {
      const token = await jwt.sign({_id : user._id} , "zamasekretkey")
      res.status(201).json({ message: "User Created Succesfully", user , token});
    }
  } catch (error) {
    console.log(error);
    messagehandler(res, 500, "Server Error");
  }
};

export default handler;