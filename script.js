let members = JSON.parse(localStorage.getItem('members')) || [];
let isAdmin = false;

// Render the leaderboard function
function renderLeaderboard() {
    const tableBody = document.getElementById('leaderboardTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear the table

    members.sort((a, b) => b.points - a.points); // Sort members by points in descending order

    members.forEach((member, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${member.name}</td>
            <td>${member.department}</td>
            <td>${member.points}</td>
          
        `;
        tableBody.appendChild(row);
    });
}

// Admin login function
function adminLogin() {
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;

    if (username === 'admin' && password === '123456') {
        isAdmin = true; // Set admin status to true
        // Show loading animation (optional)
        setTimeout(() => {
            window.location.href = 'admin.html'; // Redirect to admin page
        }, 2000); // 2-second delay for loading
    } else {
        alert('Invalid username or password!');
    }
}

// Admin logout function
function adminLogout() {
    isAdmin = false;
    window.location.href = 'index.html'; // Redirect to home page
}

// Add member function
function addMember() {
    const name = document.getElementById('memberName').value;
    const department = document.getElementById('memberDepartment').value;
    const points = parseInt(document.getElementById('memberPoints').value);

    if (name && department && !isNaN(points)) {
        members.push({ name, department, points });
        localStorage.setItem('members', JSON.stringify(members)); // Save to local storage
        document.getElementById('memberName').value = '';
        document.getElementById('memberDepartment').value = '';
        document.getElementById('memberPoints').value = '';
        renderLeaderboard(); // Refresh the leaderboard
    } else {
        alert('Please fill all fields correctly.');
    }
}

// Edit member function
function editMember(index) {
    const member = members[index]; // Get the member to edit
    const name = prompt("Edit member's name:", member.name);
    const department = prompt("Edit member's department:", member.department);
    const points = parseInt(prompt("Edit member's points:", member.points));

    if (name && department && !isNaN(points)) {
        members[index] = { name, department, points }; // Update member details
        localStorage.setItem('members', JSON.stringify(members)); // Save to local storage
        renderLeaderboard(); // Refresh the leaderboard
    } else {
        alert('Please fill all fields correctly.');
    }
}

// Delete member function
function deleteMember(index) {
    if (confirm('Are you sure you want to delete this member?')) {
        members.splice(index, 1); // Remove member from the array
        localStorage.setItem('members', JSON.stringify(members)); // Save to local storage
        renderLeaderboard(); // Refresh the leaderboard
    }
}

// Initial render of leaderboard
renderLeaderboard();
