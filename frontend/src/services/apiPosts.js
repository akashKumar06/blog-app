import conf from "../config/conf";

class PostService {
  apiurl = "";
  constructor() {
    this.apiurl = `${conf.apiEndPoint}/posts`;
  }

  async createPost(post) {
    console.log(post);
  }
  async deletePost(id) {
    console.log(id);
  }
  async updatePost(id, newPost) {
    console.log(id, newPost);
  }
  async getPost(id) {
    console.log(id);
  }
  async getPosts() {
    // only those posts that have active status
  }
}

const postService = new PostService();

export default postService;
