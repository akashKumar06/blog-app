import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiSuccess from "../utils/ApiSuccess.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

async function registerUser(req, res) {
  try {
    const { username, fullname, email, phoneNo, password } = req.body;
    if (
      [username, fullname, email, phoneNo, password].some(
        (field) => !field || field?.trim() === ""
      )
    ) {
      throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existedUser) {
      throw new ApiError(400, "User with email or username already exists");
    }

    const { avatar, coverImage } = req.files;
    let avatarUrl = "";
    let coverImageUrl = "";
    if (avatar) {
      const res = await uploadOnCloudinary(avatar[0].path);
      avatarUrl = res.url;
    }

    if (coverImage) {
      const res = await uploadOnCloudinary(coverImage[0].path);
      coverImageUrl = res.url;
    }

    const user = await User.create({
      username,
      fullname,
      email,
      password,
      phoneNo,
      avatar: avatarUrl,
      coverImage: coverImageUrl,
    });

    if (!user) {
      throw new ApiError(400, "User cannot be created.");
    }
    return res
      .status(201)
      .json(new ApiSuccess(201, "User created successfully.", user));
  } catch (error) {
    console.log(error);
    return res
      .status(error?.statusCode || 500)
      .json(new ApiError(error?.statusCode, error?.message));
  }
}

async function login(req, res) {
  try {
    const { email, username, password } = req.body;
    console.log(email, username);
    if (!email || !password)
      throw new ApiError(400, "Email or Username required.");

    if (!password) {
      throw new ApiError(400, "Password is required.");
    }

    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) throw new ApiError(400, "User not exists.");

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid credentials.");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    return res
      .status(200)
      .cookie("token", accessToken)
      .json(new ApiSuccess(200, "User successfully logged in."));
  } catch (error) {
    return res
      .status(error?.statusCode || 500)
      .json(new ApiError(400, error?.message));
  }
}

export { registerUser, login };
