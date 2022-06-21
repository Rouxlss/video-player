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
const time = document.querySelector('.time');

const volume = document.querySelector('.volume');
const volume_control = document.querySelector('.volume_control');
const volume_progress_bar = document.querySelector('.volume-progress-bar');
const volume_bar = document.querySelector('.volume-bar');
const volume_bar_control = document.querySelector('.bar-control');

let interval = null;

video.addEventListener('loadeddata', (e) => {

    var minutes = parseInt(video.duration / 60, 10);
    var seconds = video.duration % 60;

    let video_duration_time = `${Math.floor(minutes)}:${Math.floor(seconds)}`;
    time.innerHTML = `0:00 / ${video_duration_time}`;

    video.volume = 1;

    volume_progress_bar.style.width = `${video.volume * 100}%`;

})

const play_video = () => {

    if (video.paused) {

        video.play();

        interval = setInterval(() => {

            let video_duration = video.duration;

            let duration_minutes = parseInt(video.duration / 60, 10);
            let duration_seconds = video.duration % 60;

            let current_minutes = parseInt(video.currentTime / 60, 10);
            let current_seconds = video.currentTime % 60;

            let video_duration_time = `${Math.floor(duration_minutes)}:${Math.floor(duration_seconds)}`;
            let video_current_time = `${Math.floor(current_minutes)}:${("0" + Math.floor(current_seconds)).slice(-2)}`;
            time.innerHTML = `${video_current_time} / ${video_duration_time}`;

            current_time.style.width = `${video.currentTime / video_duration * 100}%`;

        }, 0);

        play_control.classList.add('d-none');
        pause_control.classList.remove('d-none');

    } else {
        video.pause();
        controls.style.opacity = 0.7;
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

video_player.addEventListener('mouseover', () => {
    console.log('mouseover');
    controls.style.opacity = 0.7;
})

video_player.addEventListener('mouseout', () => {
    if (!video.paused) {
        controls.style.opacity = 0;
    }
})

video.addEventListener('ended', () => {
    play_control.classList.remove('d-none');
    pause_control.classList.add('d-none');
})

video_shadow.addEventListener('dblclick', () => {
    video.requestFullscreen();
})

volume_control.addEventListener('click', () => {
    if (video.muted) {
        video.muted = false;
        volume_progress_bar.style.width = `${video.volume * 100}%`;
        volume_control.querySelector('i').classList.remove('fa-volume-mute');
    } else {
        video.muted = true;
        volume_progress_bar.style.width = `0%`;
        volume_control.querySelector('i').classList.add('fa-volume-mute');
    }
});

volume_bar_control.addEventListener('click', (e) => {

    video.muted = false;
    volume_control.querySelector('i').classList.remove('fa-volume-mute');

    let volume_bar_width = e.offsetX;
    let volume_bar_percentage = volume_bar_width / volume_bar.offsetWidth;

    video.volume = volume_bar_percentage;
    volume_progress_bar.style.width = `${volume_bar_percentage * 100}%`;

});

let isdragging = false;

volume_bar_control.addEventListener('mousedown', (e) => {

    isdragging = true;

    let volume_bar_width = e.offsetX;
    let volume_bar_percentage = volume_bar_width / volume_bar.offsetWidth;

    video.volume = volume_bar_percentage;
    volume_progress_bar.style.width = `${volume_bar_percentage * 100}%`;

})


volume.addEventListener('mouseover', (e) => {

    volume.style.width = 140 + 'px';
    volume_bar_control.style.display = 'flex';

});

volume.addEventListener('mouseout', (e) => {

    isdragging = false;
    
    volume.style.width = 30 + 'px';
    volume_bar_control.style.display = 'none';

});

volume_bar_control.addEventListener('mousemove', (e) => {

    if (isdragging) {


        let volume_bar_width = e.offsetX;
        let volume_bar_percentage = volume_bar_width / volume_bar.offsetWidth;

        video.volume = volume_bar_percentage;
        volume_progress_bar.style.width = `${volume_bar_percentage * 100}%`;

        console.log(volume_bar_percentage);

    }

})