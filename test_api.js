const fs = require('fs');
fetch('http://localhost:3000/api/create-trial-user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'test12349@prova.it', password: 'password', fullName: 'Test', salonName: 'Test' })
})
.then(res => res.text())
.then(text => fs.writeFileSync('log_api2.html', text, 'utf8'))
.catch(err => console.error('ERROR:', err));
