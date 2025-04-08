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
export const likeBlog = async (blogId, token) => {
  const res = await API.post(`/user/blogs/like/${blogId}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
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

