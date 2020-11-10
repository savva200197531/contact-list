import React from 'react';
import './contacts.css';
import { Link } from "react-router-dom";

const Contacts = ({ users }) => {

  return (
    <>
      {console.log('2')}
      <div className="contacts">
        {
          users.map(user =>
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
