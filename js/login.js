document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('login');

    loginButton.addEventListener('click', function() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Recupera os usuários do localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Verifica se o usuário e a senha correspondem
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            localStorage.setItem('loggedInUser', username);
            window.location.href = './html/dashboard.html';
        } else {
            alert('Nome de usuário ou senha incorretos. Por favor, tente novamente.');
        }
    });
});
