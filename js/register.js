document.addEventListener('DOMContentLoaded', function() {
    const registerButton = document.getElementById('register');

    registerButton.addEventListener('click', function() {
        const newUsername = document.getElementById('new-username').value;
        const newPassword = document.getElementById('new-password').value;

        // Recupera os usuários do localStorage ou inicializa um array vazio se não houver usuários ainda
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Verifica se o nome de usuário já existe
        const userExists = users.some(user => user.username === newUsername);

        if (userExists) {
            alert('Nome de usuário já existe. Por favor, escolha outro.');
        } else {
            // Adiciona o novo usuário à lista
            users.push({username: newUsername, password: newPassword});

            // Atualiza o localStorage com a nova lista de usuários
            localStorage.setItem('users', JSON.stringify(users));

            alert('Registro bem sucedido! Você pode fazer login agora.');
            window.location.href = '../login.html';
        }
    });
});
