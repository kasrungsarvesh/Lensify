import { toast } from "react-toastify";

const toastOptions = {
  position: "top-right",
  autoClose: 2500,
  hideProgressBar: false,
  newestOnTop: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
};

export const successToast = (message) => {
  toast.success(message, toastOptions);
};

export const errorToast = (message) => {
  toast.error(message, toastOptions);
};

export const warningToast = (message) => {
  toast.warning(message, toastOptions);
};

export const infoToast = (message) => {
  toast.info(message, toastOptions);
};