import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { actions } from "../store.js";
import { ContactCard } from "../components/ContactCard.jsx";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    actions.getContacts(dispatch).catch((e) => console.log(e.message));
  }, [dispatch]);

  return (
    <div className="container mt-5" style={{ maxWidth: "900px" }}>
      <div className="mb-4">
        <h2 className="m-0">Contacts</h2>
      </div>

      {store.contacts.length === 0 ? (
        <div className="card shadow-sm">
          <div className="card-body d-flex align-items-center justify-content-between">
            <div>
              <h5 className="mb-1">No contacts yet</h5>
              <div className="text-muted">
                Create your first contact to see it here.
              </div>
            </div>

            <Link to="/contact" className="btn btn-outline-success">
              Create contact
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-3">
          {store.contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      )}
    </div>
  );
};