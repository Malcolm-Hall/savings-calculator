// CHART_DONUT_BIG CHART_LOAN
'use strict'
const customDataLabels = {
    id: 'customDataLabel',
    afterDatasetDraw(chart, args, pluginOptions) {
        const {
            ctx,
            data
        } = chart;
        ctx.save();

        data.datasets[0].data.forEach((datapoint, index) => {
            const { x, y } = chart.getDatasetMeta(0).data[index].tooltipPosition();

            ctx.textAlign = 'center';
            ctx.font = '14px Inter';
            ctx.fillStyle = '#fff';
            ctx.textBaseline = 'middle';
            let toolTipText = datapoint != '0' ? datapoint + '%' : '';
            ctx.fillText(toolTipText, x, y);
        });
    },
};

const colors = {
    primary: '#162953',
    primaryLight: '#25468d',
    secondary: '#00ABD0'
};

const tooltip = {
    enabled: false,
    external: function (context) {
        let tooltipEl = _('chartjs-tooltip');

        // Create element on first render
        if (!tooltipEl) {
            tooltipEl = document.createElement('div');
            tooltipEl.id = 'chartjs-tooltip';
            tooltipEl.innerHTML = '<table></table>';
            document.body.appendChild(tooltipEl);
        }

        // Hide if no tooltip
        const tooltipModel = context.tooltip;
        if (tooltipModel.opacity === 0) {
            tooltipEl.style.opacity = 0;
            return;
        }

        // Set caret Position
        tooltipEl.classList.remove('above', 'below', 'no-transform');
        if (tooltipModel.yAlign) {
            tooltipEl.classList.add(tooltipModel.yAlign);
        } else {
            tooltipEl.classList.add('no-transform');
        }

        function getBody(bodyItem) {
            return bodyItem.lines;
        }

        if (tooltipModel.body) {
            const bodyLines = tooltipModel.body.map(getBody);

            let innerHtml = '<thead>';

            let year = +(Number(tooltipModel.title) * 12).toFixed(0);
            let months = +(year % 12).toFixed(0);
            let yearText = `Year ${(year - months) / 12}`;
            let monthText = months === 0 ? '' : `, Month ${months}`;
            innerHtml += '<tr><th class="loan-chart__title">' + yearText + monthText + '</th></tr>';

            innerHtml += '</thead><tbody>';
            bodyLines.forEach(function (body, i) {
                innerHtml += '<tr><td class="loan-chart__text">' + body + '</td></tr>';
            });
            innerHtml += '</tbody>';

            let tableRoot = tooltipEl.querySelector('table');
            tableRoot.innerHTML = innerHtml;
        }

        const position = context.chart.canvas.getBoundingClientRect();

        // Display, position, and set styles for font
        tooltipEl.style.opacity = 1;
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.left = position.left + window.scrollX + tooltipModel.caretX - tooltipEl.clientWidth / 2 + 'px';
        tooltipEl.style.top = position.top + window.scrollY + tooltipModel.caretY - tooltipEl.clientHeight / 2 + 'px';
        tooltipEl.classList.add('loan-chart');
    },
};

import("./lib/chartjs/chart.js").then(({ Chart, registerables }) => {
    Chart.register(...registerables);

    const pieChartData = [
        {
            data: [4, 61, 35],
            backgroundColor: [colors.primary, colors.primaryLight, colors.secondary],
            borderColor: colors.primary,
            borderWidth: 0.5,
        },
    ];

    const pieChart = new Chart(_('chartDonutBig'), {
        type: 'pie',
        data: {
            datasets: pieChartData,
        },
        options: {
            rotation: 0,
            hover: { mode: null },
            responsive: false,
            layout: {
                padding: 30,
            },
            plugins: {
                tooltip: {
                    enabled: false,
                },
                legend: {
                    display: false,
                },
            },
        },
        plugins: [customDataLabels],
    });

    const barChartData = {
        labels: [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10
        ],
        datasets: [
            {
                label: 'Lump Sum',
                data: [
                    5000,
                    5000,
                    5000,
                    5000,
                    5000,
                    5000,
                    5000,
                    5000,
                    5000,
                    5000
                ],
                order: 1,
                backgroundColor: colors.primary,
                fill: true,
            },
            {
                label: 'Contributions',
                data: [
                    6000,
                    12300,
                    18915,
                    25861,
                    33154,
                    40811,
                    48852,
                    57295,
                    66159,
                    75467
                ],
                order: 2,
                backgroundColor: colors.primaryLight,
                fill: true,
            },
            {
                label: 'Interest',
                data: [
                    681,
                    1931,
                    3821,
                    6431,
                    9850,
                    14175,
                    19511,
                    25975,
                    33695,
                    42811
                ],
                order: 3,
                backgroundColor: colors.secondary,
                fill: true,
            }
        ],
    };

    const barChart = new Chart(_('chartLoan'), {
        type: 'bar',
        data: barChartData,
        options: {
            response: true,
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: tooltip,
            },
            interaction: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                y: {
                    stacked: true,
                    ticks: {
                        callback: (it) => currencyFormat(it, ' '),
                    },
                },
                x: {
                    stacked: true,
                    ticks: {
                        callback: function (value, index, ticks) {
                            return value + 1;
                        }
                    },
                    grid: {
                        display: false
                    },
                },
            },
        }
    });

    window.changeChartData = function (values, values_two) {
        pieChart.data.datasets[0].data = values
        pieChart.data.datasets[0].labels = values.map(value => `${value}%`)
        pieChart.update()

        barChart.data.labels = values_two[0]
        barChart.data.datasets[0].data = values_two[1]
        barChart.data.datasets[1].data = values_two[2]
        barChart.data.datasets[2].data = values_two[3]
        barChart.update()
    }
})
