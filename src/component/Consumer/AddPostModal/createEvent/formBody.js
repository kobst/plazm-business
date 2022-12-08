import React, {useEffect} from 'react';
import styled from 'styled-components';
import {MentionsInput, Mention} from 'react-mentions';
import {useDispatch, useSelector} from 'react-redux';
import Input from '../../UI/FormikInput';
// import TextArea from "../../UI/formikTextArea";
import {findAllUsers} from '../../../../reducers/consumerReducer';
import {findAllLists} from '../../../../reducers/listReducer';

const InputContainer = styled.div`
  border: 1px solid ${(props) => (props.usererror ? '#FF7171' : '#ffffff')};
  min-height: 60px;
  font-size: 16px;
  line-height: 21px;
  width: 100%;
  padding: 6px 8px;
  margin: 0 0 20px;
  background: #ffffff;
  box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04);
  border-radius: 0px;
  display: flex;
  flex-direction: column;
  .postInput_model__suggestions {
    background-color: #fe02b9 !important;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 2px;
    padding: 15px;
    height: auto;
    max-height: 150px;
    overflow: auto;
    overflow-x: hidden;
    ul {
      margin: 0 0 5px;
      padding: 0;
      li {
        color: #fff;
        font-size: 10px;
        font-weight: 500;
        margin: 0 0 5px;
        padding: 0;
      }
    }
  }
  .postInput_model {
    min-height: 100px;
    font-weight: 500;
    color: #000;
    margin: 0 0 14px;
    border: 0;
    height: 60px;
    font-size: 16px;
    line-height: normal;
    width: 100%;
    padding: 10px;
    background: #ffffff;
    box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04);
    border-radius: 2px;
    resize: none;
    font-size: 12px;
    font-family: Montserrat;
    :focus {
      outline: none;
    }
    ::placeholder {
      color: #c6c6c6;
    }
  }
  textarea {
    border: none;
    font-size: 16px !important;
    font-weight: bold;
    color: black;
    padding: 10px 0 0 0;
  }
`;

const LabelText = styled.label`
  text-transform: capitalize;
  color: #7f75bf;
  line-height: normal;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 11px;

  &::after {
    content: "*";
  }
`;

const ErrorDiv = styled.div`
  color: #ff0000;
  font-weight: 600;
  font-size: 11px;
  margin: 0;
`;

/*
 *@desc: form body for create event
 */
function FormBody({
  loader,
  setResponse,
  setEventDescription,
  setEventTitle,
  formik,
  mentionArrayList,
  setMentionArrayList,
  mentionArrayUser,
  setMentionArrayUser,
}) {
  const users = useSelector((state) => state.consumer.users);
  const lists = useSelector((state) => state.list.lists);
  const allData = [...users, ...lists];
  const data = allData.sort(function(a, b) {
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
  });
  const userMentionData = data.map((myUser) => ({
    id: myUser._id,
    display: `${myUser.name}`,
  }));
  const dispatch = useDispatch();

  /** to fetch tagging data */
  useEffect(() => {
    const fetchTaggingData = async () => {
      if (users.length === 0) await dispatch(findAllUsers());
      if (lists.length === 0) await dispatch(findAllLists());
    };
    fetchTaggingData();
  }, [dispatch, lists.length, users.length]);

  /** set form input value */
  const setValue = (e, field) => {
    if (field === 'title') setEventTitle(e.target.value);
    else setEventDescription(e.target.value);
    formik.setFieldValue(field, e.target.value);
  };
  /*
   * @desc: handle change function called on post input change
   */
  const handleChange = async (event, newValue, newPlainTextValue, mentions) => {
    if (mentions.length !== 0) {
      /** to find if the mention is of users or lists */
      const findUser = users.find((i) => i._id === mentions[0].id);
      const findList = lists.find((i) => i._id === mentions[0].id);
      if (findUser) {
        /** if mention is of user add it into user's mention array */
        const valueArr = mentionArrayUser;
        valueArr.push(mentions[0].id);
        setMentionArrayUser(valueArr);
      } else if (findList) {
        /** if mention is of list then add into list's mention array  */
        const valueArr = mentionArrayList;
        valueArr.push(mentions[0].id);
        setMentionArrayList(valueArr);
      }
    }
    setEventDescription(newPlainTextValue);
    formik.setFieldValue('description', newPlainTextValue);
  };
  return (
    <>
      <InputContainer>
        <LabelText>Add Title</LabelText>
        <Input
          type="text"
          name="title"
          disabled={loader}
          onChange={(e) => setValue(e, 'title')}
          onFocus={() => setResponse('')}
        />
      </InputContainer>
      <InputContainer>
        <LabelText>Add Description</LabelText>
        <MentionsInput
          markup="@(__id__)[__display__]"
          value={formik.values.description}
          onChange={handleChange}
          className="postInput_model"
          placeholder=""
          // disabled={loader}
        >
          <Mention
            type="user"
            trigger="@"
            data={userMentionData}
            className="mentions__mention"
            appendSpaceOnAdd={true}
          />
        </MentionsInput>
        {formik.errors && formik.errors.description !== '' ? (
          <ErrorDiv>{formik.errors.description}</ErrorDiv>
        ) : null}
        {/* <TextArea
          type="text"
          name="description"
          disabled={loader}
          onChange={(e) => setValue(e, "description")}
          onFocus={() => setResponse("")}
        /> */}
      </InputContainer>
    </>
  );
}
export default FormBody;
