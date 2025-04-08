import API from './api';


export const createBlog = async (blogData) => {
    const formData = new FormData();
    formData.append('title', blogData.title);
    formData.append('description', blogData.description);
    formData.append('category', blogData.category);
    formData.append('image', blogData.image);
    
    const response = await API.post('/admin/blogs', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    
    return response.data;
};
export const getAllBlogs = async () => {
  const response = await API.get('/admin/blogs');
  return response.data;
};
export const deleteBlogComment = async (blogId, commentId, token) => {
  const res = await API.delete(`/admin/blogs/${blogId}/${commentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
export const updateBlog = async (id, data, isFormData = false) => {
    const token = localStorage.getItem("token");
  
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        ...(isFormData
          ? { "Content-Type": "multipart/form-data" }
          : { "Content-Type": "application/json" }),
      },
    };
  
    const response = await API.put(`/admin/blogs/${id}`, data, config);
    return response.data;
  };

export const deleteBlog = async (blogId) => {
  const response = await API.delete(`/admin/blogs/${blogId}`);
  return response.data;
};
export const getBlogById = async (blogId) => {
  const response = await API.get(`/admin/blogs/${blogId}`);
  return response.data;
};
export const replyToComment = async (blogId, commentId, replyText, token) => {
  const response = await API.post(
    `/admin/blogs/reply/${blogId}/${commentId}`,
    { text: replyText },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};