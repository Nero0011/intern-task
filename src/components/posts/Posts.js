import React, { useState, useEffect } from "react";
import './Posts.css';
import axios from "axios";
import _ from 'lodash';
import PopUp from "../popUp/popUp";

const pageSize = 10;

function Posts() {
  // Post pagination 
    const [posts, setPosts] = useState();
    const [paginatedPosts, setPaginatedPosts] = useState();
    const [currentPage, setCurrentPage] = useState(1);
  
  // Popup handlers
    const [isOpen, setIsOpen] = useState(false);
  
    const [postComments, setPostComments] = useState()
    const [userComments, setUserComments] = useState()

    const togglePopupForId = (event) => {
      setIsOpen(!isOpen);
      const id = event.target.innerHTML;
      axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then(res => {
        setPostComments(res.data)
      })
    }

    const togglePopupForUser = (event) => {
      setIsOpen(!isOpen);
      const id = event.target.innerHTML;
      axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
      .then(res => {
        setUserComments(res.data)
      })
    }

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(res => {
      setPosts(res.data);
      setPaginatedPosts(_(res.data).slice(0).take(pageSize).value())
    })
  },[]);

  //Pagination settings
  const pageCount = posts ? Math.ceil(posts.length/pageSize) : 0;
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  const pagination = (pageNum) => {
    setCurrentPage(pageNum);
    const startIndex = (pageNum - 1) * pageSize;
    const paginatedPost = _(posts).slice(startIndex).take(pageSize).value();
    setPaginatedPosts(paginatedPost);
  }

  return (
    <div>
      { !paginatedPosts ? ('No data fetched') : (
        <table className="table">
          <thead>
            <tr>
              <th>userId</th>
              <th>Id</th>
              <th>Title</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>
            {
              paginatedPosts.map((post, index) => (
                <tr key={index}>
                  <td onClick={ togglePopupForUser } className='clickable'>{post.userId}</td>
                  <td onClick={ togglePopupForId } className='clickable'>{post.id}</td>
                  <td>{post.title}</td>
                  <td>{post.body}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      )}
      {isOpen && <PopUp
          content={
          <>
            {
              postComments?.map((comment, index) => (
                <div key={index}>
                  <h3>Post comment № {index + 1}</h3>
                  <p>{comment.body}</p>
                </div>
              ))
            } 
            {
              userComments?.map((comment, index) => (
                <div key={index}>
                  <h3>User comment № {index + 1}</h3>
                  <p>{comment.body}</p>
                </div>
              ))
            }
          </>}
          handleClose={togglePopupForId}
        />}
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

export default Posts;
