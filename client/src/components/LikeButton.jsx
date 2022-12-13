import { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { likePost } from '../store/features/postSlice';

export const LikeButton = ({ user, post }) => {
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();
  const likePostHandler = () => {
    dispatch(likePost(post.id));
  };

  useEffect(() => {
    if (user && post.likes.find((like) => like.author === user.id)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, post.likes]);

  const likeButton = user ? (
    liked ? (
      <button>
        <AiFillHeart />
      </button>
    ) : (
      <button>
        <AiOutlineHeart />
      </button>
    )
  ) : (
    <Link to={'/login'}>
      <button>
        <AiOutlineHeart />
      </button>
    </Link>
  );
  return (
    <div
      onClick={likePostHandler}
      className="flex items-center justify-center gap-2 text-xs text-white opacity-50"
    >
      {likeButton}
      <label>{post.likes?.length || 0}</label>
    </div>
  );
};
