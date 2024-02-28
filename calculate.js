document.getElementById("calculate").addEventListener("click", function(event){
    //Prevent default handling of the mortgage calculator, so it can be handled client-side
    event.preventDefault()
});

document.getElementById("5pc_deposit").addEventListener("click", function(event){
    event.preventDefault()
    let purchase_price =  document.getElementById("purchase_price").value
    //Calculate 5% of purchase price and set the value of the deposit input.
    document.getElementById("deposit").value = Math.round(5 * purchase_price / 100);
});

document.getElementById("10pc_deposit").addEventListener("click", function(event){
    event.preventDefault()
    let purchase_price =  document.getElementById("purchase_price").value
    //Calculate 10% of purchase price and set the value of the deposit input.
    document.getElementById("deposit").value = Math.round(10 * purchase_price / 100);
});

document.getElementById("15pc_deposit").addEventListener("click", function(event){
    event.preventDefault()
    let purchase_price =  document.getElementById("purchase_price").value
    //Calculate 15% of purchase price and set the value of the deposit input.
    document.getElementById("deposit").value = Math.round(15 * purchase_price / 100);
});

function calculate(purchase_price, deposit, annual_interest_rate, loan_term) {
    //Subtract the deposit from the total purchase price to make the principal payment
    let principal = purchase_price - deposit;
    //Divide the Annual Interest Rate by 12 (months) and then convert to a decimal by dividing by 100.
    let monthly_interest_rate = annual_interest_rate / 12 / 100;
    //To get the total number of payments, the term of the loan (in years) is multiplied by 12.
    let number_of_payments = loan_term * 12;

    //Return monthly payments
    //The formula for reaching the monthly payment is the principle x monthly interest rate.
    //This value is then divided by (1 + monthly interest rate) to the power of the number of payments.
    //1 is then subtracted from the compounded interest, and then this value is then divided by the
    // principle x monthly interest rate.
    let monthly_payment = principal * monthly_interest_rate *
        Math.pow(1 + monthly_interest_rate, number_of_payments) /
        (Math.pow(1 + monthly_interest_rate, number_of_payments) - 1);

    //Correct a rounding error
    return parseFloat(monthly_payment.toFixed(2));
}

module.exports = calculate;