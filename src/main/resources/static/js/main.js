import { updatePlaylist } from './playlist.js';

const menuButton = document.querySelector('#menu-button'),
    workStation = document.querySelector('.work-station')
let shazamButton = document.querySelector('#shazam-button')

function updateShazamButtonListener() {
    shazamButton.addEventListener('click', () => {
        workStation.innerHTML = '';
        $.ajax({
            url: '/api/albums/shazam',
            method: 'GET',
            success: function(response) {
                const album = response;

                const albumContainer = document.createElement('div');
                albumContainer.className = 'album-container';
                albumContainer.innerHTML = `
            <div class="album" id="album">
                <div class="album-header">
                    <div class="album-preview">
                        <img src="/images/${album.previewId}">
                    </div>
                    <div class="album-info">
                        <div class="artist-name">
                            <p>${album.artistNickname}</p>
                        </div>
                        <div class="info">
                            <p>Album • 2021 • ${album.totalSongs} songs, ${album.totalDuration}</p>
                        </div>
                        <div class="album-name">
                            <p>${album.title}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="album-songs" id="album-songs">
                <div class="songs-header">
                    <div class="hash">
                        <p>#</p>
                    </div>
                    <div class="song-title">
                        <p>Title</p>
                    </div>
                    <div class="clock">
                        <i class="fa-regular fa-clock"></i>
                    </div>
                </div>
                <hr>
            </div>
        `;
                workStation.appendChild(albumContainer);
                const albumElement = document.getElementById('album');
                albumElement.style.backgroundImage = `url('/images/${album.previewId}')`;



                const albumSongsBlock = document.getElementById('album-songs');
                for (let i = 0; i < album.songsDTO.length; i++) {
                    const song = album.songsDTO[i];

                    const songBlock = document.createElement('div');
                    songBlock.className = 'song-block';

                    const playBtnId = `play-btn-${i}`;
                    const heartIconId = `heart-icon-${i}`
                    songBlock.innerHTML = `
                        <div class="number">
                            <p>${i+1}</p>
                           <i id="${playBtnId}" class="fa-solid fa-play play-ic"></i>
                        </div>
                        <div class="name-block">
                            <div class="title">
                                <p>${song.title}</p>
                            </div>
                            <div class="artist">
                                <button>${song.artistNickname}</button>
                            </div>
                        </div>
                        <div class="heart">
                                <i id="${heartIconId}" class="fa-regular fa-heart"></i>
                        </div>
                        <div class="time">
                            <p>${song.duration}</p>
                        </div>
                    `;
                    albumSongsBlock.appendChild(songBlock);






                    const heartIcon = document.getElementById(heartIconId)

                    const playlist = JSON.parse(localStorage.getItem('playlist'))
                    let isContained = playlist.some(function(item) {
                        return item.id === song.id;
                    });
                    if(isContained){
                        heartIcon.classList.remove("fa-regular");
                        heartIcon.classList.add("fa-solid");
                    } else{
                        heartIcon.classList.remove("fa-solid");
                        heartIcon.classList.add("fa-regular");
                    }

                    heartIcon.addEventListener('click', () => {
                        const isRegular = heartIcon.classList.contains("fa-regular");

                        if(isRegular){
                            $.ajax({
                                url: `/api/songs/add-song/${song.id}`,
                                type: 'POST',
                                success: function (response) {
                                    updatePlaylist()
                                    heartIcon.classList.remove("fa-regular")
                                    heartIcon.classList.add("fa-solid")
                                },
                                error: function (error) {
                                    console.log('Error:', error);
                                }
                            })
                        }
                        else{
                            $.ajax({
                                url: `/api/songs/delete-song/${song.id}`,
                                type: 'POST',
                                success: function (response){
                                    updatePlaylist()
                                    heartIcon.classList.remove("fa-solid")
                                    heartIcon.classList.add("fa-regular")
                                },
                                error: function (error){
                                    console.log('Error:', error);
                                }
                            })
                        }
                    });


                        const playBtn = document.getElementById(playBtnId)
                        playBtn.addEventListener('click', ()=>{
                        localStorage.setItem('albumForPlaying', JSON.stringify(album.songsDTO))
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
                }
            },
            error: function(error) {
                console.log('Error:', error);
            }
        });
    })
}

menuButton.addEventListener('click', () => {
    workStation.innerHTML = '';

    const mainMenuDiv = document.createElement('div');
    mainMenuDiv.className = 'main-menu';

    const menuContent = `
	 <div class="main-menu">
          <div class="menu">
              <div class="first-line">
                  <button  id="shazam-button">
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
                  <button>
                      <img src="../img/random.png" alt="Button 4">
                  </button>
              </div>
          </div>
      </div>
	`;

    mainMenuDiv.innerHTML = menuContent;
    workStation.appendChild(mainMenuDiv);

    shazamButton = mainMenuDiv.querySelector('#shazam-button');
    updateShazamButtonListener()

});
updateShazamButtonListener()

export async function loadPlayer() {
    const version = Date.now();
    const playerScript = document.createElement('script');
    playerScript.src = `./js/player.js?ver=${version}`;
    playerScript.type = 'module';

    const existingPlayerScript = document.querySelector('script[type="module"][src^="/js/player.js"]');
    if (existingPlayerScript) {
        existingPlayerScript.remove();
    }

    document.body.appendChild(playerScript);
}