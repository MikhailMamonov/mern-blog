import React, { useEffect } from 'react';
import { PostItem } from '../components/PostItem';
import { useDispatch, useSelector } from 'react-redux';
import { getMyPosts } from '../store/features/postSlice';

export const Posts = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);

  return (
    <div className="w-1/2 mx-auto py-10 flex flex-col gap-10">
      {posts?.map((post, idx) => (
        <PostItem user={user} post={post} key={idx}></PostItem>
      ))}
    </div>
  );
};
