const API = "https://script.google.com/macros/s/AKfycbxnTnZE3CFs4MLIsoVEFP6KPWqsgBB3P7JZ-KyryJf85ESHFTdqtW5YC4eQK3KqhJp6/exec";

function register(){
  fetch(API,{
    method:"POST",
    body: JSON.stringify({
      action:"register",
      name:name.value,
      roll:roll.value,
      regno:regno.value,
      email:email.value,
      password:password.value
    })
  }).then(res=>res.json())
  .then(data=>{
    msg.innerText = data.status==="success" ? "Registration Successful" : "Email already exists";
  });
}

function login(){
  fetch(API,{
    method:"POST",
    body: JSON.stringify({
      action:"login",
      email:email.value,
      password:password.value
    })
  }).then(res=>res.json())
  .then(data=>{
    if(data.status==="success"){
      localStorage.setItem("user", email.value);
      window.location="dashboard.html";
    } else {
      msg.innerText="Invalid Login";
    }
  });
}

function loadProfile(){
  const email = localStorage.getItem("user");
  fetch(API,{
    method:"POST",
    body: JSON.stringify({action:"profile", email:email})
  }).then(res=>res.json())
  .then(data=>{
    const u = data.user;
    name.innerText=u[1];
    roll.innerText=u[2];
    regno.innerText=u[3];
    emailDisplay.innerText=u[4];
    total.innerText=u[11];
    profile.src=u[6] || "https://via.placeholder.com/150";
  });
}

function loadRanking(){
  fetch(API,{
    method:"POST",
    body: JSON.stringify({action:"ranking"})
  }).then(res=>res.json())
  .then(data=>{
    const tbody=document.querySelector("#rankTable tbody");
    data.ranking.forEach((r,i)=>{
      tbody.innerHTML+=`<tr>
        <td>${i+1}</td>
        <td>${r[1]}</td>
        <td>${r[4]}</td>
        <td>${r[11]}</td>
      </tr>`;
    });
  });
}

function logout(){
  localStorage.removeItem("user");
  window.location="index.html";
}
