// Kör funktionen när sidan laddas
window.onload = init;

function init() {
    processEmployeeData();
}

async function getEmployeesData() {
    try {
        const response = await fetch('http://localhost:3000/employees');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

async function processEmployeeData() {
    try {
        const result = await getEmployeesData();
        console.log('Received data:', result);
        displayEmployeesData(result);
    } catch (error) {
        console.error('Error processing data:', error);
        const empList = document.getElementById('empList');
        if (empList) {
            empList.innerHTML = '<tr><td colspan="7" class="error">Kunde inte hämta data!</td></tr>';
        }
    }
}

function displayEmployeesData(data) {
    const empList = document.getElementById('empList');
    
    empList.innerHTML = '';
    
    if (data.length === 0) {
        empList.innerHTML = '<tr><td colspan="7" style="text-align: center;">Inga anställda finns. Lägg till en!</td></tr>';
        return;
    }
    
    data.forEach((employee) => {
        const raw = document.createElement('tr');
        
        const idElement = document.createElement('td');
        const idElText = document.createTextNode(employee.ID);
        idElement.appendChild(idElText);
        raw.appendChild(idElement);

        const nameElement = document.createElement('td');
        const nameElText = document.createTextNode(employee.Name);
        nameElement.appendChild(nameElText);
        raw.appendChild(nameElement);

        const lastnameElement = document.createElement('td');
        const lastnameElText = document.createTextNode(employee.Lastname);
        lastnameElement.appendChild(lastnameElText);
        raw.appendChild(lastnameElement);

        const jobtitleElement = document.createElement('td');
        const jobtitleElText = document.createTextNode(employee.Jobtitle);
        jobtitleElement.appendChild(jobtitleElText);
        raw.appendChild(jobtitleElement);

        const locationElement = document.createElement('td');
        const locationElText = document.createTextNode(employee.Location);
        locationElement.appendChild(locationElText);
        raw.appendChild(locationElement);

        const dateofBirthElement = document.createElement('td');
        const dateofBirthElText = document.createTextNode(employee.Dateofbirth);
        dateofBirthElement.appendChild(dateofBirthElText);
        raw.appendChild(dateofBirthElement);
        
        const buttonElement = document.createElement('td');
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Radera';
        deleteBtn.onclick = () => deteleBtn(employee.ID);
        buttonElement.appendChild(deleteBtn);
        raw.appendChild(buttonElement);
        
        empList.appendChild(raw);
    });
}



