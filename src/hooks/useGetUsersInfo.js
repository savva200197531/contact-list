import { useEffect, useState } from 'react';
import FetchData from "../service/FetchData";

const fetchData = new FetchData();

const useGetUsersInfo = () => {
  const [ originalData, setOriginalData ] = useState([]);
  const [ data, setData ] = useState([]);
  const [ allData, setAllData ] = useState([]);

  useEffect(() => {
    fetchData.getUsers()
      .then(usersOrig => {
        setOriginalData(usersOrig)
      })
  }, []);

  useEffect(() => {
    fetchData.getUsers()
      .then(users => {
        // const usersArr = users.map(user => {
        //   return {
        //     name: user.name,
        //     username: user.username,
        //     email: user.email,
        //     phone: user.phone,
        //     website: user.website,
        //     avatar: user.avatar,
        //     id: user.id,
        //     city: user.address.city,
        //     state: user.address.state,
        //     country: user.address.country,
        //     company: user.company.name
        //   }
        // })
        setData(users);
        setAllData(users);
      });
  }, []);

  const filterByInput = word => {
    if (word.length) {
      // eslint-disable-next-line array-callback-return
      const filteredData = allData.filter(user => {
        let flag = false;
        Object.values(user).forEach((value) => {
          if(JSON.stringify(value).trim().toLowerCase().includes(word.trim().toLowerCase())) {
            flag = true;
          }
        });
        if(flag) return user;
      });
      setData(filteredData);
    }
  }

  const filterByRadio = target => {
    if (target === 'alpha') {
      // eslint-disable-next-line array-callback-return
      const filteredData = [...data.sort((a, b) => {
        const aName = a.name.toLowerCase(),
          bName = b.name.toLowerCase();
        if(aName < bName) return -1;
        if(aName > bName) return 1;
      })];
      setData(filteredData)
    }
    if (target === 'no-filter') {
      setData([...originalData]);
    }
  }

  const filterByLetter = event => {
    const letter = event.target.value;
    if (letter.length) {
      const filteredData = [...allData.filter(user => {
        if (user.name.trim().toLowerCase().charAt(0) === letter.trim().toLowerCase()) {
          return user
        }
      })];
      setData(filteredData)
    } else {
      setData(allData);
    }
  }

  const getCurrentUser = userId => data.find(user => user.id === +userId);

  return { data, getCurrentUser, filterByInput, filterByRadio, filterByLetter };
}

export default useGetUsersInfo;
