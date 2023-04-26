//const paymentsPerYear = document.getElementById("paymentPerYear");
const monthlyIncome = document.getElementById("monthlyIncome");
const loanAmount = document.getElementById("loanAmount");
const interestRate = document.getElementById("interestRate");
const loanTerm = document.getElementById("loanDuration");


const form = document.getElementById("mortgage");


function calculatemortgage(loanAmount,interestRate,monthlyIncome,loanTerm) {
    // Convert interest rate into decimal and monthly rate
    const decimalRate = interestRate / 100;
    var monthlyRate = decimalRate / 12;
    // Calculate loan term in months
    const loanTermInMonths = loanTerm * 12;
    
    //calculate number of payments and scheduled payments
    const actualNumberOfPayments =loanTerm * 12;

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
      document.getElementById("status").style.color = null;
    }else{
      eligibility = "Applicant not eligible"
      document.getElementById("status").style.color = "red";

    }

    const percentage = document.getElementById("percentage");
    let m = parseFloat(monthlyPayment.toFixed(2)).toLocaleString();
    let t = parseFloat(totalInterest.toFixed(2)).toLocaleString();
    document.getElementById("anp").innerHTML = `  ${actualNumberOfPayments}`;
    document.getElementById("snp").innerHTML = `  ${actualNumberOfPayments}`;
    document.getElementById("ti").innerHTML = "  NGN" + t;
    // console.log(document.getElementById("sp").innerHTML = "  NGN" + m)
    document.getElementById("sp").innerHTML = "  NGN" + m
    document.getElementById("status").innerHTML = `  ${eligibility} `;
    //return totalInterest;
  }
  

form.onsubmit = (e) => {
  e.preventDefault();
  validate();

 
  calculatemortgage(loanAmount.value,interestRate.value,monthlyIncome.value,loanTerm.value); 
};

function validate() {
  if (
    monthlyIncome.value === "" ||
    interestRate.value === "" ||
    loanAmount.value === "" ||
    loanTerm.value === ""
  ) {
    // alert("complete all fileds");
    let alert = document.createElement("div");
    alert.className = "calculator-error__message";
    alert.innerHTML = `<span>Please complete all fields</span>`;
    // alert.style.margin = ".5rem 35%";
    alert.style.margin = ".5rem 0";
    form.parentNode.insertBefore(alert, form);

    alert.onclick = () => alert.remove();

    setTimeout(() => alert.remove(), "3000");
  }
}

function Reset() {
  document.getElementById("anp").innerHTML = "";
  document.getElementById("snp").innerHTML = "";
  document.getElementById("ti").innerHTML = "";
  document.getElementById("sp").innerHTML = ""
  document.getElementById("status").innerHTML = "";
 document.getElementById("mortgage").reset();
}