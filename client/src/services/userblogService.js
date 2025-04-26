import API from './api'; // your pre-configured Axios instance

export const getAllBlogs = async () => {
  const res = await API.get('/user/blogs');
  return res.data;
};

export const getBlogById = async (id) => {
  const res = await API.get(`/user/blogs/${id}`);
  return res.data;
};
// Like a blog
export const likeBlog = async (blogId, userId) => {
  try {
    // Assuming API is an axios instance or similar HTTP client
    // console.log(userId)
    // const userId = localStorage.getItem('user')?.id || null;
    const res = await API.post(`/user/blogs/like/${blogId}`, { userId });
    return res.data;
  } catch (err) {
    console.error("Error liking blog:", err);
    // Optionally, rethrow the error or handle it as needed
    // throw new Error("Failed to like the blog.");
  }
};

// Comment on a blog
export const commentOnBlog = async (blogId, comment, token) => {
  const res = await API.post(`/user/blogs/comment/${blogId}`, { comment }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};

// import API from "./api";

export const replyToComment = async (blogId, commentId, replyText, token) => {
  const res = await API.post(
    `/user/blogs/${blogId}/comments/${commentId}/replies`,
    { text: replyText },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}
export const fetchLatestBlogs = async () => {
  const res = await API.get("/user/blogs/latest/blogs");
  return res.data;
};

