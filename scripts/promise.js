
    'use strict';

    class Product {
        constructor(massive){
            this._id = massive.id_product;
            this._price = massive.price;
            this._productName = massive.product_name
        }
        getMarkToInsert(){
            return `
                <div class='product_info' id='${this._id}'>
                    <div>${this._productName}</div>
                    <div>$${this._price}</div>
                </div>
                `
        }
    }

    class ProductsList {
        constructor(insertElem){
            this._products = [];
            this._insertElem = insertElem
        }

        addToMassive(elem){
            this._products.push(elem)
        }

        createArray(){
            const productsToInsert = this._products.map(
                element => element.getMarkToInsert()
                ).join('');

                this._insertElem.insertAdjacentHTML('afterbegin', productsToInsert)
        }
    }

    const productsList = new ProductsList(document.querySelector('.products'))

    fetch('https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json')
    .then((response)=>{
        return response.json();
    })
    .then((response2)=>{
        response2.forEach((elem)=> {
           productsList.addToMassive(new Product(elem))
        })
        productsList.createArray();
    })
    .catch((error)=>{
        console.log(error)
    })

    console.log(productsList)
