import React, { useState } from "react";
import Mentions from "rc-mentions";
import Option from "rc-mentions";
import { findSelectedUsers } from "../../reducers/consumerReducer";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import  profileImg  from "../../images/profile-img.png";
import "./style.css";
const Test = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const onSearch = (search) => {
    setSearch(search);
    setLoading(!!search);
    setUsers([]);
    loadGithubUsers(search);
  };

  const loadGithubUsers = async (key) => {
    if (!key) {
      setUsers([]);
      return;
    }

    const data = await dispatch(findSelectedUsers(search));
    const res = await unwrapResult(data);
    if (res) {
      setUsers(res);
      setLoading(false);
    }
  };
  return (
    <>
      <div>
        <Mentions
          onSearch={onSearch}
          style={{ width: "50%" }}
          autoFocus
          onSelect={(data) => console.log(data.key)}
          onChange={(value)=>console.log('value',value)}
        >
          {loading ? (
            <Option value={search} disabled>
              Searching {`'${search}'`}...
            </Option>
          ) : (
            users.map(({ name, photo,_id }) => (
             <Option key={_id} value={name} className="dynamic-option">
                <img
                  src={photo!==null ? (photo !== ""&&photo!=="sample" ? photo : profileImg) : profileImg}
                  alt="image"
                />
                <span>{name}</span>
              </Option>
            ))
          )}
        </Mentions>
        search: <code>{search}</code>
      </div>
    </>
  );
};
export default Test;
