import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js";
async function isAuthenticated(req, res, next) {
  try {
    const accessToken = req.cookies?.accessToken;
    if (!accessToken) {
      throw new ApiError(401, "Unauthorized request.");
    }

    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(error?.statusCode || 500)
      .json(new ApiError(400, error?.message));
  }
}

async function isAuthorized(req, res, next) {
  try {
    const postId = req.params.id;
    if (!postId) throw new ApiError(400, "Not a valid post.");
    const userId = req.user._id;
    if (!userId) throw new ApiError(400, "Not a valid user.");
    const user = await User.findById(userId);
    const isPostCreatedByUser = user.isPostPresent(postId);
    if (!isPostCreatedByUser)
      throw new ApiError(401, "Not authorized to delete.");
    next();
  } catch (error) {
    return res
      .status(error?.statusCode || 500)
      .json(new ApiError(400, error?.message));
  }
}
export { isAuthenticated, isAuthorized };
