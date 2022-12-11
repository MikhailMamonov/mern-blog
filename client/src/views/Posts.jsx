import axios from './../utils/axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { PostItem } from '../components/PostItem';

export const Posts = () => {
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    const { data } = await axios.get('/posts/user/me');
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="w-1/2 mx-auto py-10 flex flex-col gap-10">
      {posts?.map((post, idx) => (
        <PostItem post={post} key={idx}></PostItem>
      ))}
    </div>
  );
};
