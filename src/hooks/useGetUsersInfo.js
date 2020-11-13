import { useEffect, useState } from 'react';
import FetchData from "../service/FetchData";

const fetchData = new FetchData();

const useGetUsersInfo = () => {
  const [ data, setData ] = useState(JSON.parse(localStorage.getItem('usersData')));

  useEffect(() => {
    fetchData.getUsers()
      .then(users => {
        if (!data) {
          const json = JSON.stringify(users);
          localStorage.setItem('usersData', json);
          setData(JSON.parse(localStorage.getItem('usersData')));
        }
      })
  })

  const getCurrentUser = userId => data ? data.find(user => JSON.stringify(user.id) === userId) : null;


  // const getUsersFiltered = filter => data.filter()

  return { data, getCurrentUser }
}

export default useGetUsersInfo;
