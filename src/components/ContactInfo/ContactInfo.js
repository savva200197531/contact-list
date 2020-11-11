import React, { useState, useEffect } from 'react';
import './contact-info.css';
import { Link, useLocation } from "react-router-dom";
import useGetUsersInfo from "../../hooks/useGetUsersInfo";

const ContactInfo = () => {

  const location = useLocation()
  const { getCurrentUser } = useGetUsersInfo();
  const [ userInfo, setUserInfo ] = useState(null);

  useEffect(() => {
    setUserInfo(getCurrentUser(location.pathname.slice(location.pathname.lastIndexOf('r') + 1)))
  }, [ getCurrentUser, location.pathname ])

  if (!userInfo) return null

  return (
    <>
      Contact info
      <Link to={'/'}>
        Link to contacts
      </Link>
      <img src={userInfo.avatar} alt={`${userInfo.username} has no avatar`}/>
      <div className="name"><span>name: </span>{userInfo.name}</div>
      <div className="username"><span>username: </span>{userInfo.username}</div>
      <div className="email"><span>email: </span>{userInfo.email}</div>
      <div className="address">
        <span>address: </span>
        {userInfo.address.city}
        {userInfo.address.country}
        {userInfo.address.state}
      </div>
      <div className="phone"><span>phone: </span>{userInfo.phone}</div>
      <div className="website"><span>website: </span>{userInfo.website}</div>
      <div className="company">
        <span>company: </span>{userInfo.company.name}
      </div>
    </>
  )
}

export default ContactInfo;
