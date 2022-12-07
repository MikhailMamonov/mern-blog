import axios from './../utils/axios';
import React, { useCallback, useEffect, useState } from 'react';
import {
  AiFillEye,
  AiOutlineMessage,
  AiFillDelete,
  AiTwotoneEdit,
} from 'react-icons/ai';
import Moment from 'react-moment';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removePost } from '../store/features/postSlice';
import { toast } from 'react-toastify';

export const Post = () => {
  const [post, setPost] = useState(null);
  const { id: postId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${postId}`);
    setPost(data);
  }, [postId]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const removeHandler = () => {
    try {
      dispatch(removePost(postId));
      toast('Пост успешно удален');
      navigate('/posts');
    } catch (error) {
      toast(error);
    }
  };

  if (!post) {
    return (
      <div className="text-xl text-center text-white py-10">Загрузка...</div>
    );
  }
  console.log(user);
  return (
    <div>
      <button className="flex justify-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4">
        <Link className="flex" to={'/'}>
          Назад
        </Link>
      </button>
      <div className="flex gap-10 py-8">
        <div className="w-2/3">
          <div className="flex flex-col basis-1/4 flex-grow">
            <div
              className={
                post?.imgUrl ? 'flex rouded-sm h-80' : 'flex rounded-sm'
              }
            >
              {post?.imgUrl && (
                <img
                  src={`http://localhost:8080/${post.imgUrl}`}
                  alt="img"
                  className="object-cover w-full"
                />
              )}
            </div>
            <div className="flex justify-between items-center pt-2">
              <div className="text-xs text-white opacity-50">
                {post.username}
              </div>
              <div className="text-xs text-white opacity-50">
                <Moment date={post.createdAt} format="D MMM YYYY" />
              </div>
            </div>
            <div className="text-white text-xl">{post.title}</div>
            <p className="text-white opacity-60 text-xs pt-4 line-clamp-4">
              {post.text}
            </p>

            <div className="flex gap-3 items-center mt-2 justify-between">
              <div className="flex gap-3 mt-4">
                <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                  <AiFillEye /> <span>{post.views}</span>
                </button>
                <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                  <AiOutlineMessage />{' '}
                  <span>{post.comments?.length || 0} </span>
                </button>
              </div>
              {user?.id === post.author && (
                <div className="flex gap-3 mt-4">
                  <button className="flex items-center justify-center gap-2 text-white opacity-50">
                    <AiTwotoneEdit />
                  </button>
                  <button className="flex items-center justify-center gap-2 text-white opacity-50">
                    <AiFillDelete onClick={removeHandler} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-1/3"></div>
      </div>
    </div>
  );
};
