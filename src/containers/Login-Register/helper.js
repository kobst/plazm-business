import {getMessage} from '../../config';

const renderMessage = getMessage();

export const validatePassword = ({password, confirmPassword}) => {
  const errors = {};

  if (!password) {
    errors.password = 'Password is required';
  }
  if (!confirmPassword) {
    errors.confirmPassword = 'Confirm Password is required';
  }

  if (password && confirmPassword) {
    if (password !== confirmPassword) errors.password = renderMessage.Pass_Err;
    if (password.length <= 7 && confirmPassword.length <= 7) {
      errors.password = renderMessage.pass_length;
    }
  }

  return errors;
};

export const validateEmail = (email) => {
  const errors = {};

  if (!email) {
    errors.email = 'Email is required';
  }
  if (email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())) {
      errors.email = 'Email is Invalid';
    }
  }
  return errors;
};
