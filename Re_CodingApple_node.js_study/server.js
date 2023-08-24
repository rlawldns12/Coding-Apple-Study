const express = require('express'); // express 라이브러리 가져오는 것 
const app = express();
const bodyParser= require('body-parser') 
app.use(bodyParser.urlencoded({extended: true})) // body-paser

const MongoClient = require('mongodb').MongoClient;
app.set('view engine', 'ejs');

let db;
MongoClient.connect('mongodb+srv://admin:1234@cluster0.sib9vi3.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true }, function(에러, client){ // mongo db연결
    if (에러) return console.log(에러);
    db = client.db('todoapp'); //db 폴더 연결

    db.collection('post').insertOne( {이름 : 'John', _id : 100} , function(에러, 결과){ // 데이터 저장 방밥
        console.log('저장완료'); 
      });
    

    app.listen('8080', function(){ // db연결 시 이 문구 뜸 
      console.log('listening on 8080')
    }); 
  })
  


app.get('/pet', function(요청, 응답) {  // /pet이란 주소로 요청
    응답.send('펫용품 사시오')
  })
  
  app.get('/beauty', function(요청, 응답) {  // /pet이란 주소로 요청
    응답.send('뷰티 페이지입니다.')
  })
  
  app.get('/', function(요청, 응답) { 
    응답.sendFile(__dirname +'/index.html') // html 파일 보내기
  });
  
  app.get('/write', function(요청, 응답) { 
    응답.sendFile(__dirname +'/write.html')
  });
  

  app.post('/add', function(요청, 응답){ // input에 적은 내용은 '요청'에 있음
    응답.send('전송완료');
    console.log(요청.body) // 요청.body라고 하면 input 값을 가져올 수 있음 또한 셀럭터 해서 상세 정보 가져 올 수 있음
    db.collection('post').insertOne( { 제목 : 요청.body.title, 날짜 : 요청.body.date } , function(){ // 데이터 db에 저장 방법
      console.log('저장완료')
    });
  });
  
  app.get('/list', function(요청, 응답){
    db.collection('post').find().toArray(function(에러, 결과){ // find + toArray가 db에 있는 데이터 다 꺼내는 것
      console.log(결과)
      응답.render('list.ejs',{posts : 결과 }); // 찾은 데이터들을 ejs로 보내는 법
    });
  })
  