import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { actions } from "../store.js";

export const ContactCard = ({ contact }) => {
  const { dispatch } = useGlobalReducer();

  const handleDelete = async () => {
    const ok = window.confirm("Delete this contact?");
    if (!ok) return;

    await actions.deleteContact(dispatch, contact.id);
  };

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <div className="fw-bold">
            {contact.name || contact.full_name || "No name"}
          </div>

          <div className="text-muted small">
            {contact.email} · {contact.phone}
          </div>

          <div className="text-muted small">{contact.address}</div>
        </div>

        <div className="d-flex gap-2">
          <Link
            to={`/contact/${contact.id}`}
            className="btn btn-outline-secondary btn-sm"
          >
            Edit
          </Link>

          <button
            onClick={handleDelete}
            className="btn btn-outline-danger btn-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};