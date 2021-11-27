import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Top3 = () => {
  const [hackers, setHackers] = useState([]);

  useEffect(() => {
    axios
      .get(`/hacker/top3`,{
        headers:{
            'x-auth':localStorage.getItem('token')
        }
      })
      .then(res => {
        
        setHackers(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h1>Top 3 hackers</h1>
      <table className='table'>
        <thead>
          <tr>
            <th> # </th>
            <th> Name </th>
          </tr>
        </thead>
        <tbody>
          {hackers.length>0 && hackers.map((hacker, index) => {
            return (
              <tr key={hacker.value}>
                <td> {index + 1} </td>
                <td> {hacker.name} </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
export default Top3;