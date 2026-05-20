// Kör funktionen när sidan laddas
window.onload = init;
function init() {
    processEmployeeData();
}
async function h\u00e4mtaAnst\u00e4llda() {
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
        const result = await h\u00e4mtaAnst\u00e4llda();
        console.log('Received data:', result);
        visaAnst\u00e4llda(result);
    } catch (error) {
        console.error('Error processing data:', error);
        const empList = document.getElementById('empList');
        if (empList) empList.innerHTML = '<tr><td colspan="7" class="error">Kunde inte h\xe4mta data. \xc4r servern ig\xe5ng?</td></tr>';
    }
}
function visaAnst\u00e4llda(data) {
    const empList = document.getElementById('empList');
    empList.innerHTML = '';
    if (data.length === 0) {
        empList.innerHTML = '<tr><td colspan="7" style="text-align: center;">Inga anst\xe4llda finns. L\xe4gg till en!</td></tr>';
        return;
    }
    data.forEach((anst\u00e4lld)=>{
        const rad = document.createElement('tr');
        const idCell = document.createElement('td');
        idCell.textContent = anst\u00e4lld.ID;
        rad.appendChild(idCell);
        const nameCell = document.createElement('td');
        nameCell.textContent = anst\u00e4lld.Name;
        rad.appendChild(nameCell);
        const lastnameCell = document.createElement('td');
        lastnameCell.textContent = anst\u00e4lld.Lastname;
        rad.appendChild(lastnameCell);
        const jobtitleCell = document.createElement('td');
        jobtitleCell.textContent = anst\u00e4lld.Jobtitle;
        rad.appendChild(jobtitleCell);
        const locationCell = document.createElement('td');
        locationCell.textContent = anst\u00e4lld.Location;
        rad.appendChild(locationCell);
        const dateCell = document.createElement('td');
        dateCell.textContent = anst\u00e4lld.Dateofbirth;
        rad.appendChild(dateCell);
        const actionCell = document.createElement('td');
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "\uD83D\uDDD1\uFE0F Ta bort";
        deleteBtn.onclick = ()=>taBort(anst\u00e4lld.ID);
        actionCell.appendChild(deleteBtn);
        rad.appendChild(actionCell);
        empList.appendChild(rad);
    });
}
async function taBort(id) {
    if (!confirm("\xc4r du s\xe4ker p\xe5 att du vill ta bort denna anst\xe4lld?")) return;
    try {
        const response = await fetch(`http://localhost:3000/employees/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            document.getElementById('meddelande').innerHTML = '<p class="success">\u2705 Anst\xe4lld borttagen!</p>';
            processEmployeeData();
        } else document.getElementById('meddelande').innerHTML = '<p class="error">\u274C Kunde inte ta bort</p>';
    } catch (error) {
        console.error('Delete error:', error);
        document.getElementById('meddelande').innerHTML = '<p class="error">\u274C Fel vid borttagning</p>';
    }
}
const form = document.getElementById('form');
if (form) form.onsubmit = async (e)=>{
    e.preventDefault();
    const Name = document.getElementById('Name').value.trim();
    const Lastname = document.getElementById('Lastname').value.trim();
    const Jobtitle = document.getElementById('Jobtitle').value.trim();
    const Location = document.getElementById('Location').value.trim();
    const Dateofbirth = document.getElementById('Dateofbirth').value;
    let fel = [];
    if (!Name) fel.push("F\xf6rnamn saknas");
    if (!Lastname) fel.push('Efternamn saknas');
    if (!Jobtitle) fel.push('Jobbtitel saknas');
    if (!Location) fel.push('Plats saknas');
    if (!Dateofbirth) fel.push("F\xf6delsedatum saknas");
    if (fel.length > 0) {
        document.getElementById('meddelande').innerHTML = `<div class="error">\u{274C} ${fel.join('<br>')}</div>`;
        return;
    }
    const nyAnstalld = {
        Name,
        Lastname,
        Jobtitle,
        Location,
        Dateofbirth
    };
    try {
        const response = await fetch('http://localhost:3000/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nyAnstalld)
        });
        if (response.ok) {
            document.getElementById('meddelande').innerHTML = '<div class="success">\u2705 Sparad! Omdirigerar...</div>';
            setTimeout(()=>{
                window.location.href = 'index.html';
            }, 1000);
        } else {
            const felData = await response.json();
            if (felData.errors) document.getElementById('meddelande').innerHTML = `<div class="error">\u{274C} ${felData.errors.join('<br>')}</div>`;
            else document.getElementById('meddelande').innerHTML = '<div class="error">\u274C Fel vid sparande</div>';
        }
    } catch (error) {
        console.error('Post error:', error);
        document.getElementById('meddelande').innerHTML = '<div class="error">\u274C Kunde inte ansluta till servern</div>';
    }
};

//# sourceMappingURL=add.7b30099c.js.map
