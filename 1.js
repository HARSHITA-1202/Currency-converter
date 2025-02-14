const BU="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dpdown=document.querySelectorAll(".mine select");
let btn=document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".too");


for(let select of dpdown){
    for(ccode in countryList){
       newop=document.createElement("option");
       newop.innerText=ccode;
       newop.value=ccode;
       if(select.name=="fromm"&&ccode=="USD"){
        newop.selected="selected";
       }
       else if(select.name=="too2"&&ccode=="INR"){
        newop.selected="selected";
       }
       select.append(newop);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    })
}
const updateExchangeRate = async () => {
    let amount = document.querySelector(" input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
      amtVal = 1;
      amount.value = "1";
    }
    const URL = `${BU}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
  
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  };
  
  const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
  };
  
  btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
  });
  
  window.addEventListener("load", () => {
    updateExchangeRate();
  });

