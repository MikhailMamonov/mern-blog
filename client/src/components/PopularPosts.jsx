import React from "react";
import { Link } from "react-router-dom";

export const PopularPosts = ({ post }) => {
  return <div className="bg-gray-600 my-1">{post.title}</div>;
};
