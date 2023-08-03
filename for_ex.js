/*var 출석부 = ['흥민', '영희', '철수', '재석'];

function 이름찾기(a){
    for(let i = 0 ; i < 출석부.length; i++){
        if(출석부[i] == a){
            console.log('있음')
        }
    }
}

이름찾기('재석');


function 구구단(){
    for(let i = 2; i <= 9; i++){
        for(let j = 1; j <= 9;   j++){
            console.log(i * j)
        }
    }
};


구구단()
*/


function 평균구하기(arr,b){
    let result = 0;
    for(let i = 0; i < arr.length; i++){
        result += arr[i]; // arr값을 다 더해줌
    }
    result = result / arr.length;
    if(result < b){
    console.log(`평균 보다 ${b - result}점이 올랐네요`);
    }
    else{
        console.log(`평균 보다 ${result - b}점이 떨어졌네요 재수 ㄱㄱ`);
    }
}

평균구하기([40,40,40],20)