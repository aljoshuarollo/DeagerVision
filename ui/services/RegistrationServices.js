export async function registerClient(client) {
    const response = await fetch(`/api/register-client`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(client)
    })
    return await response.json();
}

export async function registerTrainer(trainer) {
    const response = await fetch(`/api/register-trainer`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(trainer)
    })
    return await response.json();
}

export async function checkNewRegistration(credentials) {
    const response = await fetch(`/api/check-new-registration`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(credentials)
    })
    return await response.json();
}
