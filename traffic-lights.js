const trafficLights = ['northLight', 'southLight', 'eastLight', 'westLight'];
let currentLightIndex = 0;
const lightStates = ['green', 'yellow', 'red'];
const lightDurations = {
    green: 5000,
    yellow: 2000,
    red: 5000
};

function setLight(direction, state) {
    const light = document.querySelector(`#${direction} .${state}`);
    // Reset all lights
    document.querySelectorAll(`#${direction} .light`).forEach(light => light.classList.remove('active'));
    // Set the specified light to active
    light.classList.add('active');
}

function updateLights() {
    const currentDirection = trafficLights[currentLightIndex];
    const nextLightIndex = (currentLightIndex + 1) % lightStates.length;
    const nextState = lightStates[nextLightIndex];

    setLight(currentDirection, lightStates[currentLightIndex]);

    setTimeout(() => {
        currentLightIndex = (currentLightIndex + 1) % trafficLights.length;
        updateLights();
    }, lightDurations[nextState]);
}

window.onload = () => {
    updateLights();
};
