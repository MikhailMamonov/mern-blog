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
import {
  createComment,
  getCommentsByPost,
} from '../store/features/commentSlice';
import { CommentItem } from '../components/CommentItem';

export const Post = () => {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const { id: postId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.comment);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${postId}`);
    setPost(data);
  }, [postId]);

  let fetchComments = useCallback(async () => {
    dispatch(getCommentsByPost(postId));
  }, [postId, dispatch]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const removeHandler = () => {
    try {
      dispatch(removePost(postId));
      toast('Пост успешно удален');
      navigate('/posts');
    } catch (error) {
      toast(error);
    }
  };

  const submitCommentHandler = () => {
    try {
      dispatch(createComment({ comment, postId }));
      setComment('');
    } catch (error) {
      toast(error);
    }
  };

  if (!post) {
    return (
      <div className="text-xl text-center text-white py-10">Загрузка...</div>
    );
  }

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
                    <Link to={`/${postId}/edit`}>
                      <AiTwotoneEdit />
                    </Link>
                  </button>
                  <button className="flex items-center justify-center gap-2 text-white opacity-50">
                    <AiFillDelete onClick={removeHandler} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-1/3 p-8 flex flex-col bg-gray-700 gap-10 rounded-sm">
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              value={comment}
              placeholder="Comment"
              onChange={(e) => {
                setComment(e.target.value);
              }}
              className="w-full text-black rounded-sm bg-gray-400 outline-none border p-2 text-xs placeholder:text-gray-700"
            />
            <button
              onClick={submitCommentHandler}
              className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4 "
              type="submit"
            >
              Отправить
            </button>
          </form>
          {comments?.map((cmt, idx) => {
            return <CommentItem key={idx} comment={cmt} />;
          })}
        </div>
      </div>
    </div>
  );
};
