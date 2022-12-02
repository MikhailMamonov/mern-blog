import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { checkIsAuth, logout } from "../store/features/authSlice";

export const NavBar = () => {
  const dispatch = useDispatch();
  const activeStyles = {
    color: "white",
  };

  const handleLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    toast("Вы вышли из системы");
  };
  const isAuth = useSelector(checkIsAuth);
  return (
    <div className="flex py-4 justify-between items-center">
      <span className="flex justify-center items-center w-6 h-6 bg-gray-600 text-xs text-white rounded-sm">
        E
      </span>
      {isAuth && (
        <ul className="flex gap-8">
          <li>
            <NavLink
              to={"/"}
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
              className="text-xs text-gray-400 hover:text-white"
            >
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/posts"}
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
              className="text-xs text-gray-400 hover:text-white"
            >
              Мои посты
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/new"}
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
              className="text-xs text-gray-400 hover:text-white"
            >
              Добавить пост
            </NavLink>
          </li>
        </ul>
      )}

      <div className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2">
        {isAuth ? (
          <button onClick={handleLogout}>Выйти</button>
        ) : (
          <Link to={"/login"}>Войти</Link>
        )}
      </div>
    </div>
  );
};
