import React, { useState, useRef, useEffect } from 'react'
import styled from "styled-components"
import Checkbox from '../../../../UI/Checkbox'
import DropdwonArrowTop from '../../../../../../images/top_arrow.png'
import { Formik } from "formik"
import { FaSort } from "react-icons/fa"

const PostFilterContent = styled.div`
    width:100%;
    position: relative;
    display:flex;
    padding: 12px;
    background: #221e45;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid #ff2e9a;
    justify-content: space-between;
    align-items: center;
    @media (max-width:767px){
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }
`
const CheckboxWrap = styled.div`
    display:flex;
    padding: 0;
    flex-direction: row;
    font-size: 13px;
    font-weight: 500;
    position: relative;
    .container .checkmark:after {
    left: 4px;
    top: 1px;
    width: 4px;
    height: 8px;
    border: solid white;
    border-width: 0 1px 1px 0;
    }
    .container input:checked ~ .checkmark {
        background-color: transparent;
    }
    @media (max-width:767px){
        margin: 0 0 5px;
    }
    svg {
        cursor: pointer;
    }
`
const DropdownContent = styled.div`
  display: flex;
  position: absolute;
  min-width: 102px;
  overflow: auto;
  background: #FE02B9;
  box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.3);
  z-index: 1;
  top: 25px;
  width: 30px;
  overflow: visible;
  right: -5px;
  padding: 5px;
  :before {
    background: url(${DropdwonArrowTop}) no-repeat top center;
    width: 15px;
    height: 15px;
    content: ' ';
    top: -12px;
    position: relative;
    margin: 0 auto;
    display: flex;
    text-align: center;
    left: 78px;
  }
  @media (max-width: 767px) {
    top: 76px;
  }
  ul {
    list-style: none;
    margin: 0 0 0 -15px;
    padding: 0;
    width: 100%;
    text-align: right;
  }
  li {
    color: #fff;
    padding: 0px 5px;
    text-decoration: none;
    font-size: 12px;
  }
  li:hover {
    background-color: #FE02B9;
    cursor: pointer;
  }
`

const PostFilter = ({}) => {
    const [uploadMenu, setUploadMenu] = useState(false)
    const menuRef = useRef(null)
    
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
          document.removeEventListener('mousedown', handleClickOutside)
        }
      }, [])
    
      const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setUploadMenu(false)
        }
      }
    
      const toggleUploadMenu = () => {
        setUploadMenu(!uploadMenu)
      }

      const handleRemovePhoto = (e) => {
        e.stopPropagation()
      }

    return (
    <>
    <PostFilterContent>
        <CheckboxWrap>
            <Formik initialValues={{}}>{(formik) => <Checkbox />}</Formik>Business
        </CheckboxWrap>
        <CheckboxWrap>
            <Formik initialValues={{}}>{(formik) => <Checkbox />}</Formik>Posts By Me
        </CheckboxWrap>
        <CheckboxWrap>
            <Formik initialValues={{}}>{(formik) => <Checkbox />}</Formik>My Subscriptions
        </CheckboxWrap>
        <CheckboxWrap>
            <Formik initialValues={{}}>{(formik) => <Checkbox />}</Formik>Others
        </CheckboxWrap>
        <CheckboxWrap ref={menuRef}>
            <FaSort onClick={toggleUploadMenu} />
            {uploadMenu && (
              <DropdownContent>
                <ul>
                    <li>Most Liked</li>
                  
                    <li>Most recent</li>
                  
                </ul>
              </DropdownContent>
            )}
        </CheckboxWrap>
    </PostFilterContent>
    </>
    )
}
  
  export default PostFilter