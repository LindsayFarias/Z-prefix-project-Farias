import './App.css';
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import BlogFeedPage from './components/pages/BlogFeedPage';
import LoginPage from './components/pages/LoginPage';
import Homepage from './components/pages/Homepage';
import SinglePostPage from './components/pages/SinglePostPage';
import Navbar from './components/Navbar';

const baseURL = 'http://localhost:3001/';

const apiCall = async (url) => {
  let result = await fetch(baseURL + url);
  return result.json();
};

function App() {
  const [blogs, setBlogs] = useState(null);
  const [blog, setBlog] = useState(null);
  const [userBlogs, setUserBlogs] = useState(null);

  const blogsGetter = async () => {
    let blogs = await apiCall('blogs')

    setBlogs(blogs);
  };

  const blogGetter = async (id) => {
    const urlString = `/blogs/individual/${id}`;
    let blog = await apiCall(urlString);
    setBlog(blog);
  };

  const userBlogsGetter = async (username) => {
    const urlString = `blogs/${username}`;
    let userBlogs = await apiCall(urlString);
    setUserBlogs(userBlogs);
  };

  return (
    <div className="App">
      <Navbar /> <br/>
      <Routes>
        <Route path='/bloggeropolis' element={<BlogFeedPage getBlogs={blogsGetter} blogs={blogs}/>}/>
        <Route path='/bloggeropolis/login' element={<LoginPage/>}/>
        <Route path='/bloggeropolis/:username' element={<Homepage getBlogs={userBlogsGetter} blogs={userBlogs}/>}/>
        <Route path='/bloggeropolis/:userId/:postId' element={<SinglePostPage getBlog={blogGetter} blog={blog}/>}/>
        <Route path='/bloggeropolis/single/:postId' element={<SinglePostPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
