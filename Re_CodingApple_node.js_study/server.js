const express = require('express'); // express 라이브러리 가져오는 것 
const app = express();
const bodyParser= require('body-parser') 
app.use(bodyParser.urlencoded({extended: true})) // body-paser
app.use('/public', express.static('public'))
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
require('dotenv').config()


const MongoClient = require('mongodb').MongoClient;
app.set('view engine', 'ejs');

let db;
  
  MongoClient.connect(process.env.DB_URL, function(err, client){
    if (err) return console.log(err)
    db = client.db('todoapp');
    app.listen(process.env.PORT, function() {
      console.log('listening on 8080')
    })
  }) 
  


app.get('/pet', function(요청, 응답) {  // /pet이란 주소로 요청
    응답.send('펫용품 사시오')
  })
  
  app.get('/beauty', function(요청, 응답) {  // /pet이란 주소로 요청
    응답.send('뷰티 페이지입니다.')
  })
  
  app.get('/', function(요청, 응답) { 
    응답.render('index.ejs'); // 경로를 올바르게 연결
  });
    
  app.get('/write', function(요청, 응답) { 
    응답.render('write.ejs'); // 경로를 올바르게 연결
  });
    

      

  app.get('/list', function(요청, 응답){
    db.collection('post').find().toArray(function(에러, 결과){ // find + toArray가 db에 있는 데이터 다 꺼내는 것
      console.log(결과)
      응답.render('list.ejs',{posts : 결과 }); // 찾은 데이터들을 ejs로 보내는 법
    });
  })
  
  app.get('/search', (요청, 응답)=>{

    var 검색조건 = [
      {
        $search: {
          index: 'titleSearch',
          text: {
            query: 요청.query.value,
            path: '제목'  // 제목날짜 둘다 찾고 싶으면 ['제목', '날짜']
          }
        }
      },
      //{ $sort : { _id : 1 } },
      //{ $limit : 10 },
      //{ $project : { 제목 : 1, _id : 0 } }
   // 검색 조건
    ] 
    console.log(요청.query);
    db.collection('post').aggregate(검색조건).toArray((에러, 결과)=>{
      console.log(결과)
      응답.render('search.ejs', {posts : 결과})
    })
  })
      


  

  app.get('/detail/:id', function(요청, 응답){
    db.collection('post').findOne({ _id : parseInt(요청.params.id) }, function(에러, 결과){
      응답.render('detail.ejs', {data : 결과} )
    })
  });
  

  app.get('/edit/:id', function(요청, 응답){
    db.collection('post').findOne({ _id : parseInt(요청.params.id) }, function(에러, 결과){
      응답.render('edit.ejs', { post : 결과 })
    })
    
  });
  
  app.put('/edit', function(요청, 응답){ 
    db.collection('post').updateOne( {_id : parseInt(요청.body.id) }, {$set : { 제목 : 요청.body.title , 날짜 : 요청.body.date }}, 
      function(){ 
      
      console.log('수정완료') 
      응답.redirect('/list') 
    }); 
  }); 
  

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(session({secret : '비밀코드', resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session()); 


app.get('/login', function(요청, 응답){
  응답.render('login.ejs')
});

app.post('/login', passport.authenticate('local', {failureRedirect : '/fail'}), function(요청, 응답){
  응답.redirect('/')
});

app.get('/mypage', 로그인했니, function (요청, 응답) {
  console.log(요청.user);
  응답.render('mypage.ejs', { 사용자: 요청.user })
}) 

function 로그인했니(요청, 응답, next) { // 미들웨어
  if (요청.user) { 
    next() 
  } 
  else { 
    응답.send('로그인안하셨는데요?') 
  } 
} 













passport.use(new LocalStrategy({ // 로그인 후 세션을 저장할 것인지
  usernameField: 'id', // 유저가 입력한 항목 정의 
  passwordField: 'pw',
  session: true,
  passReqToCallback: false,
}, function (입력한아이디, 입력한비번, done) { // 입력 id/pw 검증 코드
  //console.log(입력한아이디, 입력한비번);
  db.collection('login').findOne({ id: 입력한아이디 }, function (에러, 결과) {
    if (에러) return done(에러)

    if (!결과) return done(null, false, { message: '존재하지않는 아이디요' })
    if (입력한비번 == 결과.pw) {
      return done(null, 결과)
    } else {
      return done(null, false, { message: '비번틀렸어요' })
    }
  })
}));
// 로그인 구조

// 로그인 성공 -> 세션정보를 만듦 -> 마이페이지 방문시 세션검사

passport.serializeUser(function (user, done) {
  done(null, user.id)
});

passport.deserializeUser(function (아이디, done) {
  db.collection('login').findOne({ id: 아이디 }, function (에러, 결과) {
    done(null, 결과)
  })
}); 

app.post('/register', function (요청, 응답) {
  db.collection('login').insertOne({ id: 요청.body.id, pw: 요청.body.pw }, function (에러, 결과) {
    응답.redirect('/')
  })
})

app.post('/add', function (요청, 응답) {
  console.log(요청.user._id)
  응답.send('전송완료');
  db.collection('counter').findOne({ name: '게시물갯수' }, function (에러, 결과) {
    var 총게시물갯수 = 결과.totalPost;
    var post = { _id: 총게시물갯수 + 1, 작성자: 요청.user._id , 제목: 요청.body.title, 날짜: 요청.body.date }
    db.collection('post').insertOne( post , function (에러, 결과) {
      db.collection('counter').updateOne({ name: '게시물갯수' }, { $inc: { totalPost: 1 } }, function (에러, 결과) {
        if (에러) { return console.log(에러) }
      })
    });
  });
});

app.delete('/delete', function (요청, 응답) {
  console.log('삭제요청들어옴');
  console.log(요청.body);
  요청.body._id = parseInt(요청.body._id);

  let 삭제할데이터 = {_id : 요청.body._id, 작성자 : 요청.user._id}

  db.collection('post').deleteOne(삭제할데이터, function (에러, 결과) {
    console.log('삭제완료');
    if (결과) {console.log(결과)}
    응답.status(200).send({ message: '성공했습니다' });
  })
});

//app.get('/shop/shirts', function(요청, 응답){
  //응답.send('셔츠 파는 페이지입니다.');
//});

//app.get('/shop/pants', function(요청, 응답){
  //응답.send('바지 파는 페이지입니다.');
//}); 

app.use('/shop',require('./routes/shop.js'));
app.use('/board/sub',require('./routes/board.js'));

// 저 경로의 파일을 첨부하낟.
// use는 미들웨어 할때  '/'로 할때 router 실행

// 요청과 응답 중간에 있는 거

// 중복되는 url은 라우터로 정리 /shop식으로 직관적으로 만들기 

