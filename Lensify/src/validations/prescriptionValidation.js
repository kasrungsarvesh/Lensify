import * as yup from "yup";

const emptyToNull = (value, originalValue) => {
  if (
    originalValue === "" ||
    originalValue === null ||
    originalValue === undefined
  ) {
    return null;
  }

  return value;
};

const optionalNumber = (message) =>
  yup.number().transform(emptyToNull).nullable().typeError(message);

export const prescriptionSchema = yup.object({
  /* =========================
     CUSTOMER
     ========================= */

  customerId: yup.string().required("Customer is required."),

  /* =========================
     PRESCRIPTION DATE
     ========================= */

  prescriptionDate: yup.string().required("Prescription date is required."),

  /* =========================
     DOCTOR
     ========================= */

  doctorName: yup
    .string()
    .trim()
    .max(100, "Doctor name cannot exceed 100 characters.")
    .nullable(),

  /* =========================
     RIGHT EYE - SPHERE
     ========================= */

  rightEyeSph: yup
    .number()
    .transform(emptyToNull)
    .nullable()
    .required("Right eye SPH is required.")
    .typeError("Right eye SPH must be a number.")
    .min(-30, "Right eye SPH cannot be below -30.00.")
    .max(30, "Right eye SPH cannot be above +30.00."),

  /* =========================
     RIGHT EYE - CYLINDER
     ========================= */

  rightEyeCyl: optionalNumber("Right eye CYL must be a number.")
    .min(-15, "Right eye CYL cannot be below -15.00.")
    .max(15, "Right eye CYL cannot be above +15.00."),

  /* =========================
     RIGHT EYE - AXIS
     ========================= */

  rightEyeAxis: yup
    .number()
    .transform(emptyToNull)
    .nullable()
    .typeError("Right eye AXIS must be a number.")
    .min(0, "Right eye AXIS must be between 0 and 180.")
    .max(180, "Right eye AXIS must be between 0 and 180.")
    .when("rightEyeCyl", {
      is: (value) => value !== null && value !== undefined && value !== "",
      then: (schema) =>
        schema.required("Right eye AXIS is required when CYL is entered."),
    }),

  /* =========================
     RIGHT EYE - VA
     ========================= */

  rightEyeVa: yup
    .string()
    .trim()
    .max(20, "Right eye VA is too long.")
    .nullable(),

  /* =========================
     LEFT EYE - SPHERE
     ========================= */

  leftEyeSph: yup
    .number()
    .transform(emptyToNull)
    .nullable()
    .required("Left eye SPH is required.")
    .typeError("Left eye SPH must be a number.")
    .min(-30, "Left eye SPH cannot be below -30.00.")
    .max(30, "Left eye SPH cannot be above +30.00."),

  /* =========================
     LEFT EYE - CYLINDER
     ========================= */

  leftEyeCyl: optionalNumber("Left eye CYL must be a number.")
    .min(-15, "Left eye CYL cannot be below -15.00.")
    .max(15, "Left eye CYL cannot be above +15.00."),

  /* =========================
     LEFT EYE - AXIS
     ========================= */

  leftEyeAxis: yup
    .number()
    .transform(emptyToNull)
    .nullable()
    .typeError("Left eye AXIS must be a number.")
    .min(0, "Left eye AXIS must be between 0 and 180.")
    .max(180, "Left eye AXIS must be between 0 and 180.")
    .when("leftEyeCyl", {
      is: (value) => value !== null && value !== undefined && value !== "",
      then: (schema) =>
        schema.required("Left eye AXIS is required when CYL is entered."),
    }),

  /* =========================
     LEFT EYE - VA
     ========================= */

  leftEyeVa: yup.string().trim().max(20, "Left eye VA is too long.").nullable(),

  /* =========================
     PD DISTANCE
     ========================= */

  pdDistance: yup
    .number()
    .transform(emptyToNull)
    .nullable()
    .required("PD Distance is required.")
    .typeError("PD Distance must be a number.")
    .min(40, "PD Distance should be at least 40 mm.")
    .max(80, "PD Distance should not exceed 80 mm."),

  /* =========================
     PD NEAR
     ========================= */

  pdNear: yup
    .number()
    .transform(emptyToNull)
    .nullable()
    .typeError("PD Near must be a number.")
    .min(35, "PD Near should be at least 35 mm.")
    .max(80, "PD Near should not exceed 80 mm.")
    .test(
      "near-less-than-distance",
      "PD Near should not be greater than PD Distance.",
      function (value) {
        if (value === null || value === undefined) {
          return true;
        }

        const { pdDistance } = this.parent;

        if (
          pdDistance === null ||
          pdDistance === undefined ||
          pdDistance === ""
        ) {
          return true;
        }

        return Number(value) <= Number(pdDistance);
      },
    ),

  /* =========================
     LENS TYPE
     ========================= */

  lensType: yup.string().nullable(),

  /* =========================
     LENS INDEX
     ========================= */

  lensIndex: yup.string().nullable(),

  /* =========================
     COATING
     ========================= */

  coating: yup.string().nullable(),

  /* =========================
     REMARKS
     ========================= */

  remarks: yup
    .string()
    .trim()
    .max(500, "Remarks cannot exceed 500 characters.")
    .nullable(),
});
