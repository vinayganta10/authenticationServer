const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

users=[];

app.use(bodyParser.json());

app.post("/signup",(req,res)=>{
    var fields = req.body;
    let userAlreadyExists = false;
    for(let i = 0;i<fields.length;i++){
        if(fields.email ===users[i].email){
            userAlreadyExists = true;
            break;
        }
    }
    if(userAlreadyExists){
        res.sendStatus(400);
    }else{
        users.push(fields);
        res.status(201).send("Signup successfull");
    }
})

app.post("/login",(req,res)=>{
    let user = req.body;
    userFound = null;
    for(let i=0;i<users.length;i++){
        if(users[i].email === user.email && users[i].password === user.password){
            userFound = true;
            break;
        }
    }
    if(userFound){
        res.send("login successfull");
    }else{
        res.sendStatus(401);
    }
})

app.get("/data", (req, res) => {
    var email = req.headers.email;
    var password = req.headers.password;
    let userFound = false;
    for (var i = 0; i<users.length; i++) {
      if (users[i].email === email && users[i].password === password) {
          userFound = true;
          break;
      }
    }
  
    if (userFound) {
      let usersToReturn = [];
      for (let i = 0; i<users.length; i++) {
          usersToReturn.push({
              firstName: users[i].firstName,
              lastName: users[i].lastName,
              email: users[i].email
          });
      }
      res.json({
          users
      });
    } else {
      res.sendStatus(401);
    }
  });
app.listen(port,()=>{
    console.log(`Example listening on ${port}`);
});
