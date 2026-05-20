const form = document.getElementById('form');
if (form) {
    form.onsubmit = function() {
        
        const Name = document.getElementById('Name').value.trim();
        const Lastname = document.getElementById('Lastname').value.trim();
        const Jobtitle = document.getElementById('Jobtitle').value.trim();
        const Location = document.getElementById('Location').value.trim();
        const Dateofbirth = document.getElementById('Dateofbirth').value;
        
        let errors = [];
        
        if (!Name) errors.push('Förnamn saknas');
        if (!Lastname) errors.push('Efternamn saknas');
        if (!Jobtitle) errors.push('Jobbtitel saknas');
        if (!Location) errors.push('Plats saknas');
        if (!Dateofbirth) errors.push('Födelsedatum saknas');
        
        const messageDiv = document.getElementById('message');
        
        if (errors.length > 0) {
            messageDiv.innerHTML = '<div class="error"> ' + errors.join('<br>') + '</div>';
            return false;
        }
        
        const newEmployee = { Name, Lastname, Jobtitle, Location, Dateofbirth };
        
        (async function() {
            try {
                const response = await fetch('http://localhost:3000/employees', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newEmployee)
                });
                
                if (response.ok) {
                    setTimeout(function() {
                        window.location.href = 'index.html';
                    }, 500);
                } else {
                    messageDiv.innerHTML = '<div class="error">Fel vid sparande</div>';
                }
            } catch (error) {
                messageDiv.innerHTML = '<div class="error">Kunde inte ansluta till servern</div>';
            }
        })();
        
        return false;
    };
}