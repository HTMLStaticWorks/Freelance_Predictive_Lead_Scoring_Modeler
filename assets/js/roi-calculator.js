/* 
   Scorelytics - ROI Calculator
*/

document.addEventListener('DOMContentLoaded', () => {
    const calcForm = document.getElementById('roi-calculator');
    if (!calcForm) return;

    const inputs = calcForm.querySelectorAll('input');
    const resultDisplay = document.getElementById('roi-result');
    const upliftDisplay = document.getElementById('roi-uplift');

    const calculateROI = () => {
        const leads = parseFloat(document.getElementById('leads-input').value) || 0;
        const sqlRate = parseFloat(document.getElementById('sql-rate-input').value) || 0;
        const dealSize = parseFloat(document.getElementById('deal-size-input').value) || 0;

        // Baseline Revenue
        const baselineSQLs = leads * (sqlRate / 100);
        const baselineRevenue = baselineSQLs * dealSize;

        // Optimized Revenue (Assuming 2.8x uplift in SQL rate with predictive scoring)
        const optimizedSQLs = leads * ((sqlRate * 2.8) / 100);
        const optimizedRevenue = optimizedSQLs * dealSize;

        const annualUplift = (optimizedRevenue - baselineRevenue) * 12;

        // Format and display
        resultDisplay.textContent = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(optimizedRevenue);

        upliftDisplay.textContent = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(annualUplift);
    };

    inputs.forEach(input => {
        input.addEventListener('input', calculateROI);
    });

    // Initial calc
    calculateROI();
});
