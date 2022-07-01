import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link
} from "react-router-dom";
import Comments from '../comments/Comments'
import Posts from '../posts/Posts'
import Users from '../users/Users'
import './Navbar.css'

function Navbar() {
  return (
    <Router>
        <div>
            <nav>
               <div className='links'>
                    <Link to='/users'>Users</Link>
                </div>
                <div className='links'>
                    <Link to='/posts'>Posts</Link>
                </div>
                <div className='links'>
                    <Link to='/comments'>Comments</Link>
                </div>            
            </nav>
            <Routes>
                <Route exact path="/users" element={<Users />} />
                <Route exact path="/posts" element={<Posts />} />
                <Route exact path="/comments" element={<Comments />} />
            </Routes>
        </div>
    </Router>
  )
};

export default Navbar;
