import React, { useState, useEffect } from "react";
import './Comments.css';
import axios from "axios";
import _ from 'lodash';

const pageSize = 10;

function Comments() {
  //Comments pagination
    const [comments, setComments] = useState();
    const [paginatedComments, setPaginatedComments] = useState();
    const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/comments')
    .then(res => {
      setComments(res.data);
      console.log(res.data)
      setPaginatedComments(_(res.data).slice(0).take(pageSize).value())
    })
  },[]);

  //Pagination settings
  const pageCount = comments ? Math.ceil(comments.length/pageSize) : 0;
  if (pageCount === 1) return null;

  const pages = _.range(1, pageCount + 1);

  const pagination = (pageNum) => {
    setCurrentPage(pageNum);
    const startIndex = (pageNum - 1) * pageSize;
    const paginatedComments = _(comments).slice(startIndex).take(pageSize).value();
    setPaginatedComments(paginatedComments)
  }

  return (
    <div>
      { !paginatedComments ? ('No data fetched') : (
        <table className="table">
          <thead>
            <tr>
              <th>postId</th>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>
            {
              paginatedComments.map((comment, index) => (
                <tr key={index}>
                  <td>{comment.postId}</td>
                  <td>{comment.id}</td>
                  <td>{comment.name}</td>
                  <td>{comment.email}</td>
                  <td>{comment.body}</td>
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

export default Comments;
