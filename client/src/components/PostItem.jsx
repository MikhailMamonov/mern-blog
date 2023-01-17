import {
  AiFillEye,
  AiOutlineDislike,
  AiOutlineMessage,
  AiTwotoneLike,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { LikeButton } from "./LikeButton";
import Moment from "react-moment";
import { checkIsAuth } from "../store/features/authSlice";
import { updatePost } from "../store/features/postSlice";
import { useState } from "react";

export const PostItem = ({ post, user }) => {
  return (
    <div className="flex flex-col basis-1/4 flex-grow">
      <Link to={`/${post.id}`}>
        <div
          className={post.imgUrl ? "flex rouded-sm h-80" : "flex rounded-sm"}
        >
          {post.imgUrl && (
            <img
              src={`${window.location.protocol}//${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_PORT}/${post.imgUrl}`}
              alt="img"
              className="object-cover w-full"
            />
          )}
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="text-xs text-white opacity-50">{post.username}</div>
          <div className="text-xs text-white opacity-50">
            <Moment date={post.createdAt} format="D MMM YYYY" />
          </div>
        </div>
        <div className="text-white text-xl">{post.title}</div>
        <p className="text-white opacity-60 text-xs pt-4 line-clamp-3">
          {post.text}
        </p>
      </Link>
      <div className="flex gap-3 items-center mt-2">
        <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
          <AiFillEye /> <span>{post.views}</span>
        </button>
        <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
          <AiOutlineMessage /> <span>{post.comments?.length || 0} </span>
        </button>
        <LikeButton post={post} user={user} />
        <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
          <AiOutlineDislike /> <span>{post.dislikes?.length || 0}</span>
        </button>
      </div>
    </div>
  );
};
