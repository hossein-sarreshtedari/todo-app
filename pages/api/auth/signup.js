import connectDB from "@/utils/ConnectDB";
import User from "@/Models/User";
import { hashPassword } from "@/utils/auth";

async function handler(req, res) {
  if (req.method !== "POST") return;

  try {
    await connectDB();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: false, message: "Error in connecting to DB" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({
      status: false,
      message: "Invalid data",
    });
  }

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return res
      .status(422)
      .json({ status: false, message: "User exists already!" });
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await User.create({ email: email, password: hashedPassword });
  console.log(newUser);

  res.status(201).json({ status: true, message: "Created user!" });
}

export default handler;