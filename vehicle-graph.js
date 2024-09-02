const ctx = document.getElementById('vehicleChart').getContext('2d');
const vehicleChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['0s', '5s', '10s', '15s', '20s', '25s', '30s'],
        datasets: [
            {
                label: 'North',
                borderColor: 'red',
                fill: false,
                data: Array(7).fill(0)
            },
            {
                label: 'South',
                borderColor: 'blue',
                fill: false,
                data: Array(7).fill(0)
            },
            {
                label: 'East',
                borderColor: 'green',
                fill: false,
                data: Array(7).fill(0)
            },
            {
                label: 'West',
                borderColor: 'orange',
                fill: false,
                data: Array(7).fill(0)
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Time'
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Vehicle Count'
                }
            }
        }
    }
});

function updateGraphData() {
    const directions = ['North', 'South', 'East', 'West'];

    directions.forEach((direction, index) => {
        const data = vehicleChart.data.datasets[index].data;
        data.push(Math.floor(Math.random() * 100));
        data.shift(); // Remove the oldest data point
    });

    vehicleChart.update();
}

// Update the graph every 5 seconds
setInterval(updateGraphData, 5000);
