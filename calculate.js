document.getElementById("calculator").addEventListener("click", function(event){
    //Prevent default handling of the mortgage calculator, so it can be handled client-side
    event.preventDefault()
});

document.getElementById("5pc_deposit").addEventListener("click", function(){
    let purchase_price =  document.getElementById("purchase_price").value
    //Calculate 5% of purchase price and set the value of the deposit input.
    document.getElementById("deposit").value = 5 * purchase_price / 100
});

document.getElementById("10pc_deposit").addEventListener("click", function(){
    let purchase_price =  document.getElementById("purchase_price").value
    //Calculate 10% of purchase price and set the value of the deposit input.
    document.getElementById("deposit").value = 10 * purchase_price / 100
});

document.getElementById("15pc_deposit").addEventListener("click", function(){
    let purchase_price =  document.getElementById("purchase_price").value
    //Calculate 15% of purchase price and set the value of the deposit input.
    document.getElementById("deposit").value = 15 * purchase_price / 100
});