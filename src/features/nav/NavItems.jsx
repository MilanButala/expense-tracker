import React from 'react'
import { NavLink } from 'react-router-dom'
const NavItems = ({ item }) => {

  const { to, label } = item;

  return (
    <>
      <li>
        <NavLink to={to}
          className="navlink">
          {label}
        </NavLink>
      </li>
    </>
  )
}

export default NavItems
