let playBtn = document.querySelector('.play_btn');
let playingTime = document.querySelector('.playing_time');
let endTime = document.querySelector('.end_time');
let songProgressBar = document.querySelector('.song_progress_bar');
let songProgress = document.querySelector('.song_progress');
let songName = document.querySelector('.song_name');
let singerName = document.querySelector('.singer_name');
let songCoverImg = document.querySelector('.song_cover_img');
let previousBtn = document.querySelector('.previous_btn');
let nextBtn = document.querySelector('.next_btn');
let songSpeed = document.querySelector('.song_speed');
let volumeEl = document.querySelector('.volume');



// songs list
let song = [
    {
        id: '1',
        pic: 'assets/imgs/man2.webp',
        title: 'من2',
        singer: 'امیر تتلو',
        src: 'assets/songs/Man2.mp3',
    },

    {
        id: '2',
        pic: 'assets/imgs/HameRaftand.jpg',
        title: 'همه رفتند',
        singer: 'رضا بهرام',
        src: 'assets/songs/HameRaftand.mp3',
    },

    {
        id: '3',
        pic: 'assets/imgs/hamdam.jpg',
        title: 'همدم',
        singer: 'رضا بهرام',
        src: 'assets/songs/Hamdam.mp3',
    },

    {
        id: '4',
        pic: 'assets/imgs/yar.jpg',
        title: 'یار',
        singer: 'رضا بهرام',
        src: 'assets/songs/Yar.mp3',
    },

    {
        id: '5',
        pic: 'assets/imgs/bezanBaran.webp',
        title: 'بزن باران',
        singer: 'ایهام',
        src: 'assets/songs/bezanBaran.mp3',
    },

    {
        id: '6',
        pic: 'assets/imgs/biToHarShab.webp',
        title: 'بی تو هر شب',
        singer: 'نوان',
        src: 'assets/songs/biToHarShab.mp3',
    },

    {
        id: '7',
        pic: 'assets/imgs/khodahafez.webp',
        title: 'خداحافظ',
        singer: 'عرفان طهماسبی',
        src: 'assets/songs/khodahafez.mp3',
    },

];


let index = 0;
let isPlaying = true;
// create audio element
let audio = new Audio(song[index].src);
// loading audio info
load();




playBtn.addEventListener('click', () => {
    if (isPlaying) {
        play();
    }
    else {
        pause();
    }
});

songSpeed.addEventListener('change', () => {
    audio.playbackRate = songSpeed.value;
});

volumeEl.addEventListener('input', () => {
    audio.volume = volumeEl.value / 100;
});

// seek
songProgress.addEventListener('click', (e) => {
    let selectedPoint = e.offsetX;
    let width = songProgress.clientWidth;

    let selectedPerscent = selectedPoint / width * 100;
    songProgressBar.style.width = `${selectedPerscent}%`;
    let selectedTime = (selectedPerscent * audio.duration) / 100;
    audio.currentTime = selectedTime;
});




function load() {
    // create audio element
    audio = new Audio(song[index].src);

    songCoverImg.src = song[index].pic;
    songName.textContent = song[index].title;
    singerName.textContent = song[index].singer;
    // loading end time
    audio.addEventListener('loadedmetadata', () => {
        let minEnd = Math.floor(audio.duration / 60);
        let secEnd = Math.floor(audio.duration % 60);
        if (secEnd < 10) {
            secEnd = '0' + secEnd;
        }
        endTime.textContent = `${minEnd}:${secEnd}`;
    });

    // song ended
    audio.addEventListener('ended', next);

    // update playing time and progress
    audio.addEventListener('timeupdate', () => {
        // showing curent time
        let currentTime = audio.currentTime.toFixed(0);
        let min = Math.floor(currentTime / 60);
        let sec = currentTime % 60;
        if (sec < 10) {
            sec = '0' + sec;
        }
        playingTime.textContent = `${min}:${sec}`;

        // showing progress
        let timePercent = (audio.currentTime / audio.duration) * 100;
        songProgressBar.style.width = `${timePercent}%`;
    });
}


function play() {
    audio.playbackRate = songSpeed.value;
    audio.volume = volumeEl.value / 100;
    audio.play();
    playBtn.querySelector('i').classList.remove('bi-play');
    playBtn.querySelector('i').classList.add('bi-pause-fill');
    isPlaying = false;

}

function pause() {
    audio.pause();
    playBtn.querySelector('i').classList.remove('bi-pause-fill');
    playBtn.querySelector('i').classList.add('bi-play');
    isPlaying = true;
}

function next() {
    if (index == song.length - 1) {
        index = 0;
    }
    else {
        index++;
    }
    audio.pause();
    load();
    play();
}

function previous() {
    if (index == 0) {
        index = song.length - 1;
    }
    else {
        index--;
    }
    audio.pause();
    load();
    play();
}
