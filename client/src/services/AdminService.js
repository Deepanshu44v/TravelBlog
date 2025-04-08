import API from "./api"; // your pre-configured Axios instance

export const getAllUsers = async () => {
  const res = await API.get("/admin");
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await API.delete(`/admin/${id}`);
  return res.data;
};

export const updateUserRole = async (id, role) => {
  const res = await API.put(`/admin/${id}/role`, { role });
  return res.data;
};
export const getDashboardStats = async () => {
  const res = await API.get("/admin/dashboard-stats");
  return res.data;
};