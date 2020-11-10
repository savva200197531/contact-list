import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import noAvatar from './assets/no-avatar.png'

import Contacts from "./components/Contacts/Contacts";
import ContactInfo from "./components/ContactInfo/ContactInfo";
import FetchData from "./service/FetchData";

class App extends React.Component {

  fetchData = new FetchData();

  state = {
    users: []
  }

  componentDidMount() {
    this.updateUsers();
  }

  updateUsers() {
    this.fetchData.getUsers().then(data => {
      const newData = data.map(item => {
        fetch(item.avatar).then(res => {
          if (!res.ok) {
            item.avatar = 'https://padlet-uploads.storage.googleapis.com/139588013/o7sdrBbJ_1o_R8nx_HeT9Q/ff70c18675c5efc0766e8d329f214bbd.png'
          }
        })
        return item
      })
      const json = JSON.stringify(newData)
      localStorage.setItem('users', json)
      this.setState({ users: JSON.parse(localStorage.getItem('users'))})
    })
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path={'/'} render={() => this.state.users && <Contacts users={this.state.users}/>}/>
          <Route path={'/:id'} component={ContactInfo}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
