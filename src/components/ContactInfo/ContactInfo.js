import React, { useState, useEffect } from 'react';
import './contact-info.css';
import { useLocation, useHistory } from "react-router-dom";
import useGetUsersInfo from "../../hooks/useGetUsersInfo";
import { fadeIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';

const FadeIn = styled.div`animation: 1s ${keyframes`${fadeIn}`}`;

const ContactInfo = () => {

  const location = useLocation();
  const history = useHistory();

  const { getCurrentUser } = useGetUsersInfo();
  const [ userInfo, setUserInfo ] = useState(null);

  const [ redactOpen, setRedactOpen ] = useState(false);
  const [ showAddress, setShowAddress ] = useState(false);
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    setUserInfo(getCurrentUser(location.pathname.slice(location.pathname.lastIndexOf('r') + 1)));
  }, [ getCurrentUser, location.pathname ]);

  useEffect(() => {
    !userInfo ? setLoading(false) : setLoading(true);
  }, [ userInfo ]);

  // stylization

  const redact = (value) => {
    if (redactOpen) {
      return (
        <input type="text" className={value} defaultValue={value}/>
      )
    } else {
      return value;
    }
  }

  const openRedact = () => {
    setRedactOpen(!redactOpen);
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

  // form submit

  let button;
  if (redactOpen) {
    button = (
      <button type="submit" onClick={() => {
        openRedact();
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

  const submitForm = (event) => {
    event.preventDefault();
    console.log(event.target.value)
    if (event.target.value) {

    }
  }

  // content

  if (!loading) {
    return <div>Loading...</div>
  } else {
    return (
      <>
        <div className="header">
          <h1>Contact info</h1>
          <button onClick={history.goBack}>
            Go back
          </button>
        </div>
        <form className="user-info" onSubmit={submitForm}>
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
        </form>
      </>
    )
  }
}

export default ContactInfo;
