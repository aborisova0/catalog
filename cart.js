const cartList = document.querySelector('#cart_list') //товары в корзине
const cartItemCount = document.querySelector('.cart-item__count') //кол-во товаров в корзине
const totalPrice = document.querySelector('.cart__total-sum') //итоговая сумма

let cart = getCart() //массив товаров из LocalStorage

function renderCartCount() {
    cartItemCount.textContent = cart.length
}


function getCart() {
    const row = localStorage.getItem('cart')
    return row ? JSON.parse(row) : []
}

function renderCartList() {
    for (item of cart) {
        cartList.insertAdjacentHTML('beforeend', createCardItem(item))
    }
}

function createCardItem(item) {
    return `
    <div class="cart__row product">
        <div class="product__img"><img src="images/${item.img}.png" alt=""></div>
            <div class="product__text">${item.title}</div>
            <div class="product__counter counter">
                <div class="counter__minus counter-btn" data-action="minus">-</div>
                <div class="counter__num">${item.count}</div>
                <div class="counter__plus counter-btn" data-action="plus">+</div>
            </div>
            <div class="product__price">${item.price}</div>
            <button class="product__delete" data-article="${item.article}"><img src="images/close.svg" alt=""></button>
        </div>
    `
}

cartList.addEventListener('click', editCartItem) 

function editCartItem(e) {
    // console.log(e.target);
    if (e.target.dataset.action === 'plus' || e.target.dataset.action === 'minus') {
        const counterWrapper = e.target.closest('.counter')
        const counterNum = counterWrapper.querySelector('.counter__num')

        const currentCardWrapper = e.target.closest('.product') 
        const currentCardArticle = currentCardWrapper.querySelector('.product__delete').dataset.article
        const currentCard = cart.findIndex(t => t.article === currentCardArticle)

        if (e.target.dataset.action === 'plus') {
            cart[currentCard].count += 1
            counterNum.textContent = cart[currentCard].count
        }

        if (e.target.dataset.action === 'minus' && counterNum.textContent > 1) {
            
            cart[currentCard].count -= 1
            counterNum.textContent = cart[currentCard].count
        }
    }

    if (e.target.classList.contains('product__delete')) {
        const deteleItem = cart.findIndex(t => t.article === e.target.parentNode.dataset.article)
        cart.splice(deteleItem, 1)
        e.target.closest('.cart__row').remove()
        renderCartCount()
    }
    countTotalSum()
    localStorage.setItem('cart', JSON.stringify(cart))
}

function countTotalSum() {
    let sum = 0
    for (item of cart) {
        sum += item.price * item.count
    }
    totalPrice.textContent = `Сумма: ${sum} руб`
}

function init() {
    renderCartList()
    renderCartCount()
    countTotalSum()
}

init()