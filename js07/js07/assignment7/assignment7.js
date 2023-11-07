const message = document.getElementById("message");

// Validation function for name
function validateName(name) {
    if (!name) {
        alert('No Name provided');
        return false;
    } else if (name.length === 1) {
        alert('At least 2 characters of name required');
        return false;
    }
    return true;
}

// Validation function for email
function validateEmail(email) {
    if (email === "") {
        alert('No email provided');
        return false;
    } else if (!email.includes("@")) {
        alert("Invalid email: should contain @");
        return false;
    }
    return true;
}

// Event listener for the "Add" button
document.getElementById("add-button").addEventListener("click", function() {
    const nameValue = document.getElementById("name").value.trim();
    const emailValue = document.getElementById("email").value.trim();

    if (!validateName(nameValue) || !validateEmail(emailValue)) {
        return; 
    }

    message.textContent = "";

    const table = document.querySelector("table tbody");
    const newRow = createTableRow(nameValue, emailValue);
    table.appendChild(newRow);

    message.innerHTML = "Added: " + nameValue.toLowerCase() + " : " + emailValue.toLowerCase();
});

// Event listener for the "Search" button
document.getElementById("search-button").addEventListener("click", function() {
    const searchText = document.getElementById("search-text").value.trim();
    if (!searchText) {
        alert('No search key provided');
        return;
    }

    message.textContent = "";

    const table = document.querySelector("table tbody");
    const foundData = findValue(table, searchText);

    if (foundData.length === 0) {
        message.textContent = searchText + " not found!";
    } else {
        let msg = "";
        foundData.forEach(function (data) {
            msg += "Found=> "+data;
            msg += '<br>';
        });
        message.innerHTML = msg;
    }
});

// Create a table row with name, email, and delete button
function createTableRow(nameValue, emailValue) {
    const newRow = document.createElement("tr");
    const nameC = document.createElement("td");
    const emailC = document.createElement("td");
    const aCell = document.createElement("td");
    const deleteButton = document.createElement("button");

    nameC.textContent = nameValue.toLowerCase();
    emailC.textContent = emailValue.toLowerCase();
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.addEventListener("click", function() {
        deleteFun(newRow);
    });

    aCell.appendChild(deleteButton);

    newRow.appendChild(nameC);
    newRow.appendChild(emailC);
    newRow.appendChild(aCell);

    return newRow;
}

// Find data in the table and return an array of results
function findValue(table, searchText) {
    const foundData = [];

    table.querySelectorAll("tr").forEach(function(row) {
        const cells = Array.from(row.cells).map(cell => cell.textContent.toLowerCase());

        if (cells.some(cellContent => cellContent.includes(searchText.toLowerCase()))) {
            foundData.push("name: " + cells[0] + ", email: " + cells[1]);
        }
    });

    return foundData;
}

// Function to delete a row
function deleteFun(row) {
    row.remove();
}