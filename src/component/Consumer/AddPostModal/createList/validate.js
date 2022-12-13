import * as Yup from 'yup';
import error from '../../../../constants';

/*
 * @desc: validation schema for create a list
 */
export const validate = {
  title: Yup.string()
      .trim()
      .min(3, error.MINIMUM_TITLE_LENGTH)
      .max(255, error.MAXIMUM_TITLE_LENGTH)
      .required(error.REQUIRED),
  description: Yup.string()
      .trim()
      .min(3, error.MINIMUM_DESCRIPTION_LENGTH)
      .max(500, error.MAXIMUM_DESCRIPTION_LENGTH)
      .required(error.REQUIRED),
};
