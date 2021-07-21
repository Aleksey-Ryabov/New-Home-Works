
'use strict';

class Good {
    constructor(title, price = 0, img, discription, totalPrice = 0,quantity = 0) {
        this._title = title;
        this._price = price;
        this._img = img;
        this._discription = discription;
        this._totalPrice = totalPrice;
        this._quantity = quantity;
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
        this._basketCancel = document.querySelectorAll('.fa-times-circle');
        this._insertEl.insertAdjacentHTML(this._insertPlace, goodsList);
    }
}

class CardProducts extends Good{
    constructor(insertElem) {
        super();
    }

    render() {
        return `<div class="basket_product">
                    <div>${this._title}</div>
                    <div class='basket_product_el'>${this._quantity}</div>
                    <div class='basket_product_el_price'>${this._price}</div>
                    <div class='basket_product_el'>${this._totalPrice}</div>
                    <div class='basket_product_el_circle'><i class="far fa-times-circle"></i></div>
               </div>`
    }

    getTotalPrice(price = 0,productName){
        this._price = price;
        this._title = productName;
        this._quantity++;
        return this._totalPrice += price;
    }

};

class RemoveFromBasket{
    constructor(elemTarget){
        this._parentElem = elemTarget.parentElement.parentElement;
        this._priceToRemove = Number(this._parentElem.querySelector('.basket_product_el_price').innerText.match(/(\d+)/)[0]);
        this._parentElem.remove();
        basket._totalPrice -= this._priceToRemove;
        basket._quantity--;
        let basketTotalMark = document.querySelector('.basketTotalValue');
        basketTotalMark.innerText = basket._totalPrice
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


const basket = new CardProducts();
newGoodsList.renderGoodsList();

let productsItems = document.querySelectorAll('.featuredImgDark');
let basketIcon = document.querySelector('.cartIcon');
let basketEl = document.querySelector('.basket');
let basketIconQuaintity = document.querySelector('.cartIconWrap_quantity');

productsItems.forEach((product) => {
    product.addEventListener('click', (elemToClick) => {
        let card = elemToClick.currentTarget.parentElement.parentElement;
        let productName = card.querySelector('.featuredName').innerText;
        let pricePerPiece = Number(card.querySelector('.featuredPrice').innerText.match(/(\d+)/)[0]);
        let insertElem = document.querySelector('.basketTotal');
        let basketTotalMark = document.querySelector('.basketTotalValue');
        basket.getTotalPrice(pricePerPiece,productName);
        let markToInsert = basket.render();
        insertElem.insertAdjacentHTML('beforebegin',markToInsert);
        basketTotalMark.innerText = basket._totalPrice;
        basketIconQuaintity.innerText = basket._quantity
    });

})

basketIcon.addEventListener('click',(click)=>{
    if(basketEl.style.display == 'none' || basketEl.style.display == ''){
        basketEl.style.display = 'block'
    }else{
        basketEl.style.display = 'none'
    }
});

basketEl.addEventListener('dblclick',(click)=>{
    if(basketEl.style.display == 'none' || basketEl.style.display == ''){
        basketEl.style.display = 'block'
    }else{
        basketEl.style.display = 'none'
    }
});

basketEl.addEventListener('click',(element)=> {
    let elemTarget = element.target;
    if(elemTarget.classList.contains('fa-times-circle')){
        new RemoveFromBasket(elemTarget);
    }
})