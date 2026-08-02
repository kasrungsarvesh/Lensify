import * as yup from "yup";

export const customerSchema = yup.object({

  fullName: yup
    .string()
    .required("Customer name is required")
    .min(3, "Minimum 3 characters")
    .max(100, "Maximum 100 characters")
    .matches(/^[A-Za-z ]+$/, "Only letters are allowed"),

  gender: yup
    .string()
    .required("Please select gender"),

  dob: yup
    .date()
    .required("Date of birth is required")
    .max(new Date(), "Future date is not allowed"),

  age: yup
    .number()
    .typeError("Age must be a number")
    .required("Age is required")
    .min(1)
    .max(120),

  phone: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[6-9][0-9]{9}$/, "Invalid mobile number"),

  alternatePhone: yup
    .string()
    .nullable()
    .test(
      "alternatePhone",
      "Alternate mobile number must be 10 digits",
      (value) => !value || /^[6-9][0-9]{9}$/.test(value)
    ),

  email: yup
    .string()
    .email("Invalid email")
    .nullable(),

  address: yup
    .string()
    .required("Address is required")
    .min(5),

  city: yup
    .string()
    .required("City is required"),

  referenceBy: yup
    .string()
    .nullable()

});