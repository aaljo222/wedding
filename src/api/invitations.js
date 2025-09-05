const base = "/api/invitations";

async function j(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
  return data;
}

export const listInvitations = () => fetch(base).then(j);

export const createInvitation = (payload) =>
  fetch(base, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then(j);

export const getInvitation = (id) => fetch(`${base}/${id}`).then(j);

export const updateInvitation = (id, patch) =>
  fetch(`${base}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  }).then(j);

export const deleteInvitation = (id) =>
  fetch(`${base}/${id}`, { method: "DELETE" }).then(j);
