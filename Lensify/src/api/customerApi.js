import api from "./axios";

// Get All Customers
export const getAllCustomers = () => {
  return api.get("/customer");
};

// Get Customer By Id
export const getCustomerById = (id) => {
  return api.get(`/customer/${id}`);
};

// Search Customers
export const searchCustomers = (keyword) => {
  return api.get("/customer/search", {
    params: {
      keyword: keyword,
    },
  });
};
// Add Customer
export const addCustomer = (customer) => {
  return api.post("/customer", customer);
};

// Update Customer
export const updateCustomer = (id, customer) => {
  return api.put(`/customer/${id}`, customer);
};

// Delete Customer
export const deleteCustomer = (id) => {
  return api.delete(`/customer/${id}`);
};
