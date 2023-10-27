import { enableAlbumButton } from './albumPage.js'

let playerStructure = document.querySelector('.player-structure'),
    prevBtn = document.querySelector('.prev'),
    playBtn = document.querySelector('.play'),
    nextBtn = document.querySelector('.next'),
    audio = document.querySelector('.audio'),
    progressContainer = document.querySelector('.progress-container'),
    progress = document.querySelector('.progress'),
    previewImg = document.querySelector('.song-preview-img'),
    imgSrc = document.querySelector('.play-img'),
    name = document.getElementById('name'),
    shuffle = document.querySelector('.shuffle'),
    repeat = document.querySelector('.repeat'),
    heart = document.querySelector('.heart'),
    currentTimeNum = document.querySelector('.current-time'),
    songTime = document.querySelector('.song-time'),
    albumName = document.querySelector('.album-name'),
    artistNickname = document.querySelector('.artist-from-player')

const player = document.getElementById('player');

const albumForPlaying = JSON.parse(localStorage.getItem('albumForPlaying'))
const songId = JSON.parse(localStorage.getItem('songId'))
console.log(albumForPlaying)
console.log(songId)
const imageUrl = "/images/" + albumForPlaying[songId].preview;
player.style.backgroundImage = `url(${imageUrl})`;

const prevSongs = []

let isShuffle = false
let isRepeat = false

let songIndex = songId


function loadSong(song) {
    audio.src = '/api/songs/' + song.id + '/play'
    name.innerHTML = song.title
    previewImg.src = `/images/${song.preview}`
    player.style.backgroundImage = `url(/images/${song.preview})`
    albumName.innerHTML = `${song.albumTitle}`
    albumName.id = `${song.albumId}`
    artistNickname.innerHTML = `<p>${song.artistNickname}</p>`

   enableAlbumButton(song.albumId)
}

loadSong(albumForPlaying[songIndex])
audio.addEventListener('canplaythrough', () => {
    playSong();
});
// playSong()
function playSong(){
    playerStructure.classList.add('play')
    imgSrc.style.opacity = 0;
    audio.play()
    setTimeout(() => {
        imgSrc.src = '../img/pause.png';
        imgSrc.style.opacity = 1;
    }, 150);
}
function pauseSong(){
    playerStructure.classList.remove('play')
    imgSrc.style.opacity = 0;
    audio.pause()
    setTimeout(() => {
        imgSrc.src = '../img/play.png';
        imgSrc.style.opacity = 1;
    }, 150);
}
playBtn.addEventListener('click', () => {
    const isPlaying = playerStructure.classList.contains('play')
    if(isPlaying){
        pauseSong()
    } else{
        playSong()
    }
})



function nextSong(){
    nextBtn.style.opacity = 0
    prevSongs.push(songIndex)
    if(isShuffle){
        songIndex = getRandomNumber(0, albumForPlaying.length - 1)
    } else{
        songIndex++
        if(songIndex > albumForPlaying.length - 1){
            songIndex = 0
        }
    }
    loadSong(albumForPlaying[songIndex])
    setTimeout(() => {
        nextBtn.style.opacity = 1;
    }, 150);
    playSong()
}
nextBtn.addEventListener('click', () => {
    nextSong()
})

function prevSong(){
    prevBtn.style.opacity = 0;
    if(prevSongs.length !== 0 && isShuffle){
        loadSong(albumForPlaying[prevSongs[prevSongs.length - 1]])
        prevSongs.pop()
    }else{
        songIndex--
        if(songIndex < 0){
            songIndex = albumForPlaying.length - 1
        }
        loadSong(albumForPlaying[songIndex])
    }

    setTimeout(() => {
        prevBtn.style.opacity = 1;
    }, 150);

    playSong()
}
prevBtn.addEventListener('click', () => {
    prevSong()
})

function updateProgress(e){
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime/duration) * 100
    progress.style.width = progressPercent + '%'
    if (!isNaN(duration)) {
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = progressPercent + "%";
        currentTimeNum.innerHTML = formatTime(currentTime)
        songTime.innerHTML = formatTime(duration);
    }
}

function formatTime(time) {
    let min = Math.floor(time / 60);
    if (min < 10) {
        min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if (sec < 10) {
        sec = `0${sec}`;
    }
    return `${min}:${sec}`;
}

audio.addEventListener("timeupdate", updateProgress);

function setProgress(e){
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration
    audio.currentTime = (clickX/width) * duration
}
progressContainer.addEventListener('click', setProgress)
audio.addEventListener('ended', () =>{
    if(isRepeat){
        repeatSong()
    }else{
        nextSong()
    }
})



function shuffleMusic(){
    if(isShuffle){
        shuffle.style.opacity = 1
        isShuffle = false
    }
    else{
        shuffle.style.opacity = 0.5
        isShuffle = true
    }
}
shuffle.addEventListener('click', () => {
    shuffleMusic()
})

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}


function repeatMusic(){
    if(isRepeat){
        repeat.style.opacity = 1
        isRepeat = false
    }
    else{
        repeat.style.opacity = 0.5
        isRepeat = true
    }
}
repeat.addEventListener('click', () => {
    repeatMusic()
})
function repeatSong(){
    loadSong(albumForPlaying[songIndex])
    playSong()
}



