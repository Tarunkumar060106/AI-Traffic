function updateVehicleCounts() {
    const directions = ['north', 'south', 'east', 'west'];

    directions.forEach(direction => {
        let lane1Count = Math.floor(Math.random() * 10);
        let lane2Count = Math.floor(Math.random() * 10);
        let lane3Count = Math.floor(Math.random() * 10);
        let totalCount = lane1Count + lane2Count + lane3Count;

        document.getElementById(`${direction}Lane1`).textContent = lane1Count;
        document.getElementById(`${direction}Lane2`).textContent = lane2Count;
        document.getElementById(`${direction}Lane3`).textContent = lane3Count;
        document.getElementById(`${direction}Total`).textContent = totalCount;
    });
}

// Simulate vehicle count updates every 5 seconds
setInterval(updateVehicleCounts, 5000);
