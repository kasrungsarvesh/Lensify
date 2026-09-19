import api from "./axios";

/**
 * Create a new order
 */
export const createOrder = async (orderData) => {
  const response = await api.post("/orders", orderData);
  return response.data;
};

/**
 * Get all orders
 */
export const getOrders = async ({
  page = 0,
  size = 10,
  sort = "orderId,desc",
  search = "",
} = {}) => {
  const response = await api.get("/orders", {
    params: {
      page,
      size,
      sort,
      ...(search ? { search } : {}),
    },
  });

  return response.data;
};

/**
 * Get order by ID
 */
export const getOrderById = async (orderId) => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
};

/**
 * Update order
 */
export const updateOrder = async (orderId, orderData) => {
  const response = await api.put(`/orders/${orderId}`, orderData);
  return response.data;
};

/**
 * Delete order
 */
export const deleteOrder = async (orderId) => {
  const response = await api.delete(`/orders/${orderId}`);
  return response.data;
};

export default {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
