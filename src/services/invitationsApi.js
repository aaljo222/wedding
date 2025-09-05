async function asJson(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
  return data;
}

export async function listInvitations() {
  return asJson(await fetch("/api/invitations"));
}

export async function getInvitation(id) {
  return asJson(await fetch(`/api/invitations/${id}`));
}

export async function createInvitation(payload) {
  return asJson(
    await fetch("/api/invitations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
  );
}

export async function updateInvitation(id, payload) {
  return asJson(
    await fetch(`/api/invitations/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
  );
}

export async function removeInvitation(id) {
  return asJson(await fetch(`/api/invitations/${id}`, { method: "DELETE" }));
}
