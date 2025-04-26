import API from "./api"; // your pre-configured Axios instance

// ✅ Get all destinations
export const getAllDestinations = async () => {
  const res = await API.get("/user/destinations");
  return res.data;
};

// ✅ Get destination by ID
export const getDestinationById = async (id) => {
  const res = await API.get(`/user/destinations/${id}`);
  return res.data;
};

// ✅ Like a destination
export const likeDestination = async (destinationId, userId, token) => {
  try {
    // const user = JSON.parse(localStorage.getItem("user"));
    // const userId = user?._id || null; // Get userId if logged in

    // Send the userId along with the request body if the user is logged in
    const res = await API.post(
      `/user/destinations/like/${destinationId}`,
      { userId }, // Passing userId to the backend
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token if available
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Error liking destination:", err);
    throw new Error("Failed to like the destination.");
  }
};

// ✅ Comment on a destination
export const commentOnDestination = async (destinationId, comment, token) => {
  const res = await API.post(
    `/user/destinations/comment/${destinationId}`,
    { comment },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

// ✅ Reply to a destination comment
export const replyToDestinationComment = async (
  destinationId,
  commentId,
  replyText,
  token
) => {
  const res = await API.post(
    `/user/destinations/${destinationId}/comments/${commentId}/replies`,
    { text: replyText },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
export const fetchLatestDestinations = async () => {
  const res = await API.get("user/destinations/latest/destinations");
  return res.data;
};
