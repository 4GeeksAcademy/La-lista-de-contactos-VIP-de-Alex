const API_BASE = "https://playground.4geeks.com/contact";
const AGENDA = "alexrolfo";

export const initialStore = () => ({
  contacts: []
});

function normalizeContacts(data) {
  const arr = Array.isArray(data) ? data : data?.contacts || [];
  return arr.map((c) => {
    const id = c?.id ?? c?._id ?? c?.contact_id ?? null;
    const name = c?.name || c?.full_name || "";
    return {
      ...c,
      id,
      name,
      full_name: c?.full_name || name
    };
  });
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_contacts":
      return { ...store, contacts: action.payload };
    default:
      return store;
  }
}

export const actions = {
  getContacts: async (dispatch) => {
    const resp = await fetch(`${API_BASE}/agendas/${AGENDA}/contacts`);

    if (!resp.ok) {
      dispatch({ type: "set_contacts", payload: [] });
      return;
    }

    const data = await resp.json();
    const contacts = normalizeContacts(data);

    dispatch({ type: "set_contacts", payload: contacts });
  },

  createContact: async (dispatch, form) => {
    const payload = {
      name: form.name,
      full_name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      agenda_slug: AGENDA
    };

    const resp = await fetch(`${API_BASE}/agendas/${AGENDA}/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      console.log("POST error:", resp.status, err);
      return;
    }

    await actions.getContacts(dispatch);
  },

  updateContact: async (dispatch, id, form) => {
    const payload = {
      name: form.name,
      full_name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      agenda_slug: AGENDA
    };

    // intento 1
    let resp = await fetch(`${API_BASE}/contacts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    // intento 2 si falla
    if (!resp.ok) {
      resp = await fetch(`${API_BASE}/agendas/${AGENDA}/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    }

    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      console.log("PUT error:", resp.status, err);
      return;
    }

    await actions.getContacts(dispatch);
  },

  deleteContact: async (dispatch, id) => {
    // intento 1
    let resp = await fetch(`${API_BASE}/contacts/${id}`, {
      method: "DELETE"
    });

    // intento 2 si falla
    if (!resp.ok) {
      resp = await fetch(`${API_BASE}/agendas/${AGENDA}/contacts/${id}`, {
        method: "DELETE"
      });
    }

    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      console.log("DELETE error:", resp.status, err);
      return;
    }

    await actions.getContacts(dispatch);
  }
};