
let router = require('express').Router(); // express 안에 있는 Router 함수 사용

function 로그인했니(요청, 응답, next) { // 미들웨어
    if (요청.user) { 
      next() 
    } 
    else { 
      응답.send('로그인안하셨는데요?') 
    } 
  } 
  
router.use(로그인했니); // 미들웨어 실행 페이지 접속시 무조건 실행

//router.get('/shirts',로그인했니, function(요청, 응답){
  //  응답.send('셔츠 파는 페이지입니다.');
 //});
 
 //이러면 특정 경로만 실행

router.get('/shirts', function(요청, 응답){
   응답.send('셔츠 파는 페이지입니다.');
});

router.get('/pants', function(요청, 응답){
   응답.send('바지 파는 페이지입니다.');
}); 

module.exports = router;
// 어떤 변수를 내보내는 것