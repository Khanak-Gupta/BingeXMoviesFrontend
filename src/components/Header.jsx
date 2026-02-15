import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import userIcon from "../assets/user.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { navigation } from "../contants/navigation";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ");
  const [searchInput, setSearchInput] = useState(removeSpace || "");

  useEffect(() => {
    if (searchInput) {
      navigate(`/search?q=${searchInput}`);
    }
  }, [searchInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <header className="fixed top-0 w-full h-16 bg-black bg-opacity-80 backdrop-blur-md z-40">
      <div className="container mx-auto px-4 flex items-center h-full">

        {/* LOGO */}
        <Link to="/">
          <img src={logo} alt="logo" width={120} />
        </Link>

        {/* NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-4 ml-6">
          {navigation.map((nav, index) => (
            <NavLink
              key={nav.label + index}
              to={nav.href}
              className={({ isActive }) =>
                `text-white hover:text-red-500 transition ${
                  isActive ? "text-red-500" : ""
                }`
              }
            >
              {nav.label}
            </NavLink>
          ))}
        </nav>

        {/* RIGHT SIDE */}
        <div className="ml-auto flex items-center gap-6">

          {/* SEARCH */}
          <form className="hidden lg:flex items-center gap-2" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search..."
              className="bg-neutral-800 px-4 py-1 rounded text-white outline-none focus:ring-1 focus:ring-red-500"
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            <button className="text-xl text-white hover:text-red-500">
              <IoSearchOutline />
            </button>
          </form>

          {/* AUTH SECTION */}
          {user ? (
  <Link
    to="/profile"
    className="w-9 h-9 rounded-full overflow-hidden border border-neutral-600"
  >
    <img
      src={user?.avatar || userIcon}
      alt="profile"
      className="w-full h-full object-cover"
    />
  </Link>
) : (
  <>
    <Link to="/login">Login</Link>
    <Link to="/register">Register</Link>
  </>
)}

        </div>
      </div>
    </header>
  );
};

export default Header;
