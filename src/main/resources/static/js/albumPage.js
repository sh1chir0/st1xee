import {loadPlayer} from './main.js';
import {updatePlaylist} from './playlist.js';
import {artistButtonsFromAlbum} from './artistPage.js';

const workStation = document.querySelector('.work-station')
export function enableAlbumButton(id){
    const albumButton = document.getElementById(id)
    albumButton.addEventListener('click', () => {
        workStation.innerHTML = ``
        fetch(`/api/albums/get/${id}`, {
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


}

export function loadAlbum(album){
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

    loadAlbumSongs(album, 'album-songs')

}

export function loadAlbumSongs(album, path) {
    const albumSongsBlock = document.getElementById(path)
    for (let k = 0; k < album.songsDTO.length; k++) {
        const song = album.songsDTO[k];

        const songBlock = document.createElement('div');
        songBlock.className = 'song-block'
        songBlock.id = `${path}-song-block`

        const playBtnId = `${path}-play-btn-${k}`;
        const heartIconId = `${path}-heart-icon-${k}`
        const artistButtonId = `${path}-artist-button-${k + 1}`
        songBlock.innerHTML = `
                        <div class="number">
                            <p>${k + 1}</p>
                           <i id="${playBtnId}" class="fa-solid fa-play play-ic"></i>
                        </div>
                        <div class="name-block">
                            <div class="title">
                                <p>${song.title}</p>
                            </div>
                            <div class="artist">
                                <a id="${artistButtonId}" class="artist-link">${song.artistNickname}</a>
                            </div>
                        </div>
                        <div class="heart">
                                <i id="${heartIconId}" class="fa-regular fa-heart sg-heart"></i>
                        </div>
                        <div class="time">
                            <p>${song.duration}</p>
                        </div>
                    `;
        console.log(songBlock)
        albumSongsBlock.appendChild(songBlock);

        const heartIcon = document.getElementById(heartIconId)

        const playlist = JSON.parse(localStorage.getItem('playlist'))
        let isContained = playlist.some(function (item) {
            return item.id === song.id;
        });
        if (isContained) {
            heartIcon.classList.remove("fa-regular");
            heartIcon.classList.add("fa-solid");
        } else {
            heartIcon.classList.remove("fa-solid");
            heartIcon.classList.add("fa-regular");
        }

        heartIcon.addEventListener('click', () => {
            const isRegular = heartIcon.classList.contains("fa-regular");

            if (isRegular) {
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
            } else {
                $.ajax({
                    url: `/api/songs/delete-song/${song.id}`,
                    type: 'POST',
                    success: function (response) {
                        updatePlaylist()
                        heartIcon.classList.remove("fa-solid")
                        heartIcon.classList.add("fa-regular")
                    },
                    error: function (error) {
                        console.log('Error:', error);
                    }
                })
            }
        });


        const playBtn = document.getElementById(playBtnId)
        playBtn.addEventListener('click', () => {
            localStorage.setItem('albumForPlaying', JSON.stringify(album.songsDTO))
            localStorage.setItem('songId', JSON.stringify(k))

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
                              <div class="album-name">${song.albumTitle}</div>
                              <div class="artist-from-player">
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
    artistButtonsFromAlbum(path)
}