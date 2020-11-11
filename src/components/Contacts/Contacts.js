import React from 'react';
import './contacts.css';
import { Link } from "react-router-dom";
import useGetUsersInfo from "../../hooks/useGetUsersInfo";

const Contacts = ({ users }) => {

  const { data } = useGetUsersInfo();
  return (
    <>
      <div className="contacts">
        {
          data.map(user =>
            <Link key={user.id} className="contact" to={`user${user.id}`}>
              <div className="contact-avatar">
                <img src={user.avatar} alt={`${user.username} has no avatar`}/>
              </div>
              <div className="contact-info">
                <div className="contact-username"><span>Username:</span> {user.username}</div>
                <div className="contact-name"><span>Name:</span> {user.name}</div>
                <div className="contact-email"><span>Email:</span> {user.email}</div>
                <div className="contact-phone"><span>Phone:</span> {user.phone}</div>
              </div>
            </Link>
          )
        }
      </div>
    </>
  )
}

export default Contacts;
