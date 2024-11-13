import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiSuccess from "../utils/ApiSuccess.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

async function createPost(req, res) {
  try {
    const { title, content, slug } = req.body;
    if (!title || !slug || !content)
      throw new ApiError(400, "All fields are required.");

    if (!req.file) throw new ApiError(400, "featured image required.");
    const featuredImageLocalPath = req.file?.path;
    const resFromCloudinary = await uploadOnCloudinary(featuredImageLocalPath);
    const post = await Post.create({
      title,
      slug,
      content,
      featuredImage: resFromCloudinary.url,
      userId: req.user._id,
    });

    const user = await User.findById(req.user._id);
    user.posts.push(post._id);
    await user.save();

    return res
      .status(200)
      .json(new ApiSuccess(200, "New post created successfully.", { post }));
  } catch (error) {
    return res
      .status(error?.statusCode || 500)
      .json(new ApiError(400, error?.message));
  }
}

async function deletePost(req, res) {
  try {
    const postId = req.params.id;
    if (!postId) throw new ApiError(400, "Not a valid post.");
    await Post.findByIdAndDelete(postId);
    const user = await User.findById(req.user._id);
    user.posts = user.posts.filter((id) => id !== postId);
    await user.save();
    return res
      .status(200)
      .json(new ApiSuccess(200, "Post deleted successfully."));
  } catch (error) {
    return res
      .status(error?.statusCode || 500)
      .json(new ApiError(400, error?.message));
  }
}
export { createPost, deletePost };
