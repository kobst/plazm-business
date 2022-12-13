import * as Yup from 'yup';
import error from '../../../../constants';
import moment from 'moment';

/*
 * @desc: validation schema for add event
 */
export const validate = {
  startDate: Yup.date()
      .required(error.REQUIRED)
      .test('', error.START_DATE_GREATER_THAN_CURRENT, (value) => {
        if (value > new Date(Date.now())) return true;
        return false;
      }),
  endDate: Yup.date()
      .required(error.REQUIRED)
      .when('startDate', (startDate, schema) => {
        return schema.test({
          test: (endDate) => {
            if (
              moment(startDate.toUTCString()).isAfter(
                  endDate.toUTCString(),
                  'day',
              ) &&
            !startDate > new Date(Date.now())
            ) {
              return false;
            }
            return true;
          },
          message: error.START_DATE_ERROR,
        });
      }),
  startTime: Yup.date().required(error.REQUIRED),
  endTime: Yup.date()
      .required(error.REQUIRED)
      .when('startTime', (startTime, schema) => {
        return schema.test({
          test: (endTime) => {
            if (startTime < endTime) return true;
            return false;
          },
          message: error.START_TIME_ERROR,
        });
      }),
};
