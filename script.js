function startTimer(duration, display) {
    var timer = duration
    var minutes, seconds;

    intervalId = setInterval(function () {
        if (timer == 0) {
            restartButton.style.display = 'none';
            startButton.style.display = 'block';
            clearInterval(intervalId);
        }

        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

startButton.onclick = function() {
    var duration = document.querySelector("#duration").value;
    var display = document.querySelector("#timer");
    startButton.style.display = 'none';
    restartButton.style.display = 'block';

    startTimer(duration, display);
}

restartButton.onclick = function() {
    restartButton.style.display = 'none';
    startButton.style.display = 'block';
}