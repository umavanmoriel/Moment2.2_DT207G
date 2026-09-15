// Kör funktionen när sidan laddas
window.onload = init;

function init() {
    processWorkData();
}

async function getWorkData() {
    try {
        const response = await fetch('http://localhost:3000/workexperience');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

async function processWorkData() {
    try {
        const result = await getWorkData();
        console.log('Received data:', result);
        displayWorkData(result);
    } catch (error) {
        console.error('Error processing data:', error);
        const workList = document.getElementById('empList');
        if (workList) {
            workList.innerHTML = '<tr><td colspan="8" class="error">Kunde inte hämta data!</td></tr>';
        }
    }
}

function displayWorkData(data) {
    const workList = document.getElementById('empList');
    workList.innerHTML = '';

    if (data.length === 0) {
        workList.innerHTML = '<tr><td colspan="8" style="text-align: center;">Inga arbetserfarenheter finns. Lägg till en!</td></tr>';
        return;
    }

    data.forEach((work) => {
        const raw = document.createElement('tr');

        const idElement = document.createElement('td');
        idElement.textContent = work.id;
        raw.appendChild(idElement);

        const companyElement = document.createElement('td');
        companyElement.textContent = work.companyname;
        raw.appendChild(companyElement);

        const jobtitleElement = document.createElement('td');
        jobtitleElement.textContent = work.jobtitle;
        raw.appendChild(jobtitleElement);

        const locationElement = document.createElement('td');
        locationElement.textContent = work.location;
        raw.appendChild(locationElement);

        const startElement = document.createElement('td');
        startElement.textContent = work.startdate.split('T')[0];
        raw.appendChild(startElement);

        const endElement = document.createElement('td');
        endElement.textContent = work.enddate.split('T')[0];
        raw.appendChild(endElement);

        const descElement = document.createElement('td');
        descElement.textContent = work.description;
        raw.appendChild(descElement);

        const buttonElement = document.createElement('td');
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Radera';
        deleteBtn.onclick = () => deleteWork(work.id);
        buttonElement.appendChild(deleteBtn);
        raw.appendChild(buttonElement);

        workList.appendChild(raw);
    });
}

async function deleteWork(id) {
    if (!confirm('Är du säker på att du vill ta bort denna arbetserfarenhet?')) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/workexperience/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            document.getElementById('message').innerHTML = '<p class="success">Arbetserfarenhet borttagen!</p>';
            processWorkData();
        } else {
            document.getElementById('message').innerHTML = '<p class="error">Kunde inte ta bort</p>';
        }
    } catch (error) {
        console.error('Delete error:', error);
        document.getElementById('message').innerHTML = '<p class="error">Fel vid borttagning</p>';
    }
}