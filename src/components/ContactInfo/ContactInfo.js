import React, { useState, useEffect } from 'react';
import './contact-info.css';
import { useLocation, useHistory } from "react-router-dom";
import useGetUsersInfo from "../../hooks/useGetUsersInfo";
import { fadeIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';

const FadeIn = styled.div`animation: 1s ${keyframes`${fadeIn}`}`;

const ContactInfo = ({ data }) => {

  const location = useLocation();
  const history = useHistory();
  const { getCurrentUser } = useGetUsersInfo();

  const [ userInfo, setUserInfo ] = useState(null);
  const [ redactOpen, setRedactOpen ] = useState(false);
  const [ showAddress, setShowAddress ] = useState(false);
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    if (data) {
      setUserInfo(getCurrentUser(location.pathname.slice(location.pathname.lastIndexOf('r') + 1)));
      console.log(userInfo);
    }
  }, [location.pathname, data, userInfo]);

  useEffect(() => {
    !data ? setLoading(false) : setLoading(true);
  }, [data])

  const openRedact = () => {
    setRedactOpen(!redactOpen);
  }

  const userDataChange = (event) => {
    const target = event.target;
    const allUsers = JSON.parse(localStorage.getItem('usersData'));
    const currentUser = allUsers.find(user => user.id === userInfo.id)
    currentUser[target.dataset.key] = target.value
    localStorage.setItem('usersData', JSON.stringify(allUsers));
    console.log(currentUser)
    setUserInfo(currentUser);
    console.log(userInfo);
  }

  const redact = (value, key, id) => {
    if (redactOpen) {
      return (
        <input type="text" data-key={key} data-id={id} className={value} onChange={userDataChange} defaultValue={value}/>
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
          <div><span>city: </span>{redact(userInfo.city)}</div>
          <div><span>country: </span>{redact(userInfo.country)}</div>
          <div><span>state: </span>{redact(userInfo.state)}</div>
        </div>
      </FadeIn>
    )
  }

  if (!loading) {
    return <div>Loading...</div>
  } else if (userInfo) {
    return (
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
          <div className="name"><span>name: </span>{redact(userInfo.name, 'name', userInfo.id)}</div>
          <div className="username"><span>username: </span>{redact(userInfo.username)}</div>
          <div className="email"><span>email: </span>{redact(userInfo.email)}</div>
          <div className="address">
            <button onClick={() => setShowAddress(!showAddress)}>Show address</button>
            {address}
          </div>
          <div className="phone"><span>phone: </span>{redact(userInfo.phone)}</div>
          <div className="website"><span>website: </span>{redact(userInfo.website)}</div>
          <div className="company"><span>company: </span>{redact(userInfo.company)}</div>
        </div>
      </>
    )
  }
}

export default ContactInfo;
