import api from "./axios";

// Get all prescriptions
export const getAllPrescriptions = (params = {}) => {
  return api.get("/prescriptions", {
    params: {
      page: params.page ?? 0,
      size: params.size ?? 50,
      sort: params.sort ?? "prescriptionId,desc",
      search: params.search || undefined,
    },
  });
};

// Get prescription by ID
export const getPrescriptionById = (id) => {
  return api.get(`/prescriptions/${id}`);
};
// Get Prescription Count By Customer
export const getPrescriptionCountByCustomer = (customerId) => {
  return api.get(`/prescriptions/customer/${customerId}/count`);
};
export const getPrescriptionsByCustomer = (customerId) => {
  return api.get(`/prescriptions/customer/${customerId}`);
};
// Create prescription
export const createPrescription = (prescription) => {
  return api.post("/prescriptions", prescription);
};

// Update prescription
export const updatePrescription = (id, prescription) => {
  return api.put(`/prescriptions/${id}`, prescription);
};

// Delete prescription
export const deletePrescription = (id) => {
  return api.delete(`/prescriptions/${id}`);
};
