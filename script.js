function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function calculateZakat() {
    // Retrieving input values, setting default to zero
    let cash = parseFloat(document.getElementById('cash').value) || 0;
    let gold = parseFloat(document.getElementById('gold').value) || 0;
    let silver = parseFloat(document.getElementById('silver').value) || 0;
    let investments = parseFloat(document.getElementById('investments').value) || 0;
    let loansGiven = parseFloat(document.getElementById('loans_given').value) || 0;
    let debts = parseFloat(document.getElementById('debts').value) || 0;
    let expenses = parseFloat(document.getElementById('expenses').value) || 0;

    // Current gold and silver rates
    let goldRatePerGram = 6160.92; // ₹6,160.92 per gram
    let silverRate = 80.3; // ₹80.3 per gram

    // Nisab values
    let nisabGold = goldRatePerGram * 87.48; // ₹6,160.92 * 87.48
    let nisabSilver = silverRate * 613.36; // ₹80.3 * 613.36

    // Calculating the value of gold and silver possessions
    let goldValue = gold * goldRatePerGram;
    let silverValue = silver * silverRate;

    // Calculating total assets
    let totalAssets = cash + goldValue + silverValue + investments;

    // Calculating Zakat payable
    let zakat = 0;
    let eligibleMessage = "";

    if (totalAssets >= nisabGold) {
        zakat = totalAssets * 0.025; // 2.5% of total assets
    } else if (totalAssets >= nisabSilver) {
        zakat = totalAssets * 0.025; // 2.5% of total assets
    } else {
        eligibleMessage = "You are ineligible for Zakat because your total assets are below the Nisab threshold.";
    }

    // Deducting liabilities
    zakat -= debts;
    zakat -= expenses;

    // Handling loans given
    if (zakat < loansGiven) {
        zakat = 0; // Zakat cannot be negative
    } else {
        zakat -= loansGiven;
    }

    // Displaying the result
    let resultElement = document.getElementById('result');
    if (eligibleMessage !== "") {
        resultElement.innerText = eligibleMessage;
    } else {
        let formattedTotalAssets = formatNumber(totalAssets.toFixed(2));
        let formattedZakat = formatNumber(zakat.toFixed(2));

        let resultText = "<span style='color:white'>Total Assets: ₹" + formattedTotalAssets + "</span><br>";
        resultText += "<span style='color:green'>Zakat: ₹" + formattedZakat + "</span>";
        resultElement.innerHTML = resultText;
    }
}
