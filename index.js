const video_player = document.querySelector('.video-player');
const video_shadow = document.querySelector('.video-shadow');
const video = document.querySelector('video');
const play_button = document.querySelector('.play-button');
const pause_button = document.querySelector('.pause-button');

const controls = document.querySelector('.controls');
const play_control = document.querySelector('.play_control');
const pause_control = document.querySelector('.pause_control');
const progress_bar = document.querySelector('.progress-bar');
const current_time = document.querySelector('.current-time');

let interval = null;

const play_video = () => {

    let video_duration = video.duration;

    if (video.paused) {

        video.play();

        interval = setInterval(() => {
            current_time.style.width = `${video.currentTime / video_duration * 100}%`;
        }, 0);

        play_control.classList.add('d-none');
        pause_control.classList.remove('d-none');

    } else {
        video.pause();
        clearInterval(interval);
        play_control.classList.remove('d-none');
        pause_control.classList.add('d-none');
    }
}

const play_video_animation = () => {

    play_video();

    if (video.paused) {
        play_button.classList.add('show');
        setTimeout(() => {
            play_button.classList.remove('show');
        }, 1000);
    } else {
        pause_button.classList.add('show');
        setTimeout(() => {
            pause_button.classList.remove('show');
        }, 1000);
    }

}

video_shadow.addEventListener('click', play_video_animation);
play_control.addEventListener('click', play_video);
pause_control.addEventListener('click', play_video);

video.addEventListener('ended', () => {
    play_control.classList.remove('d-none');
    pause_control.classList.add('d-none');
})

video_shadow.addEventListener('dblclick', () => {
    video.requestFullscreen();
})