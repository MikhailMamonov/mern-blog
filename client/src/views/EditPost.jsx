import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import axios from "../utils/axios";
import { updatePost } from "../store/features/postSlice";
import { useDispatch } from "react-redux";

export const EditPost = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [oldImage, setOldImage] = useState("");
  const [newImage, setNewImage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: postId } = useParams();
  let fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${postId}`);
    setTitle(data.title);
    setText(data.text);
    setOldImage(data.imgUrl);
  }, [postId]);

  const submitHandler = () => {
    try {
      const updatedPost = new FormData();
      updatedPost.append("title", title);
      updatedPost.append("text", text);
      updatedPost.append("id", postId);
      updatedPost.append("image", newImage);
      dispatch(updatePost(updatedPost));
      navigate("/posts");
    } catch (error) {
      console.log(error);
    }
  };

  const clearFormHandler = () => {
    setTitle("");
    setText("");
  };

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return (
    <form className="w-1/3 mx-auto py-10" onSubmit={(e) => e.preventDefault()}>
      <label className="text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer">
        <input
          type="file"
          onChange={(e) => {
            setNewImage(e.target.files[0]);
            setOldImage("");
          }}
          className="hidden"
        />
      </label>
      <div className="flex object-cover py-2">
        {" "}
        {newImage && (
          <img src={URL.createObjectURL(newImage)} alt={newImage.name} />
        )}
        {oldImage && (
          <img
            src={`${window.location.protocol}//${process.env.REACT_APP_BASE_URL}:8080/${oldImage}`}
            alt={oldImage.name}
          />
        )}
      </div>
      <label className="text-xs text-white opacity-70">
        Заголовок поста:
        <input
          type="text"
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>

      <label className="text-xs text-white opacity-70">
        Текст поста:
        <textarea
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Текст поста"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none h-40 placeholder:text-gray-700"
        />
      </label>

      <div className="flex gap-8 items-center justify-center mt-4">
        <button
          onClick={submitHandler}
          className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
        >
          Применить
        </button>

        <button
          className="flex justify-center items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4"
          onClick={clearFormHandler}
        >
          Отменить
        </button>
      </div>
    </form>
  );
};
