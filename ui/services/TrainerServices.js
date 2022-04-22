export async function getTrainer(username) {
    const response = await fetch(`http://node-api:3080/api/get-trainer`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(username)
    })
    return await response.json();
}

export async function trainClient(data) {
    const response = await fetch(`/api/train-client`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    return await response.json();
}

export async function deleteClient(data) {
    const response = await fetch(`/api/delete-client`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    return await response.json();
}
