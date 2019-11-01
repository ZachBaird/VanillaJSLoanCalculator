// Method for showing an error
const showError = err => {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(err));

    // Get elements for insertion
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Insert error div above the heading - insertBefore(new, existing)
    card.insertBefore(errorDiv, heading);

    // Clear error after 3 seconds
    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 3000);
};

// Method for calculating results
const calculateResults = e => {
    // Get UI variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value / 100 / 12);
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        document.getElementById('results').style.display = 'block';

    } else {
        showError('Please check your numbers');
    }
}

// Listen for button submit
document.getElementById('loan-form').addEventListener('submit', e => {
    e.preventDefault();

    document.getElementById('results').style.display = 'none';
    document.querySelector('.loading').style.display = 'block';

    setTimeout(() => {
        calculateResults(e);
        document.querySelector('.loading').style.display = 'none';

    }, 2000);
});