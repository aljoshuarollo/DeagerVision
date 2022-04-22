export async function getClient(username) {
    const response = await fetch(`http://node-api:3080/api/get-client`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(username)
    })
    return await response.json();
}

export async function findClient(username) {
    const response = await fetch(`/api/get-client`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(username)
    })
    return await response.json();
}
