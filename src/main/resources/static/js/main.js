import { loadAlbum } from './albumPage.js'


const menuButton = document.querySelector('#menu-button'),
    workStation = document.querySelector('.work-station'),
    logotype = document.getElementById('logotype')
let shazamButton = document.querySelector('#shazam-button'),
    randomSongButton = document.getElementById('random-song')


function innerUser(){
    const myAvatar = document.getElementById('my-avatar'),
        myNickname = document.getElementById('my-nickname')
    fetch('/api/user/get', {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            myNickname.innerText = data.nickname
            myAvatar.src = `/image/${data.avatarId}`
        })
}
innerUser()

function updateShazamButtonListener() {
    shazamButton.addEventListener('click', () => {
        workStation.innerHTML = ''
        $.ajax({
            url: '/api/album/shazam',
            method: 'GET',
            success: function(response) {
                loadAlbum(response)
            },
            error: function(error) {
                console.log('Error:', error)
            }
        })
    })
}
function randomSong(){
    randomSongButton.addEventListener('click', () => {
        fetch('/api/song/random', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                const playlist = [data]
                localStorage.setItem('albumForPlaying', JSON.stringify(playlist))
                localStorage.setItem('songId', JSON.stringify(0))

                workStation.innerHTML = ''
                const playerContainer = document.createElement('div')
                playerContainer.className = 'player'
                playerContainer.id = 'player'
                playerContainer.innerHTML = `
                        <div class="player-container">
                      <div class="song-preview">
                          <img class="song-preview-img" src="/image/${data.id}">
                      </div>
                      <div class="player-song-name">
                          <div class="name">
                              <p id="name">${data.title}</p>
                          </div>
                          <div class="album-name">${data.albumTitle}</div>
                          <div class="artist-from-player">
                              <p>${data.artistNickname}</p>
                          </div>
                      </div>
                      <div class="player-structure">
                          <div class="auxiliary-buttons">
                              <div class="btn shuffle"><img src="../img/shuffle.png"></div>
                              <div class="btn repeat"><img src="../img/repeat.png"></div>
                              <div class="btn heart"><img src="../img/heart.png"></div>
                          </div>
                          <div class="progress-container">
                              <div class="progress"></div>
                          </div>
                          <div class="player-time">
                              <p class="current-time">00:00</p>
                              <p class="song-time">${data.duration}</p>
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

                loadPlayer()

            })
    })
}

menuButton.addEventListener('click', () => {
    loadMenu()
})
updateShazamButtonListener()
randomSong()

logotype.addEventListener('click', () => {
    loadMenu()
})

function loadMenu(){
    workStation.innerHTML = ''

    const mainMenuDiv = document.createElement('div')
    mainMenuDiv.className = 'main-menu'

    const menuContent = `
	 <div class="main-menu">
          <div class="menu">
              <div class="first-line">
                  <button id="shazam-button">
                      <img src="../img/shazam.png" alt="Button 1">
                  </button>
                  <button>
                      <img src="../img/wrld.png" alt="Button 2">
                  </button>
              </div>
              <div class="second-line">
                  <button>
                      <img src="../img/ukraine.png" alt="Button 3">
                  </button>
                  <button id="random-song">
                      <img src="../img/random.png" alt="Button 4">
                  </button>
              </div>
          </div>
      </div>
	`

    mainMenuDiv.innerHTML = menuContent
    workStation.appendChild(mainMenuDiv)

    shazamButton = mainMenuDiv.querySelector('#shazam-button')
    updateShazamButtonListener()
    randomSongButton = document.getElementById('random-song')
    randomSong()
}

export async function loadPlayer() {
    const version = Date.now()
    const playerScript = document.createElement('script')
    playerScript.src = `./js/player.js?ver=${version}`
    playerScript.type = 'module'

    const existingPlayerScript = document.querySelector('script[type="module"][src^="/js/player.js"]')
    if (existingPlayerScript) {
        existingPlayerScript.remove()
    }

    document.body.appendChild(playerScript)
}