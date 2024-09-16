const amountInput = document.getElementById('amount');
const balance = document.getElementById('balance');
let defaultMoney = 1000;

function withdrawAmount(){
    const inputValue = amountInput.value.trim();
    const amount = parseFloat(inputValue);

    if(isNaN(amount)){
        alert("Please Enter Valid Amount");
        return;
    }
    
    if(amount > defaultMoney){
        alert("Insufficient Balance");
        amountInput.value = "";
        return;
    }else{
        defaultMoney = defaultMoney - amount;
        alert("Successfully Withdraw: " + `${amount}`)
        amountInput.value = "";
        amountMoney();
    }
}

function depositAmount(){
    const inputValue = amountInput.value.trim();
    const amount = parseFloat(inputValue);

    if(isNaN(amount)){
        alert("Please Enter Valid Amount");
        return;
    }
    
    defaultMoney = defaultMoney + amount;
    alert("Successfully Deposit: " + `${amount}`)
    amountInput.value = "";
    amountMoney();
}

function amountMoney(){
    balance.textContent = defaultMoney;
}

function clearInput(){
    amountInput.value = "";
}

amountMoney();