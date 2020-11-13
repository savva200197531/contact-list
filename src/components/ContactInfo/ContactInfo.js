import React, { useState, useEffect } from 'react';
import './contact-info.css';
import { useLocation, useHistory } from "react-router-dom";
import useGetUsersInfo from "../../hooks/useGetUsersInfo";
import { fadeIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';

const FadeIn = styled.div`animation: 1s ${keyframes`${fadeIn}`}`;

const ContactInfo = ({data}) => {

  // const userInfoNew = {
  //   name: '',
  // }

  const location = useLocation();
  const history = useHistory();
  const { getCurrentUser } = useGetUsersInfo();
  const [ userInfo, setUserInfo ] = useState(null);
  const [ redactOpen, setRedactOpen ] = useState(false);
  const [ showAddress, setShowAddress ] = useState(false);
  // const [ inputValues, setInputValues ] = useState(userInfo)
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    !data ? setLoading(false) : setLoading(true);
    if (data) {
      // console.log(data);
      setUserInfo(getCurrentUser(location.pathname.slice(location.pathname.lastIndexOf('r') + 1)));
    }
  }, [data, getCurrentUser, location.pathname]);

  const openRedact = () => {
    setRedactOpen(!redactOpen);
  }

  const userDataChange = (event) => {
    console.log(event.target)
    console.log(userInfo)
  }

  const redact = (value) => {
    if (redactOpen) {
      return (
        <input type="text" className={value} onChange={userDataChange} defaultValue={value}/>
      )
    } else {
      saveData(value)
      return value;
    }
  }

  let button;
  if (redactOpen) {
    button = (
      <button onClick={() => {
        openRedact();
        console.log(userInfo);
      }}>Save
      </button>
    )
  } else {
    button = (
      <button className="redact-btn" onClick={() => {
        openRedact();
      }}>Redact profile
      </button>
    )
  }

  const saveData = (value) => {
    // console.log('-------');
    // console.log(value);
  }

  let address;
  if (showAddress) {
    address = (
      <FadeIn>
        <div className="address-items">
          <div><span>city: </span>{redact(userInfo.address.city)}</div>
          <div><span>country: </span>{redact(userInfo.address.country)}</div>
          <div><span>state: </span>{redact(userInfo.address.state)}</div>
        </div>
      </FadeIn>
    )
  }
  
  if (!loading && !userInfo) {
    return <div>Loading...</div>
  } else return (
    <>
      <div className="header">
        <h1>Contact info</h1>
        <button onClick={history.goBack}>
          Go back
        </button>
      </div>
      <div className="user-info">
        <img className="avatar" src={userInfo.avatar} alt={`${userInfo.username} has no avatar`}/>
        {button}
        <div className="name"><span>name: </span>{redact(userInfo.name)}</div>
        <div className="username"><span>username: </span>{redact(userInfo.username)}</div>
        <div className="email"><span>email: </span>{redact(userInfo.email)}</div>
        <div className="address">
          <button onClick={() => setShowAddress(!showAddress)}>Show address</button>
          {address}
        </div>
        <div className="phone"><span>phone: </span>{redact(userInfo.phone)}</div>
        <div className="website"><span>website: </span>{redact(userInfo.website)}</div>
        <div className="company"><span>company: </span>{redact(userInfo.company.name)}</div>
      </div>
    </>
  )
}

export default ContactInfo;
