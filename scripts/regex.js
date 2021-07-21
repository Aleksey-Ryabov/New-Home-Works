'use strict';

let emailReg = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/;

let inputSubscribe = document.getElementById('input_subscribe');
let btnSubscribe = document.querySelector('.subscribeForm_button');

btnSubscribe.addEventListener('click',(event)=>{
    event.preventDefault();
    if(!validate(emailReg, inputSubscribe.value)){
        inputSubscribe.value = '';
        inputSubscribe.placeholder = 'Некорректный Email!';
    }else{
        inputSubscribe.style.color = '#222224';
        inputSubscribe.value = '';
        inputSubscribe.value = 'Форма принята';
    }
});

function validate(regex, input){
    return regex.test(input)
}