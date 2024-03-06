//Unable to require calculate.js due to Jest attempting to use code outside the calculate function

function calculate(house_purchase_price, deposit, annual_interest_rate, loan_term) {
    let principal = house_purchase_price - deposit;
    let monthly_interest_rate = annual_interest_rate / 12 / 100;
    let number_of_payments = loan_term * 12;

    //Return monthly payments
    let monthly_payment= principal * monthly_interest_rate * Math.pow(1 + monthly_interest_rate, number_of_payments) /
        (Math.pow(1 + monthly_interest_rate, number_of_payments) - 1);

    //Correct a rounding error
    return parseFloat(monthly_payment.toFixed(2));
}

test.only('Test that mortgage calculator functions with pre-defined values', () => {
    expect(calculate(180000, 18000, 6, 25)).toBe(1043.77);
});

