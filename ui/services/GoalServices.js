export async function createGoal(goal) {
    const response = await fetch(`/api/create-goal`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(goal)
    })
    return await response.json();
}

export async function editGoalDescription(goal) {
    const response = await fetch(`/api/edit-goal-description`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(goal)
    })
    return await response.json();
}

export async function editGoalDeadline(goal) {
    const response = await fetch(`/api/edit-goal-deadline`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(goal)
    })
    return await response.json();
}

export async function addGoalComment(goal_data) {
    const response = await fetch('/api/add-goal-comment', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(goal_data)
    })
    return await response.json();
}

export async function completeGoal(goal_data) {
    const response = await fetch('/api/complete-goal', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(goal_data)
    })
    return await response.json();
}

export async function deleteGoal(goal) {
    const response = await fetch('/api/delete-goal', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(goal)
    })
    return await response.json();
}

export async function checkGoalName(goal_data) {
    const response = await fetch('/api/check-goal-name', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(goal_data)
    })
    return await response.json();
}

export async function getPriorityGoal(username) {
    const response = await fetch('http://node-api:3080/api/get-priority-goal', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(username)
    })
    return await response.json();
}

export async function checkGoalDeadline(username) {
    const response = await fetch('http://node-api:3080/api/check-goal-deadline', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(username)
    })
    return await response.json()
}

export async function findGoalDeadline(username) {
    const response = await fetch('/api/check-goal-deadline', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(username)
    })
    return await response.json()
}