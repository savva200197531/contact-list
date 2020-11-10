import React from 'react';
import './contact-info.css';
import { Link } from "react-router-dom";

const ContactInfo = () => {
  return (
    <>
      Contact info
      <Link to={'/'}>
        Link to contacts
      </Link>
    </>
  )
}

export default ContactInfo;
