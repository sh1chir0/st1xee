const workStation = document.querySelector('.work-station')
import { loadAlbumSongs } from './albumPage.js'

export function artistButtonsFromPlaylist(){
    const songsContainer = document.getElementById("songs")
    const songElements = songsContainer.querySelectorAll(".song")
    const songCount = songElements.length

    const elementId = 'artist-button-'
    openArtistPage(elementId, songCount)
}

export function artistButtonsFromAlbum(pathAlbumBlock){
    const songsContainer = document.getElementById(pathAlbumBlock)
    const songElements = songsContainer.querySelectorAll('.song-block')
    const songCount = songElements.length

    const elementId = `${pathAlbumBlock}-artist-button-`
    openArtistPage(elementId, songCount)
}

export function artistButtonFromPlayer(){
    openArtistPage('artist-from-pl-', 2)
}

export function artistButtonFromSearch(){
    const buttonContainer = document.querySelector('.search-page-artists')
    const buttonElements = buttonContainer.querySelectorAll('.search-page-artist-block')
    const buttonCount = buttonElements.length

    openArtistPage('search-artist-button-', buttonCount)
}


function openArtistPage(elementId, elementCount) {
    for (let i = 1; i <= elementCount; i++) {
        const artistElement = elementId + i
        const artistButton = document.getElementById(artistElement)

        artistButton.addEventListener('click', (event) => {
            const artistNickname = event.target.innerText

            fetch('/api/artist/get?nickname=' + encodeURIComponent(artistNickname), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    workStation.innerHTML = ''
                    const artistPage = document.createElement('div')
                    artistPage.className = 'artist-page'
                    artistPage.innerHTML = `
                        <div class="album" id="album">
                          <div class="album-header">
                            <div class="album-preview">
                              <img src="/image/${data.previewId}">
                            </div>
                            <div class="album-info">
                              <div class="info">
                                <p>${data.albums.length} albums</p>
                              </div>
                              <div class="album-name">
                                <p>${data.nickname}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div class="albums" >
                          <div class="albums-title">
                            <h1>Artist's songs:</h1>
                          </div>


                        </div>
                    `

                    workStation.appendChild(artistPage)
                    const artistBackground = document.getElementById('album')
                    artistBackground.style.backgroundImage = `url('/image/${data.previewId}')`

                    const albumsBlock = document.querySelector('.albums')
                    for (let j = 0; j < data.albums.length; j++) {
                        const album = data.albums[j]

                        const albumBlock = document.createElement('div')
                        const albumBlockId = `artist-page-album-${j}`
                        const albumSongsId = `album-songs-${j}`
                        albumBlock.className = `artist-page-album`
                        albumBlock.id = albumBlockId
                        albumBlock.innerHTML = `
                            <div class="artist-page-album-info">
                              <div class="artist-page-album-info-preview">
                                <img src="/image/${album.previewId}">
                              </div>
                              <div class="artist-page-album-info-text">
                                <div class="artist-page-album-info-title">
                                  <h1>${album.title}</h1>
                                </div>
                                <div class="artist-page-album-info-songs">
                                  <p>${album.totalSongs} songs, ${album.totalDuration}</p>
                                </div>
                              </div>
                            </div>
                            <div class="album-songs" id="${albumSongsId}">
                              <div class="songs-header spc">
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
                        `
                        albumsBlock.appendChild(albumBlock)
                        const albumBackground = document.getElementById(albumBlockId)
                        albumBackground.style.backgroundImage = `url('/image/${album.previewId}')`

                        loadAlbumSongs(album, albumSongsId)

                    }
                })
        })
    }
}
