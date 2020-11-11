import { useEffect, useState } from 'react';
import FetchData from "../service/FetchData";

const fetchData = new FetchData();

const useGetUsersInfo = () => {
  const [ data, setData ] = useState([]);

  useEffect(() => {
    fetchData.getUsers()
      .then(users => setData(users))
  }, [])

  const getCurrentUser = userId => data.find(user => JSON.stringify(user.id) === userId);

  // const getUsersFiltered = filter => data.filter()

  return { data, getCurrentUser }
}

export default useGetUsersInfo;
