import api from "./axios";

export const login = (loginData) => {
  return api.post("/auth/login", loginData);
};
