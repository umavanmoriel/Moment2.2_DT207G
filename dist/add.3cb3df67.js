const form = document.getElementById('form');
if (form) form.onsubmit = function() {
    const companyname = document.getElementById('companyname').value.trim();
    const jobtitle = document.getElementById('jobtitle').value.trim();
    const location = document.getElementById('location').value.trim();
    const startdate = document.getElementById('startdate').value;
    const enddate = document.getElementById('enddate').value;
    const description = document.getElementById('description').value.trim();
    let errors = [];
    if (!companyname) errors.push("F\xf6retag saknas");
    if (!jobtitle) errors.push('Jobbtitel saknas');
    if (!location) errors.push('Plats saknas');
    if (!startdate) errors.push('Startdatum saknas');
    if (!enddate) errors.push('Slutdatum saknas');
    if (!description) errors.push('Beskrivning saknas');
    const messageDiv = document.getElementById('message');
    if (errors.length > 0) {
        messageDiv.innerHTML = '<div class="error">' + errors.join('<br>') + '</div>';
        return false;
    }
    const newWork = {
        companyname,
        jobtitle,
        location,
        startdate,
        enddate,
        description
    };
    (async function() {
        try {
            const response = await fetch('http://localhost:3000/workexperience', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newWork)
            });
            if (response.ok) setTimeout(function() {
                window.location.href = 'index.html';
            }, 500);
            else {
                const data = await response.json();
                const fel = data.errors ? data.errors.join('<br>') : data.error || 'Fel vid sparande';
                messageDiv.innerHTML = '<div class="error">' + fel + '</div>';
            }
        } catch (error) {
            messageDiv.innerHTML = '<div class="error">Kunde inte ansluta till servern</div>';
        }
    })();
    return false;
};

//# sourceMappingURL=add.3cb3df67.js.map
