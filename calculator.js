const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');

let num = [];
let op = "";
let str = "";


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

  let btn = req.body.button;
  if (btn === "1" || btn === "2" || btn === "3" || btn === "4" || btn === "5" || btn === "6" || btn === "7" || btn === "8" || btn === "9" || btn === "9")
  {
     num.push(btn);
     console.log(btn);
     str = str + btn;
     res.render("list", {answer: str});
  }
  else if (btn === "%" || btn === "-" || btn === "+" || btn === "*" || btn === "/")
  {
    op = btn;
    num.push(".");
    console.log(btn);
    str = str + btn;
    res.render("list", {answer: str});
  }
  else if (btn === "=")
  {
    let n1 = 0;
    let n2 = 0;
    let i = 0;
    for (i = 0; i < num.length; i++)
    {
      if (num[i] === ".") break;
      n1 = n1 * 10 + parseInt(num[i]);
    }
    i+=1;
    for (; i < num.length; i++)
    {
      n2 = n2 * 10 + parseInt(num[i]);
    }

    let ans = 0;

    switch (op)
    {
      case "+":
        ans = n1+n2;
        break;
      case "-":
        ans = n1 - n2;
        break;
      case "*":
        ans = n1 * n2;
        break;
      case "/":
        ans = n1 / n2;
        break;
      case "%":
        ans = n1 % n2;
        break;
    }
    console.log(num);
    str = "";
    num = [];
    res.render("list", { answer: ans});
  }

});

app.listen(3000, function() {
  console.log("Server got started!");
})
