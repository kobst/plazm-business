import * as Yup from 'yup';
import error from '../../../../constants';

/*
 * @desc: validation schema for add event
 */
export const validate = {
  title: Yup.string()
    .trim()
    .min(5, error.MINIMUM_EVENT_TITLE_LENGTH)
    .max(255, error.MAXIMUM_TITLE_LENGTH)
    .required(error.REQUIRED),
  description: Yup.string()
    .trim()
    .min(5, error.MINIMUM_EVENT_DESCRIPTION_LENGTH)
    .max(1000, error.MAXIMUM_EVENT_DESCRIPTION_LENGTH)
    .required(error.REQUIRED),
};
