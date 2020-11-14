import { useEffect, useState } from 'react';
import FetchData from "../service/FetchData";

const fetchData = new FetchData();

const useGetUsersInfo = () => {
  const [ data, setData ] = useState([]);

  useEffect(() => {
    fetchData.getUsers()
      .then(users => {
        const usersArr = users.map(user => {
          return {
            name: user.name,
            username: user.username,
            email: user.email,
            phone: user.phone,
            website: user.website,
            avatar: user.avatar,
            id: user.id,
            city: user.address.city,
            state: user.address.state,
            country: user.address.country,
            company: user.company.name
          }
        })
        setData(usersArr);
      })
  }, []);

  const getCurrentUser = userId => data ? data.find(user => user.id === +userId) : null;

  // const getUsersFiltered = filter => data.filter()

  return { data, getCurrentUser }
}

export default useGetUsersInfo;
