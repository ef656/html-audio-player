window.onload = () => {
    let audioElement = document.querySelector(`audio`);
    let sourceElement = document.querySelector(`audio > source`);
    let select = document.querySelector(`select`);
    let play = document.querySelector(`#controls > span:nth-child(4)`);
    let stop = document.querySelector(`.fas.fa-stop`);
    let time = document.querySelector(`#time`);
    let duration = document.querySelector(`#duration`);
    let audioProgressBar = document.querySelector(`#progress`);

    /*
        Initialize the <source> tag’s src attribute with the first value in the drop
        down list. This value is the path to an audio file.
    */
    sourceElement.src = select.value;

    let playPauseAudio = () => {
        "use strict";

        if (audioElement.paused) {
            play.classList.remove(`fa-play`);
            play.classList.add(`fa-pause`);
            audioElement.play();
        } else {
            play.classList.remove(`fa-pause`);
            play.classList.add(`fa-play`);
            audioElement.pause();
        }
    };

    let stopAudio = () => {
        "use strict";

        audioElement.pause();
        audioElement.currentTime = 0;
        play.classList.remove(`fa-pause`);
        play.classList.add(`fa-play`);
    };

    let setTime = () => {
        "use strict";

        let minutes = Math.floor(audioElement.currentTime / 60);
        let seconds = Math.floor(audioElement.currentTime - minutes * 60);

        minutes = (
            (minutes < 10) ? `0${minutes}` : minutes
        );

        seconds = (
            (seconds < 10) ? `0${seconds}` : seconds
        );

        audioProgressBar.setAttribute(`value`, audioElement.currentTime);
        time.textContent = `${minutes}:${seconds}`;
    };

    select.addEventListener(`change`, () => {
        sourceElement.src = select.value;
        play.classList.remove(`fa-play`);
        play.classList.add(`fa-pause`);
        audioElement.load();
        audioElement.play();
    }, false);

    audioElement.onloadedmetadata = () => {
        let minutes = Math.floor(audioElement.duration / 60);
        let seconds = Math.floor(audioElement.duration - minutes * 60);

        minutes = (
            (minutes < 10) ? `0${minutes}` : minutes
        );

        seconds = (
            (seconds < 10) ? `0${seconds}` : seconds
        );

        audioProgressBar.setAttribute(`max`, audioElement.duration);
        duration.textContent = `${minutes}:${seconds}`;
    };

    audioElement.addEventListener(`ended`, () => {
        stopAudio();
    }, false);

    audioElement.addEventListener(`timeupdate`, () => {
        setTime();
    }, false);

    play.addEventListener(`click`, () => {
        playPauseAudio();
    }, false);

    stop.addEventListener(`click`, () => {
        stopAudio();
    }, false);

    audioElement.load();

    let playPromise = audioElement.play();

    if (playPromise !== undefined) {
        playPromise.then(() => {
            play.classList.remove(`fa-play`);
            play.classList.add(`fa-pause`);
        }).catch(() => {
            play.classList.remove(`fa-pause`);
            play.classList.add(`fa-play`);
        });
    }
};
