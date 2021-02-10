import * as Yup from "yup";
import error from "../../../constants";

/*
 * @desc: validation schema for update curator profile
 */
export const validate = {
  name: Yup.string()
    .min(3, error.MINIMUM_NAME_LENGTH)
    .max(100, error.MAXIMUM_NAME_LENGTH)
    .required(error.REQUIRED),
  phoneNumber: Yup.string()
    .min(5, error.MINIMUM_PHONE_NUMBER_LENGTH)
    .max(50, error.MAXIMUM_PHONE_NUMBER_LENGTH)
    .matches(/^[+]{1}\d[0-9]*$/,error.PHONE_NUMBER_FORMAT)
    .required(error.REQUIRED),
  email: Yup.string().email(error.EMAIL_ERROR).required(error.REQUIRED),
};
