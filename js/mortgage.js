// console.log("Mortgage");

// Inputs / DOM Elements
const paymentsPerYear = document.getElementById("paymentPerYear");
const monthlyIncome = document.getElementById("monthlyIncome");
const loanAmount = document.getElementById("loanAmount");
const interestRate = document.getElementById("interestRate");
const loanTerm = document.getElementById("loanDuration");


const form = document.getElementById("mortgage");

// console.log(paymentsPerYear, monthlyIncome, loanAmount, interestRate, form, loanTerm);


function calculatemortgage(loanAmount,interestRate,monthlyIncome,loanTerm,paymentsPerYear) {


    // Convert interest rate into decimal and monthly rate
    const decimalRate = interestRate / 100;
    var monthlyRate = decimalRate / 12;
    // Calculate loan term in months
    const loanTermInMonths = loanTerm * 12;
    
    //calculate number of payments and scheduled payments
    const actualNumberOfPayments =loanTerm * paymentsPerYear;

    // Calculate monthly mortgage payment
    const monthlyPayment = (loanAmount * monthlyRate ) * ( Math.pow(1 + monthlyRate , loanTermInMonths))/(Math.pow(1 + monthlyRate , loanTermInMonths)-1);
  
    // variable to store the total interest
    var totalInterest = 0;
  
    // loop through the loan term in months
    for (var i = 1; i <= loanTermInMonths; i++) {
      // calculate the interest paid for each month
      var interest = (parseFloat(monthlyPayment.toFixed(2))) * 120 - (loanAmount);
      totalInterest += interest;
      loanAmount -= (monthlyRate - interest);
    }

    var eligibility = ""
    if(monthlyIncome > (monthlyPayment*3)){
      eligibility = "Applicant eligible";
    }else{
      eligibility = "Applicant not eligible"
    }

    let m = parseFloat(monthlyPayment.toFixed(2));
    let t = parseFloat(totalInterest.toFixed(2));
    document.getElementById("anp").innerHTML = ` : ${actualNumberOfPayments}`;
    document.getElementById("snp").innerHTML = ` : ${actualNumberOfPayments}`;
    document.getElementById("ti").innerHTML = " : NGN" + t;
    console.log(document.getElementById("sp").innerHTML = " : NGN" + m)
    document.getElementById("status").innerHTML = ` : ${eligibility}`;
    //return totalInterest;
  }
  

form.onsubmit = (e) => {
  e.preventDefault();
  validate();

 
  calculatemortgage(loanAmount.value,interestRate.value,monthlyIncome.value,loanTerm.value,paymentsPerYear.value); 
};

function validate() {
  if (
    monthlyIncome.value === "" ||
    paymentPerYear.value === "" ||
    interestRate.value === "" ||
    loanAmount.value === "" ||
    loanTerm.value === ""
  ) {
    // alert("complete all fileds");
   console.log(document.getElementById("loanTerm").value)
    let alert = document.createElement("div");
    alert.className = "btn red btn-large";
    alert.innerHTML = `<span>Complete all fields</span>`;
    alert.style.margin = ".5rem 35%";
    form.parentNode.insertBefore(alert, form);

    alert.onclick = () => alert.remove();

    setTimeout(() => alert.remove(), "3000");
  }
}