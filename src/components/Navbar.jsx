import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light border-bottom">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="navbar-brand fw-bold">
          Contact list
        </Link>

        <div className="d-flex gap-2">
          <Link to="/contact" className="btn btn-success">
            Add new contact
          </Link>

        </div>
      </div>
    </nav>
  );
};