import {loadAlbum, loadAlbumSongs} from "./albumPage.js";
import {artistButtonFromSearch} from "./artistPage.js";

const workStation = document.querySelector('.work-station'),
    searchButton = document.getElementById('search-button'),
    searchInput = document.getElementById('search-input')

searchButton.addEventListener('click', performSearch)
searchInput.addEventListener('keyup', function (event){
    if(event.key === 'Enter'){
        performSearch()
        searchInput.blur()
    }
})

function performSearch(){
    const searchTerm = searchInput.value
    const url = `/api/search/?searchTerm=${encodeURIComponent(searchTerm)}`

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
        .then(response => response.json())
        .then(data => {
            workStation.innerHTML = ``

            const searchPage = document.createElement('div')
            searchPage.className = 'search-page'
            searchPage.innerHTML = `
                <div class="search-page-header">
                    <h1 id="search-h1">Search Results</h1>
                </div>
            `
            workStation.appendChild(searchPage)

            if(data.songsDTO.length === 0 && data.albumsDTO.length === 0 && data.artistsDTO.length === 0){
                document.getElementById('search-h1').innerText = "No matches found"
            }else{
                const searchPageGetting = document.querySelector('.search-page')

                if(data.songsDTO.length > 0){
                    const searchPageHr = document.createElement('div')
                    searchPageHr.className = 'search-page-hr'
                    searchPageHr.innerHTML = `<hr>`

                    searchPageGetting.appendChild(searchPageHr)

                    const searchPageSongsHeader = document.createElement('div')
                    searchPageSongsHeader.className = 'search-page-songs-header'
                    searchPageSongsHeader.innerHTML = `<h2>Songs</h2>`

                    searchPageGetting.appendChild(searchPageSongsHeader)

                    const searchPageSongs = document.createElement('div')
                    searchPageSongs.className = 'search-page-songs'
                    searchPageSongs.innerHTML = `
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
                        </div>`

                    searchPageGetting.appendChild(searchPageSongs)

                    loadAlbumSongs(data, 'album-songs')
                }

                if(data.albumsDTO.length > 0){
                    const searchPageHr = document.createElement('div')
                    searchPageHr.className = 'search-page-hr'
                    searchPageHr.innerHTML = `<hr>`

                    searchPageGetting.appendChild(searchPageHr)

                    const searchPageAlbumsHeader = document.createElement('div')
                    searchPageAlbumsHeader.className = 'search-page-albums-header'
                    searchPageAlbumsHeader.innerHTML = `<h2>Albums</h2>`

                    searchPageGetting.appendChild(searchPageAlbumsHeader)

                    const searchPageAlbums = document.createElement('div')
                    searchPageAlbums.className = 'search-page-albums'

                    searchPageGetting.appendChild(searchPageAlbums)

                    for(let i = 0; i < data.albumsDTO.length; i++){
                        const album = data.albumsDTO[i]
                        const albumBlock = document.createElement('div')
                        albumBlock.className = 'album'
                        albumBlock.id = 'album'
                        albumBlock.innerHTML = `
                            <div class="album" id="album">
                                <div class="album-header">
                                    <div class="album-preview">
                                        <img src="${album.previewId ? '/image/' + album.previewId : '../img/without-image.png'}">
                                    </div>
                                    <div class="album-info">
                                        <div class="artist-name">
                                            <p>${album.artistNickname}</p>
                                        </div>
                                        <div class="info">
                                            <p>Album • 2021 • ${album.totalSongs} songs, ${album.totalDuration}</p>
                                        </div>
                                        <div class="album-name">
                                            <p id="search-album-button-${i}">${album.title}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>`

                        searchPageAlbums.appendChild(albumBlock)
                        albumBlock.style.backgroundImage = `url('/image/${album.previewId}')`

                        document.getElementById(`search-album-button-${i}`).addEventListener('click', () => {
                            loadAlbum(album)
                        })
                    }
                }

                if(data.artistsDTO.length > 0){
                    const searchPageHr = document.createElement('div')
                    searchPageHr.className = 'search-page-hr'
                    searchPageHr.innerHTML = `<hr>`

                    searchPageGetting.appendChild(searchPageHr)

                    const searchPageArtistsHeader = document.createElement('div')
                    searchPageArtistsHeader.className = 'search-page-artists-header'
                    searchPageArtistsHeader.innerHTML = `<h2>Artists</h2>`

                    searchPageGetting.appendChild(searchPageArtistsHeader)

                    const searchPageArtists = document.createElement('div')
                    searchPageArtists.className = 'search-page-artists'
                    searchPageGetting.appendChild(searchPageArtists)

                    for(let i = 0; i < data.artistsDTO.length; i++){
                        const artist = data.artistsDTO[i]

                        const artistBlock = document.createElement('div')
                        artistBlock.className = 'search-page-artist-block'
                        artistBlock.innerHTML = `
                            <div class="search-page-artists-num">
                                <p>${i+1}.</p>
                            </div>
                            
                            <div class="search-page-artists-nickname">
                                <p id="search-artist-button-${i+1}">${artist.nickname}</p>
                            </div>
                        `
                        searchPageArtists.appendChild(artistBlock)

                        if (i + 1 < data.artistsDTO.length) {
                            const hrBlock = document.createElement('div')
                            hrBlock.className = 'search-page-artists-hr'
                            hrBlock.innerHTML = `<hr>`
                            searchPageArtists.appendChild(hrBlock)
                        }
                    }

                    artistButtonFromSearch()
                }
            }
        })
}