let members = JSON.parse(localStorage.getItem('members')) || [];
let isAdmin = true; // Set to true, since this page is for admin access only

// Render the leaderboard function
// Render the leaderboard function
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
            <td>
                <button onclick="editMember(${index})">Edit</button>
                <button onclick="deleteMember(${index})" title="Delete Member">
                    <img src="file:///E:/Enacuts/Wepsite/icon/trash-can-icon-3.png" alt="Delete" style="width: 20px; height: 20px;">
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}



// Admin logout function
function adminLogout() {
    isAdmin = false; // Reset admin status
    window.location.href = 'login.html'; // Redirect to login page
}

// Add member function
function addMember() {
    const name = document.getElementById('memberName').value;
    const department = document.getElementById('memberDepartment').value;
    const points = parseInt(document.getElementById('memberPoints').value);

    if (isAdmin) { // Only allow admin to add members
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
    } else {
        alert('You do not have permission to add members.');
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

// Initial render of leaderboard on admin page load
renderLeaderboard();
