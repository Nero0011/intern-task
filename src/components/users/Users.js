import React, { useState, useEffect } from "react";
import './Users.css';
import axios from "axios";
import _ from 'lodash';

const pageSize = 10;

function Users() {
  //Post pagination
    const [users, setUsers] = useState();
    const [paginatedUsers, setPaginatedUsers] = useState();
    const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res => {
      setUsers(res.data);
      console.log(res.data)
      setPaginatedUsers(_(res.data).slice(0).take(pageSize).value())
    })
  },[]);

  //Pagination settings
  const pageCount = users ? Math.ceil(users.length/pageSize) : 0;
  
  const pages = _.range(1, pageCount + 1);

  const pagination = (pageNum) => {
    setCurrentPage(pageNum);
    const startIndex = (pageNum - 1) * pageSize;
    const paginatedUser = _(users).slice(startIndex).take(pageSize).value();
    setPaginatedUsers(paginatedUser)
  }

  return (
    <div className="users">
      { !paginatedUsers ? ('No data fetched') : (
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {
              paginatedUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      )}
      <nav>
        <ul className="pagination">
          {
            pages.map((page) => (
              <li className={ page === currentPage ? "page-item active" : "page-item" }>
                <p className="page-link" onClick={ () => pagination(page) }>{page}</p>
              </li>
            ))
          }
        </ul>
      </nav>
    </div>
  );
};

export default Users;
