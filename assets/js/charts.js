/* 
   Scorelytics - Chart.js Initializations
*/

const ChartConfig = {
    colors: {
        accent: '#7A4E38',
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
        text: '#64748B'
    }
};

function initAUCChart(ctx) {
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            datasets: [{
                label: 'Model Performance (ROC Curve)',
                data: [0, 0.4, 0.7, 0.85, 0.9, 0.93, 0.95, 0.97, 0.98, 0.99, 1],
                borderColor: ChartConfig.colors.accent,
                backgroundColor: 'rgba(122, 78, 56, 0.1)',
                fill: true,
                tension: 0.4
            }, {
                label: 'Random Guess',
                data: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
                borderColor: '#CBD5E1',
                borderDash: [5, 5],
                fill: false
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'bottom' } },
            scales: {
                y: { title: { display: true, text: 'True Positive Rate' } },
                x: { title: { display: true, text: 'False Positive Rate' } }
            }
        }
    });
}

function initFeatureImportanceChart(ctx) {
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Job Title Score', 'Company Size', 'Email Open Rate', 'Page Visits (30d)', 'Demo Requested', 'LinkedIn Seniority'],
            datasets: [{
                label: 'Predictive Signal Strength',
                data: [0.94, 0.82, 0.75, 0.68, 0.55, 0.42],
                backgroundColor: ChartConfig.colors.accent,
                borderRadius: 4
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            plugins: { legend: { display: false } }
        }
    });
}

function initLeadDistributionChart(ctx) {
    return new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Priority A', 'Priority B', 'Priority C', 'Priority D'],
            datasets: [{
                data: [15, 25, 35, 25],
                backgroundColor: [
                    ChartConfig.colors.success,
                    ChartConfig.colors.accent,
                    ChartConfig.colors.warning,
                    '#CBD5E1'
                ]
            }]
        },
        options: {
            responsive: true,
            cutout: '70%',
            plugins: { legend: { position: 'bottom' } }
        }
    });
}

function initConversionUpliftChart(ctx) {
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Baseline (Unscored)', 'Scored Leads (Avg)', 'Priority A Leads'],
            datasets: [{
                label: 'Conversion Rate (%)',
                data: [2.1, 4.8, 8.6],
                backgroundColor: [
                    '#94A3B8',
                    ChartConfig.colors.accent,
                    ChartConfig.colors.success
                ],
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } }
        }
    });
}
