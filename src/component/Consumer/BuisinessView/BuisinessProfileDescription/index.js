import React,{useState} from "react";
import styled from "styled-components"
import { IoMdClose } from "react-icons/io";
import { FaTwitter, FaFacebookF, FaInstagramSquare, FaLinkedinIn, FaBehance, FaDeviantart } from "react-icons/fa";


const BuisinessViewContent = styled.div`
    width:100%;
    position: relative;
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
`
const BuisinessShortDesp = styled.p`
    color: #fff;
    font-weight: 500;
    font-size: 13px;
    line-height: normal;
    margin: 0 0 15px;
`
const HeadingDesp = styled.div`
    color: #FF2E9A;
    font-weight: normal;
    font-size: 15px;
    line-height: normal;
    margin: 0 0 8px;
    padding: 0 0 5px 0;
    border-bottom: 1px solid #FF2E9A;
`

const Address = styled.div`
    color: #fff;
    font-weight: 500;
    font-size: 13px;
    line-height: normal;
    margin: 0 0 3px;
`
const CommonWrap = styled.div`
    margin: 0 0 15px;
`
const PhoneNumberDiv = styled.div`
    color: #fff;
    font-weight: 500;
    font-size: 13px;
    line-height: normal;
    margin: 0 0 3px;
    display: flex;
    align-items:center;
    justify-content: flex-start;
    @media (max-width:767px){
        justify-content: flex-start;
        align-items: flex-start;
        flex-direction: column;
    }
`
const CircleDot = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  margin: 0 10px;
  background: #fff;
  @media (max-width:767px){
    margin: 1px 0;
    visibility: hidden;
  }
`
const WeekDays = styled.div`
    color: #fff;
    font-weight: 500;
    font-size: 13px;
    line-height: normal;
    margin: 0 0 10px;
    span{
        font-weight: 700;
    }
`
const WeekEndDays = styled.div`
    color: #FF434B;
    font-weight: 500;
    font-size: 13px;
    line-height: normal;
    margin: 0 0 10px;
    span{
        font-weight: 700;
    }
`
const HastagsWrap = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

const Hastags = styled.div`
    color: #000;
    font-weight: 400;
    font-size: 12px;
    line-height: normal;
    margin: 0 5px 10px 0;
    background: #F7F7F7;
    border: 0.5px dashed #000000;
    box-sizing: border-box;
    border-radius: 28px;
    padding:4px 15px;
`

const SocialDivWrap = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 15px 0 0;
`

const SocialInput = styled.div`
    color: #FF2E9A;
    font-weight: 600;
    font-size: 12px;
    line-height: normal;
    margin: 0 0 10px 0;
    background: transparent;
    border: 1px solid #FF2E9A;
    box-sizing: border-box;
    padding:3px 5px;
    max-width: 232px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 29px;
    @media (max-width:767px){
        max-width: 100%;
    }
    svg {
        font-size: 16px;
        color: #FF2E9A;
        margin: 0 5px 0 0;
    }
    &.Disabled {
        border: 1px solid #6D80AA;
        color: #6D80AA;
        svg{
            color: #6D80AA;
        }
    }
`
const CloseDiv = styled.div`
  position: relative;
  display: flex;
  svg {
    font-size: 22px !important;
    color: #FF2E9A;
    margin: 0 !important;
  }
`
const FirstDiv = styled.div`
    display: flex;
    align-items: center;
`

const BuisinessProfileDescription = ({setDisplayTab}) => {
    return (
    <>
    <BuisinessViewContent>
        <BuisinessShortDesp>
            Additional information about the business, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum sit porttitor ipsum volutpat massa amet.
        </BuisinessShortDesp>
        <CommonWrap>
            <HeadingDesp>
                Address
            </HeadingDesp>
            <Address>
                4517 Washington Ave. Manchester, Kentucky 39495
            </Address>
            <PhoneNumberDiv>
                (406) 555-0120<CircleDot />(480) 555-0103<CircleDot />(704) 555-0127
            </PhoneNumberDiv>
        </CommonWrap>
        <CommonWrap>
            <HeadingDesp>
                Timings
            </HeadingDesp>
            <WeekDays>
                <span>Mon to Fri</span><br></br>
                0800 Hours  -  1800 Hours
            </WeekDays>
            <WeekEndDays>
                <span>Sat & Sun</span><br></br>
                0800 Hours  -  1800 Hours
            </WeekEndDays>
        </CommonWrap>
        <CommonWrap>
            <HeadingDesp>
                Hashtags
            </HeadingDesp>
            <HastagsWrap>
                <Hastags>#burger</Hastags>
                <Hastags>#Credit Card</Hastags>
            </HastagsWrap>
        </CommonWrap>
        <CommonWrap>
            <HeadingDesp>
                Links
            </HeadingDesp>
            <SocialDivWrap>
                <SocialInput>
                    <FirstDiv>
                        <FaTwitter /> Twitter
                    </FirstDiv>
                    <CloseDiv>
                        <IoMdClose />
                    </CloseDiv>
                </SocialInput>
                <SocialInput>
                    <FirstDiv>
                        <FaFacebookF /> Facebook
                    </FirstDiv>
                    <CloseDiv>
                        <IoMdClose />
                    </CloseDiv>
                </SocialInput>
                <SocialInput>
                    <FirstDiv>
                        <FaInstagramSquare /> Instagram
                    </FirstDiv>
                    <CloseDiv>
                        <IoMdClose />
                    </CloseDiv>
                </SocialInput>
                <SocialInput>
                    <FirstDiv>
                        <FaLinkedinIn /> LinkedIn
                    </FirstDiv>
                    <CloseDiv>
                        <IoMdClose />
                    </CloseDiv>
                </SocialInput>
                <SocialInput className="Disabled">
                    <FirstDiv>
                        <FaBehance /> Behance
                    </FirstDiv>
                </SocialInput>
                <SocialInput className="Disabled">
                    <FirstDiv>
                        <FaDeviantart /> Deviantart
                    </FirstDiv>
                </SocialInput>
            </SocialDivWrap>
        </CommonWrap>
    </BuisinessViewContent>
    </>
    )
}
  
  export default BuisinessProfileDescription