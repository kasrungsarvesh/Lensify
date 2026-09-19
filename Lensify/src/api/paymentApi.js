import api from "./axios";

/**
 * Create a payment for a bill
 *
 * Backend automatically calculates:
 * PENDING
 * PARTIAL
 * PAID
 *
 * Do NOT send status from frontend.
 */
export const createPayment = async (paymentData) => {
  const response = await api.post("/payments", paymentData);
  return response.data;
};

/**
 * Get all payments
 */
export const getPayments = async () => {
  const response = await api.get("/payments");
  return response.data;
};

/**
 * Get payment by ID
 */
export const getPaymentById = async (paymentId) => {
  const response = await api.get(`/payments/${paymentId}`);
  return response.data;
};

/**
 * Get all payments for a specific bill
 */
export const getPaymentsByBill = async (billId) => {
  const response = await api.get(`/payments/bill/${billId}`);
  return response.data;
};

/**
 * Update payment
 */
export const updatePayment = async (paymentId, paymentData) => {
  const response = await api.put(`/payments/${paymentId}`, paymentData);
  return response.data;
};

/**
 * Delete payment
 */
export const deletePayment = async (paymentId) => {
  const response = await api.delete(`/payments/${paymentId}`);
  return response.data;
};

export default {
  createPayment,
  getPayments,
  getPaymentById,
  getPaymentsByBill,
  updatePayment,
  deletePayment,
};
