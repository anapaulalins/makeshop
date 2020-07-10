const slider = document.querySelector('.slider').children
const btnPrev = document.querySelector('#btn-prev')
const btnNext = document.querySelector('#btn-next')
let index = 0


const btnBars = document.querySelector('#bars')
const menu = document.querySelector('.menu-ul')


const countBag = document.querySelector('#count-bag')
const queridinhosContainer = document.querySelector('.queridinhos-content')
const btnBag = document.querySelector('#btn-bag')
const elementsCart = document.querySelector('.elements-cart')
const totalCart = document.querySelector('.total-cart')
const cart = document.querySelector('.cart-bag')
const elementTotalCart = document.querySelector('#element-total')
const limparTudo = document.querySelector('#limpar-tudo')

const login = document.querySelector('.login')
const singOut = document.querySelector('#sing-out')
const singInName = document.querySelector('.sing-in p')
const singIn = document.querySelector('.sing-in')

let userSelect

function getUserNow() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            login.style.display = 'none'
            singInName.innerHTML = `Olá, ${user.displayName}`

            userSelect = db.collection("users").doc(user.email)

            count()
            calTotal()
            createElementBag()

        } else {
            singIn.style.display = 'none'
        }
    });
}


singOut.addEventListener('click', () => {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        singIn.style.display = 'none'
        login.style.display = 'block'
        // elementTotalCart.innerHTML = 0
        // countBag.innerHTML = 0
        elementsCart.style.display = 'none'
    }).catch(function (error) {
        // An error happened.
    });
})

login.addEventListener('click', (event) => {
    window.location.replace('login.html')
})

btnBag.addEventListener('click', () => {
    cart.classList.toggle('active')
})

limparTudo.addEventListener('click', () => {
    clearAll()
})

queridinhosContainer.addEventListener('click', (event) => {
    getNamePriceImgElement()
})

function getNamePriceImgElement() {
    let nome
    let price
    let imgSrc
    if (event.target.className.toLowerCase() === 'compra-content') {
        const boxContent = event.target.previousElementSibling.children
        Array.from(event.target.parentElement.children).forEach(e => {
            if (e.tagName.toLowerCase() === 'img') {
                let src = e.src
                let i = src.indexOf('imgs')
                imgSrc = src.slice(i)
            }
        })
        Array.from(boxContent).forEach(e => {
            if (e.className === 'name-box') {
                nome = e.textContent
            }
            if (e.className === 'price-box') {
                let p = e.textContent
                price = p.substring(1)
            }
        })
    }
    userSelect.update({
        bag: firebase.firestore.FieldValue.arrayUnion(createObj(nome, price, imgSrc))
    });
    createElementBag()
    count()
    calTotal()
}

function createObj(name, price, imgSrc) {
    return {
        id: Date.now().toString(),
        name: name,
        price: Number(price),
        imgName: imgSrc
    }
}

function count() {
    userSelect.get().then((doc) => {
        countBag.innerHTML = doc.data().bag.length
    })

}

function createElementBag() {
    clear(elementsCart)
    userSelect.get().then((doc) => {
        let arrBag = doc.data().bag
        console.log(arrBag)
        arrBag.forEach(element => {
            const elementBag = document.createElement('div')
            elementBag.classList.add('element-bag')
            elementBag.dataset.id = element.id
            const img = `${element.imgName}`
            elementBag.innerHTML = `<img src=${img} alt="">
            <div class="element-details">
                <span id="element-name">${element.name}</span>
                <span id="element-price">$${element.price}</span>
            </div>
            <i class="fas fa-trash" id="element-trash"></i>`

            elementsCart.appendChild(elementBag)
            trash(elementBag)
        })
    })
}

function trash(element) {
    let trashElement
    element.addEventListener('click', (event) => {
        if (event.target.id.toLowerCase() === 'element-trash') {
            trashElement = event.target
            selecid = trashElement.parentElement.dataset.id
            userSelect.get().then((doc) => {
                let selectedElement = doc.data().bag.find(e => e.id === selecid)
                console.log(selectedElement)
                userSelect.update({
                    bag: firebase.firestore.FieldValue.arrayRemove(selectedElement)
                });
                calTotal()
                count()
            })
            trashElement.parentElement.style.display = 'none'
        }
    })
}

function calTotal() {
    let total = 0
    userSelect.get().then((doc) => {
        let arrBag = doc.data().bag
        arrBag.forEach(element => {
            total = total += Number(element.price)
            console.log(total)
        })
        elementTotalCart.innerHTML = `$${parseFloat(total).toFixed(2)}`
    })
}


function clearAll() {
    elementsCart.style.display = 'none'
    userSelect.update({
        bag: firebase.firestore.FieldValue.delete()
    });
    // elementTotalCart.innerHTML = 0
    // countBag.innerHTML = 0
}

function clear(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}
// menu
btnBars.addEventListener('click', () => {
    menu.classList.toggle('active')
})
// end menu

// start slider
btnPrev.addEventListener('click', () => {
    prev()
})
btnNext.addEventListener('click', () => {
    next()
})

function prev() {
    if (index == 0) {
        index = slider.length - 1
    } else {
        index--
    }
    changeSlider()
}

function next() {
    if (index == slider.length - 1) {
        index = 0
    } else {
        index++
    }
    changeSlider()
}


function changeSlider() {
    Array.from(slider).forEach(e => e.classList.remove('active'))
    slider[index].classList.add('active')
}
// end slider

getUserNow()
changeSlider()



