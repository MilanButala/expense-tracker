import React, { useState, useEffect } from "react";
import NavItems from "./NavItems";
import { useLocation } from "react-router-dom";

const Nav = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/add-expenses", label: "Add Expenses" },
    { to: "/expenses", label: "Expenses" },
    { to: "/categories", label: "Categories" },
  ];

  useEffect(() => {
    setOpen(false);    
  }, [location.pathname]);

  return (
    <>
      {/* Mobile Toggle */}
      <div className="flex items-center lg:hidden">
        <button
          onClick={() => setOpen(!open)}
          type="button"
          className="p-2 rounded-lg text-text-primary hover:bg-surface"
        >
          {open ? (
            // Close Icon
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Hamburger Icon
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Navigation */}
      <div
        className={`
          ${open ? "block" : "hidden"}
          absolute top-20 left-0 w-full bg-background shadow-lg
          lg:static lg:block lg:w-auto lg:bg-transparent lg:shadow-none ml-auto
        `}
      >
        <ul className="flex flex-col lg:flex-row lg:space-x-8 p-4 lg:p-0">
          {links.map((item) => (
            <NavItems key={item.label} item={item} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Nav;