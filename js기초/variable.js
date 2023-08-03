let age = 18;

const place = '대구';

let 예금액 = 60000;
let 미래예금액 = 0;


if(예금액 < 50000){
    미래예금액 = 예금액 * 1.15 * 1.15;
    //console.log(미래예금액)
}

if(예금액 >= 50000){
    미래예금액 =  1.2 * 1.2 * 예금액;
    //console.log(미래예금액);
}

let first = 1000;

let second = first / 1.5;

let third = second / 1.5;

let sum = first + second + third;



function 함수(num1,num2){
    let min = num1 * 60;
    let result = (min + num2) * 1000;
    return parseInt(result)
}

console.log(함수(2,10))

function 함수2(num1,bool){
    let discount = num1 - (num1 * 0.1) ;
    if(bool === true){
        discount = discount - 1.5;
    }
    return discount;
}

console.log(함수2(10,false));