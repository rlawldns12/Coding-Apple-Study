/*for (let i = 0; i < $('.tab-button').length; i++){

    $('.tab-button').eq(i).on('click', function(){
        탭열기(i)        
    })};
  */


/*$('.list').click(function(e){
  if(e.target == document.querySelectorAll('.tab-button')[0]){
    탭열기(0)
  }
  if(e.target == document.querySelectorAll('.tab-button')[1]){
    탭열기(1)
  }
  if(e.target == document.querySelectorAll('.tab-button')[2]){
    탭열기(2)
  }

})*/

$('.list').click(function(e){
  if(e.target.dataset.number ){
    console.log(e.target.dataset.number)
  }

})


  function 탭열기(숫자){
    $('.tab-button').removeClass('orange');
    $('.tab-button').eq(숫자).addClass('orange');
    $('.tab-content').removeClass('show');
    $('.tab-content').eq(숫자).addClass('show');
  }

  
  let car2 = {name : '소나타',price : 50000}

