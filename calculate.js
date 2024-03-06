document.getElementById("calculate").addEventListener("click", function(event){
    //Prevent default handling of the mortgage calculator, so it can be handled client-side
    event.preventDefault()
    display_results();
    document.getElementById("results").style.display = 'initial';
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

function display_results() {
    let purchase_price = document.getElementById("purchase_price").value
    let deposit = document.getElementById("deposit").value
    let annual_interest_rate = document.getElementById("annual_interest_rate").value
    let mortgage_term = document.getElementById("mortgage_term").value

    if(document.getElementById("legal").checked) {
        let monthly_payment = calculate(purchase_price, deposit, annual_interest_rate, mortgage_term);
        document.getElementById("monthly_payment_result").innerText = '£' + monthly_payment.toFixed(2);
        document.getElementById("total_payment_result").innerText = '£' + ((monthly_payment * 12) * mortgage_term).toFixed(2);
        document.getElementById("total_interest_payment").innerText = '£' + ((monthly_payment * annual_interest_rate / 12) * mortgage_term).toFixed(2);

        displayChart(purchase_price, monthly_payment, annual_interest_rate, mortgage_term);
    } else {
        alert("Please allow us to use your data to calculate your mortgage repayments!")
    }
}

function displayChart(purchase_price, monthly_payment, annual_interest_rate, mortgage_term) {
    console.log(purchase_price, monthly_payment, annual_interest_rate, mortgage_term);
    let total_payment_result = document.getElementById("total_payment_result").innerText.slice(1);
    let interest_payments = (monthly_payment * annual_interest_rate / 12).toFixed(2) * mortgage_term;

    function calculate_remaining_balance(total_payment_result, mortgage_term, monthly_payment) {
        let array = [];
        let balance = total_payment_result

        for(let i = 0; i < mortgage_term; i++) {
            balance = parseInt((balance - monthly_payment).toFixed(2));
            array.push(balance);
        }

        console.debug(array)
        return array;
    }

    function calculate_interest_payments(total_payment_result, mortgage_term, monthly_payment) {
        let array = [];
        let balance = total_payment_result

        for(let i = 0; i < mortgage_term; i++) {
            balance = parseInt((balance - monthly_payment).toFixed(2));
            array.push(balance);
        }

        console.debug(array)
        return array;
    }

    Highcharts.chart('chart', {

        title: {
            text: 'Mortgage Repayment Results',
            align: 'left'
        },

        subtitle: {
            text: "You'll repay a total of £" + total_payment_result +
                " over a period of " + document.getElementById("mortgage_term").value +
                ' years, based upon a ' + annual_interest_rate + '% annual interest rate.',
            align: 'left'
        },

        yAxis: {
            title: {
                text: 'GBP £'
            }
        },

        xAxis: {
            accessibility: {
                rangeDescription: 'Range: ' + mortgage_term + ' years'
            }
        },

        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: new Date().getFullYear()
            }
        },

        series: [{
            name: 'Monthly (Principal) Repayments',
            // Array.from function inspired by JSOwl to prevent the need for a separate function
            // Aruchamy, V. (2022). How To Create An Array With The Same Elements Repeated Multiple Times In JavaScript - Definitive Guide - Js Owl. [online] www.jsowl.com. Available at: https://www.jsowl.com/create-an-array-with-the-same-elements-repeated-multiple-times-in-javascript/ [Accessed 28 Feb. 2024].
            data: Array.from({length: mortgage_term}, () => monthly_payment)
        }, {
            name: 'Interest Payments',
            data: Array.from({length: mortgage_term}, () => parseFloat((interest_payments / 12).toFixed(2)))
        }, {
            name: 'Balance Remaining',
            data: calculate_remaining_balance(total_payment_result, mortgage_term, monthly_payment)
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });
}


module.exports = calculate;