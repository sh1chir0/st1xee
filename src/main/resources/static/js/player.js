import {loadAlbum} from './albumPage.js'
import {artistButtonFromPlayer} from "./artistPage.js";

let playerStructure, prevBtn, playBtn, nextBtn, audio, progressContainer, progress, previewImg,
    imgSrc, name, shuffle, repeat, heart, currentTimeNum, songTime, albumName, artistNickname,
    workStation, player
function init() {
    playerStructure = document.querySelector('.player-structure')
    prevBtn = document.querySelector('.prev')
    playBtn = document.querySelector('.play')
    nextBtn = document.querySelector('.next')
    audio = document.querySelector('.audio')
    progressContainer = document.querySelector('.progress-container')
    progress = document.querySelector('.progress')
    previewImg = document.querySelector('.song-preview-img')
    imgSrc = document.querySelector('.play-img')
    name = document.getElementById('name')
    shuffle = document.querySelector('.shuffle')
    repeat = document.querySelector('.repeat')
    heart = document.querySelector('.heart')
    currentTimeNum = document.querySelector('.current-time')
    songTime = document.querySelector('.song-time')
    albumName = document.querySelector('.album-name')
    artistNickname = document.querySelector('.artist-from-player')
    workStation = document.querySelector('.work-station')
    player = document.getElementById('player')
}
init()
const albumForPlaying = JSON.parse(localStorage.getItem('albumForPlaying'))
const songId = JSON.parse(localStorage.getItem('songId'))
const imageUrl = "/image/" + albumForPlaying[songId].preview
player.style.backgroundImage = `url(${imageUrl})`

const prevSongs = []

let isShuffle = false
let isRepeat = false

let songIndex = songId


function loadSong(song){
    workStation.innerHTML = ``
    const playerContainer = document.createElement('div')
    playerContainer.className = 'player'
    playerContainer.id = 'player'
    playerContainer.innerHTML = `
                        <div class="player-container">
                          <div class="song-preview">
                              <img class="song-preview-img" src="${song.preview ? '/image/' + song.preview : '../img/without-image.png'}">
                          </div>
                          <div class="player-song-name">
                              <div class="name">
                                  <p id="name">${song.title}</p>
                              </div>
                              <div class="album-name">${song.albumTitle}</div>
                              <div class="artist-from-player">
                                  <p id="artist-from-pl-1">${song.artistNickname}</p>
                              </div>
                          </div>
                          <div class="player-structure">
                              <div class="auxiliary-buttons">
                                  <div class="btn shuffle"><img src="../img/shuffle.png"></div>
                                  <div class="btn repeat"><img src="../img/repeat.png"></div>
                                  <div class="btn heartt"><img src="../img/heart.png"></div>
                              </div>
                              <div class="progress-container">
                                  <div class="progress"></div>
                              </div>
                              <div class="player-time">
                                  <p class="current-time">00:00</p>
                                  <p class="song-time">${song.duration}</p>
                              </div>
                              <div class="buttons">
                                  <div class="btn prev"><img src="../img/prev.png"></div>
                                  <div class="btn play"><img class="play-img" src="../img/play.png"></div>
                                  <div class="btn next"><img src="../img/next.png"></div>
                              </div>
                          </div>
                      </div>

                      `

    workStation.appendChild(playerContainer)

    init()

    audio.src = '/api/song/' + song.id + '/play'
    player.style.backgroundImage = `url('${song.preview ? '/image/' + song.preview : '../img/without-image.png'}')`


    audio.addEventListener('canplaythrough', () => {
        playSong()
    })

    playBtn.addEventListener('click', () => {
        const isPlaying = playerStructure.classList.contains('play')
        if(isPlaying){
            pauseSong()
        } else{
            playSong()
        }
    })

    nextBtn.addEventListener('click', () => {
        nextSong()
    })

    prevBtn.addEventListener('click', () => {
        prevSong()
    })

    audio.addEventListener("timeupdate", updateProgress)

    audio.addEventListener('ended', () =>{
        if(isRepeat){
            repeatSong()
        }else{
            nextSong()
        }
    })

    shuffle.addEventListener('click', () => {
        shuffleMusic()
    })

    repeat.addEventListener('click', () => {
        repeatMusic()
    })

    albumName.addEventListener('click', () => {
        fetch(`/api/album/get/${song.albumId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                loadAlbum(data)
            })
    })

    progressContainer.addEventListener('click', setProgress)

    if(isShuffle)
        shuffle.style.opacity = 0.5

    if(isRepeat)
        repeat.style.opacity = 0.5


    artistButtonFromPlayer()
}

loadSong(albumForPlaying[songIndex])

function playSong(){
    playerStructure.classList.add('play')
    imgSrc.style.opacity = 0
    audio.play()
    setTimeout(() => {
        imgSrc.src = '../img/pause.png'
        imgSrc.style.opacity = 1
    }, 150)
}
function pauseSong(){
    playerStructure.classList.remove('play')
    imgSrc.style.opacity = 0
    audio.pause()
    setTimeout(() => {
        imgSrc.src = '../img/play.png'
        imgSrc.style.opacity = 1
    }, 150)
}


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
        nextBtn.style.opacity = 1
    }, 150)
    playSong()
}


function prevSong(){
    prevBtn.style.opacity = 0
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
        prevBtn.style.opacity = 1
    }, 150)

    playSong()
}


function updateProgress(e){
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime/duration) * 100
    progress.style.width = progressPercent + '%'
    if (!isNaN(duration)) {
        const progressPercent = (currentTime / duration) * 100
        progress.style.width = progressPercent + "%"
        currentTimeNum.innerHTML = formatTime(currentTime)
        songTime.innerHTML = formatTime(duration)
    }
}

function formatTime(time) {
    let min = Math.floor(time / 60)
    if (min < 10) {
        min = `0${min}`
    }
    let sec = Math.floor(time % 60)
    if (sec < 10) {
        sec = `0${sec}`
    }
    return `${min}:${sec}`
}


function setProgress(e){
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration
    audio.currentTime = (clickX/width) * duration
}




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


function getRandomNumber(min, max) {
    let randomNum = Math.floor(Math.random() * (max - min + 1)) + min
    if(randomNum === prevSongs.length){
        getRandomNumber(min, max)
    }
    return randomNum
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

function repeatSong(){
    loadSong(albumForPlaying[songIndex])
    playSong()
}



