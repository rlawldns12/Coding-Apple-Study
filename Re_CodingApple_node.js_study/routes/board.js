
let router = require('express').Router(); // express 안에 있는 Router 함수 사용


router.get('/sports', function(요청, 응답){
    응답.send('스포츠 게시판');
 });
 
router.get('/game', function(요청, 응답){
    응답.send('게임 게시판');
 }); 


module.exports = router;
// 어떤 변수를 내보내는 것