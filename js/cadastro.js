const name = document.querySelector('#nome-cadastro')
const email = document.querySelector('#email-cadastro')
const password = document.querySelector('#senha-cadastro')

const btnCadastrar = document.querySelector('#btn-cadastrar')

let arrUser = JSON.parse(localStorage.getItem('key.user')) || []


btnCadastrar.addEventListener('click', (event) => {

    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then(() => {
            let user = firebase.auth().currentUser;
            user.updateProfile({
                displayName: name.value
            })
            db.collection('users').doc(email.value).set({
                name: name.value,
                email: email.value,
                password: password.value,
                bag: []
            }).then(function () {
                window.location.replace('login.html')
            }).catch(function (error) {
                console.error("Error adding document: ", error);
            });
            clearInput([name, password, email])
            alert('Usuario cadastrado com sucesso!!')
            user.sendEmailVerification().then(function () {
                //email sent
            })

        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
        });
})

function clearInput(elements) {
    elements.forEach(element => {
        element.value = null
    });
}

function createUser(name, email, password) {
    return {
        id: Date.now().toString(),
        name: name,
        email: email,
        password: password
    }
}