import { loadPlayer } from "./main.js";

const songsBlock = document.getElementById("songs"),
      workStation = document.querySelector('.work-station')


export function updatePlaylist(){

    $.ajax({
        url: '/api/albums/playlist',
        method: 'GET',
        success: function(response) {
            const playlist = response;
            localStorage.setItem('playlist', JSON.stringify(playlist))
            songsBlock.innerHTML= '';
            for (let i = 0; i < playlist.length; i++) {
                const song = playlist[i]

                const songBlock = document.createElement('div')
                songBlock.className = 'song'
                songBlock.addEventListener('mouseover', function() {
                    showFavoriteHeart(this)
                })
                songBlock.addEventListener('mouseout', function() {
                    hideFavoriteHeart(this)
                })

                const playBtnId = `play-button-${i}`
                const favBtnId = `fav-button-${i}`
                const favIconId = `fav-icon-${i}`
                songBlock.innerHTML = `<div class="image">
                  <i class="fa-solid fa-play play-icon"></i>
                     <img id="${playBtnId}" src="/images/${song.preview}">
                </div>
                <div class="name">
                  <div class="song-name">
                    <p>${song.title}</p>
                  </div>
                  <div class="artist">
                    <p>${song.artistNickname}</p>
                  </div>
                </div>
                <div class="favorite-heart" style="display: none;">
                  <button id="${favBtnId}" class="favorite-heart-btn">
                    <i id="${favIconId}" class="fa-solid fa-heart"></i>
                  </button>
                </div>`

                songsBlock.appendChild(songBlock)

                const playBtn =  document.getElementById(playBtnId)
                playBtn.addEventListener('click', ()=>{
                    localStorage.setItem('albumForPlaying', JSON.stringify(playlist))
                    localStorage.setItem('songId', JSON.stringify(i))
                    workStation.innerHTML = '';
                    const playerContainer = document.createElement('div')
                    playerContainer.className = 'player';
                    playerContainer.id = 'player';
                    playerContainer.innerHTML = `
                        <div class="player-container">
                      <div class="song-preview">
                          <img class="song-preview-img" src="/images/${song.id}">
                      </div>
                      <div class="player-song-name">
                          <div class="name">
                              <p id="name">${song.title}</p>
                          </div>
                          <div class="album-name">
                              <p>${song.albumTitle}</p>
                          </div>
                          <div class="artist">
                              <p>${song.artistNickname}</p>
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
                              <p class="song-time">${song.duration}</p>
                          </div>
                          <div class="buttons">
                              <div class="btn prev"><img src="../img/prev.png"></div>
                              <div class="btn play"><img class="play-img" src="../img/play.png"></div>
                              <div class="btn next"><img src="../img/next.png"></div>
                          </div>
                      </div>
                  </div>
        
                  `;

                    workStation.appendChild(playerContainer);
                    loadPlayer()
                })



                const favBtn = document.getElementById(favBtnId)
                const favIcon = document.getElementById(favIconId)
                favBtn.addEventListener('click', () => {
                    $.ajax({
                        url: `/api/songs/delete-song/${song.id}`,
                        type: 'POST',
                        success: function (response){
                            updatePlaylist()
                            favIcon.classList.remove("fa-solid")
                            favIcon.classList.add("fa-regular")
                        },
                        error: function (error){
                            console.log('Error:', error);
                        }
                    })
                })
            }
        },
        error: function(error) {
        console.log('Error:', error);
    }
    });

}

updatePlaylist()