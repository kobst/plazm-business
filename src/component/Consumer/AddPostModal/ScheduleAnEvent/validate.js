import * as Yup from "yup";
import error from "../../../../constants";

/*
 * @desc: validation schema for add event
 */
export const validate = {
  startTime: Yup.date().required(error.REQUIRED),
  endTime: Yup.date().required(error.REQUIRED).when("startTime", (startTime, schema) => {
    return schema.test({
      test: (endTime) => {
        if (startTime < endTime) return true;
        return false;
      },
      message: error.START_TIME_ERROR,
    });
  }),
};
