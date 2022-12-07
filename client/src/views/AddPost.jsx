import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../store/features/postSlice";
import { useNavigate } from "react-router-dom";

export const AddPost = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = () => {
    try {
      const data = new FormData();
      console.log(title, text);
      data.append("title", title);
      data.append("text", text);
      data.append("image", image);
      dispatch(createPost(data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const clearHandler = () => {
    setTitle("");
    setText("");
  };

  return (
    <form className="w-1/3 mx-auto py-10" onSubmit={(e) => e.preventDefault()}>
      <label className="text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer">
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="hidden"
        />
      </label>
      <div className="flex object-cover py-2">
        {" "}
        {image && <img src={URL.createObjectURL(image)} alt={image.name} />}
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
          Добавить
        </button>

        <button
          className="flex justify-center items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4"
          onClick={clearHandler}
        >
          Отменить
        </button>
      </div>
    </form>
  );
};
