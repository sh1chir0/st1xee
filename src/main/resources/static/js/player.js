document.addEventListener('DOMContentLoaded', function() {
    const player = document.getElementById('player');
    player.style.backgroundImage = "url('https://s3-alpha-sig.figma.com/img/1998/ccca/d1e4d6ca2fdb5711edb95a4ae2f849d5?Expires=1690761600&Signature=d6QKjZQwUTzAIFe0Q2Iww5edzFrTBfn-n7zZ~cSm8DXk7ImbI-4UO7UD3haLGJ-jynX3NpySjsbOa8kGvdIM6~ovI4q5b-HlhbcDl~nCaa7dJ9kZ3plCM0tjBjgXHcqhcDudaRBWfiDvUVeSQKm7HBBjbjcmNBq8CqKvndaYDVmUpOIIBpbNHSSEPbNSmQKgCNcAVXrtpaq8sBpWGnU65geqwz8MfQ7cSE5KvbUQdd694QvdwKBRtxo1BEeiFx5jPt6l9nuMmc6W4QSadqpZdDeiSqD64lqrKDNE-dO3WBZ-41g2n7LSf3G4zdcvB4i-hKDn5rh7LYixGGopyyrBDw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4')";

});

document.addEventListener('DOMContentLoaded', function() {
    const album = document.getElementById('album');
    album.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/ru/4/45/Billie_Eilish_-_Happier_Than_Ever.png')";

});



const playerStructure = document.querySelector('.player-structure'),
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
    songTime = document.querySelector('.song-time')



const songs = ['my-strange-addiction', 'my-boy', 'idontwannabeyours', 'x-ray', 'cheat-code', 'cuba-libre']
const prevSongs = []

let isShuffle = false
let isRepeat = false

let songIndex = 0


function loadSong(song) {
    name.innerHTML = song
    audio.src = '../audio/' + song + '.mp3'
    previewImg.src = '../img/b-fiv.jpg'
}
loadSong(songs[songIndex])

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
        songIndex = getRandomNumber(0, songs.length - 1)
    } else{
        songIndex++
        if(songIndex > songs.length - 1){
            songIndex = 0
        }
    }
    loadSong(songs[songIndex])
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
    loadSong(songs[prevSongs[prevSongs.length - 1]])
    prevSongs.pop()
    if(prevSongs.length === 0){
        songIndex--
        if(songIndex < 0){
            songIndex = songs.length - 1
        }
        loadSong(songs[songIndex])
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
    // const progressPercent = (currentTime/duration) * 100
    // progress.style.width = progressPercent + '%'
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
    loadSong(songs[songIndex])
    playSong()
}