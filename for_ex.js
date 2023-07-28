var 출석부 = ['흥민', '영희', '철수', '재석'];

function 이름찾기(a){
    for(let i = 0 ; i < 출석부.length; i++){
        if(출석부[i] == a){
            console.log('있음')
        }
    }
}

이름찾기('명수')
