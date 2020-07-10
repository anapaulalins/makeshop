const btnEntrar = document.querySelector('#btn-entrar-login')

const email = document.querySelector('#email-login')
const password = document.querySelector('#senha-login')

const btnCadastro = document.querySelector('#btn-cadastro')

btnEntrar.addEventListener('click', (event) => {
    event.preventDefault()
    firebase.auth().signInWithEmailAndPassword(email.value, password.value).then(() => {
        window.location.replace('index.html')

    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        alert('Erro ao Logar! Email ou senha inválido!')
    });
})


btnCadastro.addEventListener('click', () => {
    window.location.replace('cadastro.html')
})