import React, { useState, useEffect } from 'react';
import './contacts.css';
import { Link } from "react-router-dom";
import useGetUsersInfo from "../../hooks/useGetUsersInfo";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";

const FadeIn = styled.div`animation: 1s ${keyframes`${fadeIn}`}`;

const Contacts = () => {


  const { data, filterByInput, filterByRadio, filterByLetter } = useGetUsersInfo();
  const [ loading, setLoading ] = useState(false);
  const [ letter, setLetter ] = useState('');
  const [ showLetterInput, setShowLetterInput ] = useState(false);

  useEffect(() => {
    !data ? setLoading(false) : setLoading(true);
  }, [ data, loading ]);

  const filter = (event) => {
    const target = event.target;
    if (target.id === 'first-letter' || target.id === 'first-letter-input') {
      if (target.id === 'first-letter-input') {
        setLetter(event.target.value);
      }
      setShowLetterInput(true);
    } else {
      setShowLetterInput(false);
    }
    if (target.id) {
      filterByRadio(target.id);
    } else {
      filterByInput(target.value);
    }
  }

  let letterInput;
  if (showLetterInput) {
    letterInput = (
      <FadeIn>
        <input
          id="first-letter-input"
          type="text"
          onChange={filterByLetter}
          value={letter}
          maxLength={1}
          className="letter-input"/>
      </FadeIn>
    )
  }

  let nothing;
  if (!data.length) {
    nothing = (
      <h1 className="no-matches">No matches!</h1>
    )
  }

  if (!loading) {
    return <div>Loading...</div>
  } else return (
    <>
      <form className="filter" onChange={filter}>
        <div className="filter-input">
          <input type="text"/>
        </div>
        <div className="filter-radio">
          <input type="radio" name="filter-radio" id="no-filter" defaultChecked/>
          <label htmlFor="no-filter">No filter</label>
          <input type="radio" name="filter-radio" id="alpha"/>
          <label htmlFor="alpha">Sort by alphabet</label>
          <input type="radio" name="filter-radio" id="first-letter"/>
          <label htmlFor="first-letter">Sort by first letter</label>
        </div>
        {letterInput}
      </form>
      <div className="contacts">
        {nothing}
        {
          data.map(user =>
            <Link key={user.id} className="contact" to={`user${user.id}`}>
              <div className="contact-avatar">
                <img src={user.avatar} alt={`${user.username} has no avatar`}/>
              </div>
              <div className="contact-info">
                <div className="contact-name"><span>Name:</span> {user.name}</div>
                <div className="contact-username"><span>Username:</span> {user.username}</div>
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
