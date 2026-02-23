import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { actions } from "../store.js";

export const Single = () => {
  const { store, dispatch } = useGlobalReducer();
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    // si estamos editando y aún no hay contactos cargados, los pedimos
    if (id && store.contacts.length === 0) {
      actions.getContacts(dispatch);
    }
  }, [id, store.contacts.length, dispatch]);

  useEffect(() => {
    if (!id) return;

    const existing = store.contacts.find((c) => c.id === Number(id));
    if (!existing) return;

    setForm({
      name: existing.name || existing.full_name || "",
      email: existing.email || "",
      phone: existing.phone || "",
      address: existing.address || ""
    });
  }, [id, store.contacts]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (id) {
      await actions.updateContact(dispatch, id, form);
    } else {
      await actions.createContact(dispatch, form);
    }

    navigate("/");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "650px" }}>
      <div className="card shadow-sm p-4">
        <h1 className="mb-3">{id ? "Edit Contact" : "Add Contact"}</h1>

        <form onSubmit={handleSave}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              className="form-control"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Address</label>
            <input
              className="form-control"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-primary" type="submit">
              Save
            </button>

            <Link to="/" className="btn btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};