//initializwe the variables
let songIndex = 0;
let audioElement = new Audio(`Songs/${songIndex + 1}.mp3`);
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    { songName: "01. Ashan Nahin Yanha", filePath: "Songs/1.mp3", coverPath: "covers/1.png" },
    { songName: "02. Bhula Dena", filePath: "Songs/2.mp3", coverPath: "covers/2.png" },
    { songName: "03. Chahun Main Aana", filePath: "Songs/3.mp3", coverPath: "covers/3.png" },
    { songName: "04 Hum Mar Jayenge", filePath: "Songs/4.mp3", coverPath: "covers/4.png" },
    { songName: "05. Meri Aashiqui", filePath: "Songs/5.mp3", coverPath: "covers/5.png" },
    { songName: "06. Milne hai Mujhse Aayi", filePath: "Songs/6.mp3", coverPath: "covers/6.png" },
    { songName: "07. Piya Aaye Na", filePath: "Songs/7.mp3", coverPath: "covers/7.png" },
    { songName: "08. Sunn Raha Hai(Female)", filePath: "Songs/8.mp3", coverPath: "covers/8.png" },
    { songName: "09. Sunn Raha Hai(Male)", filePath: "Songs/9.mp3", coverPath: "covers/9.png" },
    { songName: "10. Tum Hi Ho", filePath: "Songs/10.mp3", coverPath: "covers/10.png" }
]
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
// audioElement.play();
//handle play/pause music
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    //update seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
})
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');

    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `Songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

//Next Song
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.src = `Songs/${songIndex + 1}.mp3`;

    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
//Prevoius Song
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.src = `Songs/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})