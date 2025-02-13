// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animated elements
    const footer = document.createElement('div');
    footer.className = 'animated-footer';
    footer.textContent = '📊 Data Updated in Real-Time | 🚀 Powered by Chart.js & Anime.js';
    document.querySelector('.container').appendChild(footer);

    // Anime.js initial animations
    anime({
        targets: '.title',
        opacity: [0, 1],
        translateY: [-30, 0],
        duration: 1200,
        easing: 'easeOutExpo'
    });

    anime({
        targets: '.btn',
        scale: [0.8, 1],
        opacity: [0, 1],
        delay: anime.stagger(150),
        duration: 800,
        easing: 'easeOutElastic(1, .5)'
    });

    anime({
        targets: '.animated-footer',
        opacity: [0, 1],
        delay: 2000,
        duration: 1000,
        easing: 'easeOutExpo'
    });

    // Chart configurations
    const chartConfigs = {
        bar: {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [{
                    label: 'Monthly Sales (in $1000)',
                    data: [165, 159, 180, 181, 156, 155, 140],
                    backgroundColor: '#6366f1',
                    borderWidth: 0,
                    borderRadius: 8
                }]
            },
            options: getChartOptions('Monthly Sales Performance')
        },
        pie: {
            type: 'pie',
            data: {
                labels: ['Electronics', 'Apparel', 'Home Goods', 'Books', 'Other'],
                datasets: [{
                    label: 'Product Distribution',
                    data: [35, 25, 20, 15, 5],
                    backgroundColor: ['#6366f1', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'],
                    hoverOffset: 20
                }]
            },
            options: getChartOptions('Product Category Distribution')
        },
        line: {
            type: 'line',
            data: {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                datasets: [{
                    label: 'Quarterly Growth',
                    data: [200, 240, 300, 350],
                    borderColor: '#10b981',
                    tension: 0.4,
                    fill: true,
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3
                }]
            },
            options: getChartOptions('Quarterly Growth Trend')
        }
    };

    // Initialize charts
    const charts = {
        bar: new Chart(document.getElementById('barChart'), chartConfigs.bar),
        pie: new Chart(document.getElementById('pieChart'), chartConfigs.pie),
        line: new Chart(document.getElementById('lineChart'), chartConfigs.line)
    };

    // Set initial active chart
    let activeChart = 'bar';
    document.getElementById('barChart').classList.add('active');

    // Chart switching logic
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const chartType = btn.dataset.chart;
            if (chartType === activeChart) return;

            // Animate current chart out
            anime({
                targets: `#${activeChart}Chart`,
                opacity: 0,
                scale: [1, 0.8],
                rotateX: -60,
                duration: 500,
                easing: 'easeInExpo',
                complete: () => {
                    document.getElementById(`${activeChart}Chart`).classList.remove('active');
                    activeChart = chartType;
                    const newChart = document.getElementById(`${chartType}Chart`);
                    newChart.classList.add('active');
                    
                    // Animate new chart in
                    anime({
                        targets: newChart,
                        opacity: [0, 1],
                        scale: [0.8, 1],
                        rotateX: [60, 0],
                        duration: 800,
                        easing: 'easeOutElastic(1, .8)'
                    });
                }
            });

            // Update button states
            anime({
                targets: '.btn',
                backgroundColor: (el) => el === btn ? '#10b981' : '#6366f1',
                scale: [1, 1.05],
                duration: 400,
                easing: 'easeOutExpo'
            });

            document.querySelectorAll('.btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Custom tooltip implementation
    const tooltip = document.createElement('div');
    tooltip.className = 'chart-tooltip';
    document.body.appendChild(tooltip);

    // Add interactive hover effects to all charts
    Object.values(charts).forEach(chart => {
        const canvas = chart.canvas;
        
        canvas.addEventListener('mousemove', (e) => {
            const activePoint = chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true)[0];
            if (!activePoint) {
                tooltip.style.opacity = '0';
                return;
            }

            const { x, y } = canvas.getBoundingClientRect();
            const value = chart.data.datasets[activePoint.datasetIndex].data[activePoint.index];
            const label = chart.data.labels[activePoint.index];
            
            tooltip.style.left = `${e.clientX + 10}px`;
            tooltip.style.top = `${e.clientY - 20}px`;
            tooltip.style.opacity = '1';
            tooltip.innerHTML = `
                <div class="tooltip-header">${label}</div>
                <div class="tooltip-value">$${value.toLocaleString()}</div>
            `;
        });

        canvas.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
        });
    });

    // Chart configuration helper
    function getChartOptions(title) {
        return {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#1e293b',
                        font: {
                            weight: '600'
                        }
                    }
                },
                title: {
                    display: true,
                    text: title,
                    color: '#1e293b',
                    font: {
                        size: 18,
                        weight: '600'
                    }
                },
                tooltip: {
                    enabled: false // Disable default tooltips
                }
            },
            scales: {
                y: {
                    grid: {
                        color: 'rgba(0,0,0,0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        };
    }
});