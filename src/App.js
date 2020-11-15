import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Contacts from "./components/Contacts/Contacts";
import ContactInfo from "./components/ContactInfo/ContactInfo";
import useGetUsersInfo from "./hooks/useGetUsersInfo";

const App = () => {
  // const newData = data.map(item => {
  //   fetch(item.avatar).then(res => {
  //     if (!res.ok) {
  //       item.avatar = 'https://padlet-uploads.storage.googleapis.com/139588013/o7sdrBbJ_1o_R8nx_HeT9Q/ff70c18675c5efc0766e8d329f214bbd.png'
  //     }
  //   })
  //   return item
  // })
  // updateUsers() {
  //   this.fetchData.getUsers()
  //     .then(data => {
  //       this.setState({ users: data })
  //       return data
  //     })
  // }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={'/'} render={() => <Contacts/>}/>
        <Route path={'/:id'} render={() => <ContactInfo/>}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
