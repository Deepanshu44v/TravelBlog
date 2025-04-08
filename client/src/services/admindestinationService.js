import API from './api';

// ✅ Create Destination
export const createDestination = async (destinationData) => {
  const formData = new FormData();
  formData.append('name', destinationData.name);
  formData.append('description', destinationData.description);
  formData.append('category', destinationData.category);
  formData.append('image', destinationData.image);

  const response = await API.post('/admin/destinations', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

// ✅ Get All Destinations
export const getAllDestinations = async () => {
  const response = await API.get('/admin/destinations');
  return response.data;
};

// ✅ Get Destination By ID
export const getDestinationById = async (destinationId) => {
  const response = await API.get(`/admin/destinations/${destinationId}`);
  return response.data;
};

// ✅ Update Destination
export const updateDestination = async (id, data, isFormData = false) => {
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      ...(isFormData
        ? { 'Content-Type': 'multipart/form-data' }
        : { 'Content-Type': 'application/json' }),
    },
  };

  const response = await API.put(`/admin/destinations/${id}`, data, config);
  return response.data;
};

// ✅ Delete Destination
export const deleteDestination = async (destinationId) => {
  const response = await API.delete(`/admin/destinations/${destinationId}`);
  return response.data;
};

// ✅ Delete Comment From Destination
export const deleteDestinationComment = async (destinationId, commentId, token) => {
  const response = await API.delete(`/admin/destinations/${destinationId}/${commentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// ✅ Reply to Comment
export const replyToDestinationComment = async (destinationId, commentId, replyText, token) => {
  const response = await API.post(
    `/admin/destinations/reply/${destinationId}/${commentId}`,
    { text: replyText },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
