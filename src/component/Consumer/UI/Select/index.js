import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import selectarrow from '../../../../images/SelectArrow.svg';

const SelectStyled = styled.select`
  border: 0;
  color: #000;
  font-size: 10px;
  font-weight: 400;
  height: 26px;
  margin: 0 0 10px;
  padding: 0 10px;
  width: 100%;
  background: url(${selectarrow}) no-repeat right 10px center #FCFCFC;
  appearance: none;
  border-radius: 2px;
  font-family: Montserrat;
  font-weight: 600;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: #666;
    font-weight: 400;
  }
`;

const Select = (props) => <SelectStyled {...props}>{props.children}</SelectStyled>;

Select.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
};

export default Select;
