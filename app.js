const API = "https://script.google.com/macros/s/AKfycbxLEED3bXq7Evw6PNYZJPW5HtikOrDD9APPt70c5pNCMTgd2op7LOhkyTDjq1hCUkID/exec";

document.addEventListener("DOMContentLoaded", function(){

  const registerBtn = document.getElementById("registerBtn");

  if(registerBtn){
    registerBtn.addEventListener("click", function(){
      register();
    });
  }

});

function register(){

  alert("Button Working"); // <-- Test alert

  const name = document.getElementById("name").value;
  const roll = document.getElementById("roll").value;
  const regno = document.getElementById("regno").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if(!name || !roll || !regno || !email || !password){
    alert("Please fill all fields");
    return;
  }

  fetch(API,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
      action:"register",
      name:name,
      roll:roll,
      regno:regno,
      email:email,
      password:password
    })
  })
  .then(res=>res.json())
  .then(data=>{
    console.log(data);

    if(data.status==="success"){
      localStorage.setItem("user", email);
      window.location="dashboard.html";
    }else{
      alert("Email already exists");
    }
  })
  .catch(error=>{
    console.error(error);
    alert("API Connection Error");
  });
}
