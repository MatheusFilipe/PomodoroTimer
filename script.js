function timeFormat(time) {
    let minutes, seconds;

    minutes = parseInt(time / 60, 10);
    seconds = parseInt(time % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
}

function startTimer(duration, display) {
    var timer = duration

    intervalId = setInterval(function () {
        if (timer == 0) {
            let id = document.getElementsByClassName('clicked-button')[0].id
            alarmAudio.play()
            restart();
        }

        let time = timeFormat(timer);
        display.textContent = time;
        document.title = time + " - Pomodoro Timer";
        progress(timer, duration);

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

startButton.onclick = function() {
    let buttonId = document.getElementsByClassName('clicked-button')[0].id
    let duration = durations[buttonId];
    var display = document.querySelector("#timer");
    startButton.style.display = 'none';
    restartButton.style.display = 'block';


    startTimer(duration, display);
}

function restart() {
    restartButton.style.display = 'none';
    startButton.style.display = 'block';
    document.title = "Pomodoro Timer";
    try {
        clearInterval(intervalId);
    } catch (error) {}

    let id = document.getElementsByClassName('clicked-button')[0].id
    display.textContent = timeFormat(durations[id]);
    circle.style.strokeDashoffset = 1070
}

restartButton.onclick = restart;

function changeAction(id) {
    let clickedButton = document.getElementsByClassName('clicked-button')[0]
    let buttonToChange = document.getElementById(id);
    clickedButton.classList.remove('clicked-button');
    buttonToChange.classList.add('clicked-button');
    restart();
}

function progress(num, duration) {
    circle.style.strokeDashoffset = 1070 - (1070 * num / duration);// 100% = 1070 --> x% = y --> y = 10.7x --> calc(1070 - 10.7x)
}
const circle = document.querySelector('#circleProgress');
const display = document.querySelector("#timer");
const alarmAudio = new Audio('./assets/alarm.mp3');
var durations = {
    'pomodoro': 1500, // 25 minutes --> 1500 seconds
    'short-break': 300, // 5 minutes --> 300 seconds
    'long-break': 900 // 15 minutes --> 900 seconds
}