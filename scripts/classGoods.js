
'use strict';

let totalPrice = 0;
let basketProdQuantity = 0;

class Good {
    constructor(title, price, img, discription) {
        this._title = title;
        this._price = price;
        this._img = img;
        this._discription = discription
    }

    getTotalPrice() {
        this._price
    }

    render() {
        return `<div class="featuredItem">
                <div class="featuredImgWrap">
                    <img src="images/featured/${this._img}">
                    <div class="featuredImgDark">
                        <button data-productId=1>
                            <img src="images/cart.svg" alt="">
                            Add to Cart
                        </button>
                    </div>
                </div>
                <div class="featuredData">
                    <div class="featuredName">
                        ${this._title}
                    </div>
                    <div class="featuredText">
                        ${this._discription}
                    </div>
                    <div class="featuredPrice">
                        $${this._price}
                    </div>
                </div>
            </div>`;
    }
};

class CardProducts extends Good {
    constructor(title,price,insertElem,) {
        super(title, price);
        this._quantity = 1;
        this._insertElem = insertElem;
        totalPrice += this._price; 
        this._render = this.render();
        this.totalBasketEl = document.querySelector('.basketTotalValue');
        this.cartIconSpan = document.querySelector('.cartIconWrap_quantity');
        this.totalBasketEl.innerText = String(totalPrice);
        this.cartIconSpan.innerText = String(basketProdQuantity)
    }

    render() {
        return `<div class="basket_product">
                    <div>${this._title}</div>
                    <div class='basket_product_el'>${this._quantity}</div>
                    <div class='basket_product_el'>${this._price}</div>
                    <div class='basket_product_el'>${totalPrice}</div>
               </div>`
    }
};

class GoodsList {
    constructor(goods,captureElem, insertPlace) {
        this._goods = goods;
        this._insertEl = captureElem;
        this._insertPlace = insertPlace
    }

    renderGoodsList() {
        let goodsList = this._goods.map(
            good => good.render()
        ).join('');
        this._insertEl.insertAdjacentHTML(this._insertPlace, goodsList);
    }
}

const newGoodsList = new GoodsList([
    new Good('JACKET', '600', '0.jpg', 'Discription for good 1'),
    new Good('DRESS', '350', '1.jpg', 'Discription for good 1'),
    new Good('SHIRT', '45', '2.jpg', 'Discription for good 1'),
    new Good('HOODIE', '60', '3.jpg', 'Discription for good 1'),
    new Good('POLO', '30', '4.jpg', 'Discription for good 1'),
    new Good('SUIT JACKET', '250', '5.jpg', 'Discription for good 1')
],  document.querySelector('.featuredItems'), 'afterbegin');

newGoodsList.renderGoodsList();

let productsItems = document.querySelectorAll('.featuredImgDark');
let basketIcon = document.querySelector('.cartIconWrap');
let basketEl =document.querySelector('.basket');

productsItems.forEach((product) => {
    product.addEventListener('click', (elemToClick) => {
        let card = elemToClick.currentTarget.parentElement.parentElement;
        let productName = card.querySelector('.featuredName').innerText;
        let pricePerPiece = Number(card.querySelector('.featuredPrice').innerText.match(/(\d+)/)[0]);
        basketProdQuantity++;

        const getBasketProducts = new GoodsList([
            new CardProducts(productName, pricePerPiece, document.querySelector('.basketRow'))
        ], document.querySelector('.basketTotal'), 'beforebegin');
        getBasketProducts.renderGoodsList();
    });

})

basketIcon.addEventListener('click',(click)=>{
    if(basketEl.style.display == 'none' || basketEl.style.display == ''){
        basketEl.style.display = 'block'
    }else{
        basketEl.style.display = 'none'
    }
});

basketEl.addEventListener('click',(click)=>{
    if(basketEl.style.display == 'none' || basketEl.style.display == ''){
        basketEl.style.display = 'block'
    }else{
        basketEl.style.display = 'none'
    }
});