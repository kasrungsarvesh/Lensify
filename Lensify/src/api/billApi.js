import api from "./axios";

// ============================================================
// CREATE BILL
// ============================================================

export const createBill = (billData) => {
  return api.post("/bills", billData);
};

// ============================================================
// GENERATE BILL FROM ORDER
// ============================================================

export const generateBillFromOrder = (orderId) => {
  return api.post(`/bills/generate-from-order/${orderId}`);
};

// ============================================================
// GET ALL BILLS
// ============================================================

export const getAllBills = (params = {}) => {
  return api.get("/bills", {
    params: {
      page: params.page ?? 0,
      size: params.size ?? 10,
      sort: params.sort ?? "billId,desc",
      search: params.search || undefined,
    },
  });
};

// ============================================================
// GET BILL BY ID
// ============================================================

export const getBillById = (billId) => {
  return api.get(`/bills/${billId}`);
};

// ============================================================
// UPDATE BILL
// ============================================================

export const updateBill = (billId, billData) => {
  return api.put(`/bills/${billId}`, billData);
};

// ============================================================
// DELETE BILL
// ============================================================

export const deleteBill = (billId) => {
  return api.delete(`/bills/${billId}`);
};