const catalog__row = document.querySelector('.catalog__row')
const cart_counter = document.querySelector('#cart_counter')
const cart_list = document.querySelector('#cart_list')
const cartItemCount = document.querySelector('.cart-item__count')

let counter = 0

let cartItems = [
    {
        title: 'Увлажнитель воздуха STARWIND SHC1322, белый',
        price: 1650,
        img: 'image_1',
        article: '1',
    },
    {
        title: 'Триммер PHILIPS HC3521/15 серебристый/черный',
        price: 2290,
        img: 'image_2',
        article: '2',

    },
    {
        title: 'Фитнес-трекер HONOR Band 5 CRS-B19S, 095,розовый',
        price: 2390,
        img: 'image_3',
        article: '3',
    },
    {
        title: 'Мышь A4TECH Bloody V3, игровая, оптическая, проводная, USB, черный',
        price: 960,
        img: 'image_4',
        article: '4',
    },
    {
        title: 'Мышь A4TECH Bloody V3, игровая, оптическая, проводная, USB, черный',
        price: 960,
        img: 'image_4',
        article: '4',
    },
    {
        title: 'Мышь A4TECH Bloody V3, игровая, оптическая, проводная, USB, черный',
        price: 960,
        img: 'image_4',
        article: '4',
    },
    {
        title: 'Фитнес-трекер HONOR Band 5 CRS-B19S, 095,розовый',
        price: 2390,
        img: 'image_3',
        article: '3',
    }
]

let cart = getCart()

function renderCartCount() {
    cartItemCount.textContent = cart.length
}

function getCart() {
    const row = localStorage.getItem('cart')
    return row ? JSON.parse(row) : []
}

function renderCarts() {
    for (item of cartItems) {
        catalog__row.insertAdjacentHTML('beforeend', createCard(item))
    }
}

function createCard(item) {
    // const inCart = item.inCart ? 'green' : ''
    // const inCartText = item.inCart ? 'В корзине' : 'Добавить в корзину'

    return `
    <div class="catalog__product">
    <div class="product-item">
        <div class="product-item__image">
            <img src="images/${item.img}.png" alt="">
        </div>
        <div class="product-item__body">
            <div class="product-item__text">${item.title}
                </div>
            <div class="product-item__price">${item.price} Р</div>
        </div>

        <div class="btn__cart">
            <button class="btn" data-article="${item.article}">Добавить в корзину</button>
        </div>
    </div>
</div>
    `
}

function init() {
    renderCarts()
    renderCartCount()
}

catalog__row.addEventListener('click', addToCart)

function addToCart(e) {
    const currentCard = cartItems.find(t => t.article === e.target.dataset.article)

    if (e.target.classList.contains("btn")) {
        e.target.classList.add('green')
        e.target.textContent = 'В корзине'
    }

    const cartItem = {
        title: currentCard.title,
        price: currentCard.price,
        img: currentCard.img,
        article: currentCard.article,
    }
    cart.push(cartItem)
    renderCartCount()
    saveCart()
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart))
}

init()