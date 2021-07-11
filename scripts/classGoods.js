
'use strict';

class Good {
    constructor(title,price,img,discription){
        this.title = title;
        this.price = price;
        this.img = img;
        this.discription = discription
    }

    render (){
        return `<div class="featuredItem">
                <div class="featuredImgWrap">
                    <img src="images/featured/${this.img}">
                    <div class="featuredImgDark">
                        <button data-productId=1>
                            <img src="images/cart.svg" alt="">
                            Add to Cart
                        </button>
                    </div>
                </div>
                <div class="featuredData">
                    <div class="featuredName">
                        ${this.title}
                    </div>
                    <div class="featuredText">
                        ${this.discription}
                    </div>
                    <div class="featuredPrice">
                        $${this.price}
                    </div>
                </div>
            </div>`;
    }
};

class GoodsList {
    constructor(goods){
        this.goods = goods;
        this.insertEl = document.querySelector('.featuredItems');
    }

    renderGoodsList(){
        let goodsList = this.goods.map(
             good => good.render()
          ).join('');
        this.insertEl.insertAdjacentHTML('afterbegin', goodsList)
    }
}

const newGoodsList = new GoodsList ([
    new Good ('jacket','$150', '0.jpg', 'Discription for good 1'),
    new Good ('dress', '$150','1.jpg' , 'Discription for good 1'),
    new Good ('shirt', '$150', '2.jpg' , 'Discription for good 1'),
    new Good ('hoodie', '$150', '3.jpg','Discription for good 1'),
    new Good ('polo', '$150', '4.jpg' , 'Discription for good 1'),
    new Good ('suit jacket', '$150','5.jpg', 'Discription for good 1')
]);

newGoodsList.renderGoodsList();
