import {openArtistPanel} from './userSettings.js'

const workStation = document.querySelector('.work-station')


export function artistPanel(){
    workStation.innerHTML = ''
    const artistPanel = document.createElement('div')
    artistPanel.className = 'artist-panel'

    fetch('api/artist/my-albums', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            const menuContent = `
            <div class="artist-panel-name">
                <h1>Artist Panel</h1>
            </div>
            
            <div class="my-albums">
            <div class="my-albums-title">
                <h2>My albums</h2>
            </div>
            
            </div>
            
            <div class="blocks-hr">
            <hr>
            </div>
            
            <div class="new-album">
                <button id="new-album">Create new album</button>
            </div>
            `
            artistPanel.innerHTML = menuContent;
            workStation.appendChild(artistPanel);
            const myAlbums = document.querySelector('.my-albums');
            for (let i = 0; i < data.length; i++) {
                const album = data[i]

                const albumBlock = document.createElement('div');
                albumBlock.className = 'my-album-block';

                const albumButtonId = `my-albums-button-${i}`
                albumBlock.innerHTML = `
                <div class="my-album-num">
                    <p>${i+1}.</p>
                </div>
                <div class="my-album-title">
                    <button id="${albumButtonId}">${album.title}</button>
                </div>
                <div class="my-album-songs">
                    <p>${album.totalSongs}</p>
                </div>
                `
                myAlbums.appendChild(albumBlock);

                if(i+1 < data.length){
                    const hrBlock = document.createElement('div');
                    hrBlock.innerHTML = `
                        <div class="my-album-block-hr">
                            <hr>
                        </div>
                        `
                    myAlbums.appendChild(hrBlock)
                }
                // albums
                const albumButton = document.getElementById(albumButtonId)
                albumButton.addEventListener('click', () =>{
                    workStation.innerHTML = '';
                    const myAlbumPage = document.createElement('div');
                    myAlbumPage.className = 'page-my-album';

                    myAlbumPage.innerHTML = `
                        <div class="page-my-album">
                          <div class="page-my-album-title">
                            <h1>${album.title}</h1>
                          </div>
                        
                          <div class="page-my-album-settings">
                            <div class="page-my-album-settings-title">
                              <label for="page-my-album-title">Title:</label>
                              <input type="text" id="page-my-album-title" name="page-my-album-title" value="${album.title}">
                              <button id="update-album-title-button">Save</button>
                            </div>
                        
                            <div class="page-my-album-settings-preview">
                              <div class="current-avatar">
                                <img src="/images/${album.previewId}">
                              </div>
                              <div class="load-avatar">
                                  <input class="form-control" type="file" accept="image/*" id="album-avatar" name="avatar" required>
                                  <br>
                                  <button id="update-album-preview-button" type="submit">Save</button>
                              </div>
                            </div>
                          </div>
                        
                          <div class="blocks-hr">
                            <hr>
                          </div>
                        
                          <div class="page-my-album-songs">
 
                            
                          </div>
                        
                          <div class="blocks-hr">
                            <hr>
                          </div>
                        
                          <div class="add-song">
                            <button id="add-song-button">Add song</button>
                          </div>
                        
                          <div class="delete-album">
                            <button id="delete-album-button">Delete album</button>
                          </div>
                        
                        </div>
                    `
                    workStation.appendChild(myAlbumPage)

                    const updateAlbumTitleButton = document.getElementById('update-album-title-button')
                    updateAlbumTitleButton.addEventListener('click', () => {
                        const albumTitle = document.getElementById('page-my-album-title').value;
                        fetch(`/api/artist/update/album/${album.id}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            body: 'albumTitle=' + encodeURIComponent(albumTitle)
                        })
                            .then(response => {
                                if (response.ok) {
                                    openArtistPanel()
                                } else {
                                    console.error('Помилка при завантаженні файлу:', response.status);
                                }
                            })
                            .catch(error => {
                                console.error('Помилка при відправці запиту:', error);
                            });
                    })

                    const updateAlbumPreviewButton = document.getElementById('update-album-preview-button')
                    updateAlbumPreviewButton.addEventListener('click', () => {
                        const newAlbumPreview = document.getElementById('album-avatar');
                        const albumPreview = newAlbumPreview.files[0];

                        if (albumPreview) {
                            const formData = new FormData();
                            formData.append('avatar', albumPreview);

                            fetch(`/api/artist/update/album/${album.id}/preview`, {
                                method: 'POST',
                                body: formData,
                            })
                                .then(response => {
                                    if (response.ok) {
                                        openArtistPanel()
                                    } else {
                                        console.error('Помилка при завантаженні файлу:', response.status);
                                    }
                                })
                                .catch(error => {
                                    console.error('Помилка при відправці запиту:', error);
                                });
                        }
                    })


                    // album - songs
                    const pageMyAlbumSongs = document.querySelector('.page-my-album-songs')
                    for (let j = 0; j < album.songsDTO.length; j++) {
                        const song = album.songsDTO[j]

                        const pageMyAlbumSongButtonId = `page-my-album-song-${j}`
                        const changeTitleButtonId = `change-title-${j}`
                        const deleteSongButtonId = `delete-song-${j}`
                        const pageMyAlbumSongBlock = document.createElement('div')
                        pageMyAlbumSongBlock.className = 'page-my-album-song-block'
                        pageMyAlbumSongBlock.innerHTML = `
                            <div class="page-my-album-song-number">
                              <p>${j + 1}</p>
                            </div>
                            <div class="page-my-album-song-title">
                              <button id="${pageMyAlbumSongButtonId}">${song.title}</button>
                            </div>
                            <div class="admin-active-buttons">
                              <div class="change-nickname admin-active-button">
                                <button id="${changeTitleButtonId}">Change title</button>
                              </div>
                              <div class="ban admin-active-button">
                                <button id="${deleteSongButtonId}">Delete song</button>
                              </div>
                            </div>
                        `

                        pageMyAlbumSongs.appendChild(pageMyAlbumSongBlock)

                        if(j+1 < album.songsDTO.length){
                            const songHr = document.createElement('div')
                            songHr.className = 'my-album-block-hr'
                            songHr.innerHTML = `
                                <hr>
                            `
                            pageMyAlbumSongs.appendChild(songHr)
                        }

                        const changeSongTitleButton = document.getElementById(changeTitleButtonId)
                        changeSongTitleButton.addEventListener('click', () => {
                            const songTitle = prompt("Введіть нову назву:");
                            if (songTitle !== null) {
                                fetch(`/api/artist/update/song/${song.id}`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    },
                                    body: 'songTitle=' + encodeURIComponent(songTitle)
                                })
                                    .then(response => {
                                        if (response.ok) {
                                            openArtistPanel()
                                        } else {
                                            console.error('Помилка при завантаженні файлу:', response.status);
                                        }
                                    })
                                    .catch(error => {
                                        console.error('Помилка при відправці запиту:', error);
                                    });
                            }
                        })

                        const deleteSongButton = document.getElementById(deleteSongButtonId)
                        deleteSongButton.addEventListener('click', () => {
                            const confirmation = confirm(`Are you sure you want to delete ${song.title}?`);

                            if (confirmation) {
                                fetch(`/api/artist/delete/song/${song.id}`, {
                                    method: 'POST',
                                })
                                    .then(response => {
                                        if (response.ok) {
                                            openArtistPanel()
                                        } else {
                                            console.error('Помилка при завантаженні файлу:', response.status);
                                        }
                                    })
                                    .catch(error => {
                                        console.error('Помилка при відправці запиту:', error);
                                    });
                            }
                        })

                    }

                    const addSongButton = document.getElementById('add-song-button')
                    addSongButton.addEventListener('click', () => {
                        workStation.innerHTML = '';
                        const addSongPage = document.createElement('div');
                        addSongPage.className = 'create-album';

                        addSongPage.innerHTML = `
                        <div class="page-my-album-title">
                          <h1>Load song</h1>
                        </div>
                        <div class="create-album-form">
                            <label for="title-for-new-song">Title:</label>
                            <input type="text" id="title-for-new-song" name="title" required>
                            <br>
                            <label for="page-my-album-select">Album:</label>
                            <select id="page-my-album-select" name="page-my-album-select">
                              <option value="album1">Album 1</option>
                              <option value="album2">Album 2</option>
                              <option value="album3">Album 3</option>
                            </select>
                            <br>
                            <label for="preview-for-new-song">Preview:</label>
                            <input class="form-control" type="file" accept="image/*" id="preview-for-new-song" name="preview" required>
                            <br>
                            <label for="new-song">Audio:</label>
                            <input type="file" id="new-song" name="file" accept=".mp3" required>
                            <br>
                            <button type="submit" id="load-song-button">Load</button>
                        </div>
                        `
                        workStation.appendChild(addSongPage)
                        const albumSelect = document.getElementById('page-my-album-select')
                        albumSelect.innerHTML = ''

                        data.forEach(album => {
                            const option = document.createElement('option')
                            option.value = album.id
                            option.textContent = album.title
                            albumSelect.appendChild(option)
                        })

                        const loadSongButton = document.getElementById('load-song-button');
                        loadSongButton.addEventListener('click', () => {
                            const titleForSong = document.getElementById('title-for-new-song').value;
                            const albumForSong = document.getElementById('page-my-album-select').value;
                            const inputPreviewForNewSong = document.getElementById('preview-for-new-song');
                            const previewForNewSong = inputPreviewForNewSong.files[0];
                            const inputNewSong = document.getElementById('new-song');
                            const newSong = inputNewSong.files[0];

                            const formData = new FormData();
                            formData.append('songTitle', titleForSong);
                            formData.append('albumId', albumForSong);
                            formData.append('preview', previewForNewSong);
                            formData.append('song', newSong);

                            fetch('/api/artist/load/song', {
                                method: 'POST',
                                body: formData,
                            })
                                .then(response => {
                                    if (response.ok) {
                                        openArtistPanel()
                                    }
                                })
                                .catch(error => {
                                    console.error('An error occurred:', error);
                                });
                        });



                    })
                    const deleteAlbumButton = document.getElementById(`delete-album-button`)
                    deleteAlbumButton.addEventListener('click', () => {
                        const confirmation = confirm(`Are you sure you want to delete ${album.title}?`);
                        if(confirmation){
                            fetch(`/api/albums/delete/${album.id}`, {
                                method: 'POST'
                            })
                                .then(response => {
                                    if (response.ok) {
                                        openArtistPanel()
                                    }
                                })
                                .catch(error => {
                                    console.error('An error occurred:', error);
                                })
                        }
                    })


                })

            }



            const newAlbumButton = document.getElementById('new-album')
            newAlbumButton.addEventListener('click', () => {
                console.log('new album button')

                workStation.innerHTML = '';
                const newAlbum = document.createElement('div');
                newAlbum.className = 'create-album';

                newAlbum.innerHTML = `
                    <div class="page-my-album-title">
                      <h1>Create album</h1>
                    </div>
                    <div class="create-album-form">
                        <label for="title-for-new-album">Title:</label>
                        <input type="text" id="title-for-new-album" name="title" required>
                        <br>
                        <label for="preview-for-new-album">Preview:</label>
                        <input class="form-control" type="file" accept="image/*" id="preview-for-new-album" name="preview" required>
                        <br>
                        <button type="submit" id="create-new-album-button">Create</button>
                    </div>
                    `
                workStation.appendChild(newAlbum)

                const createNewAlbumButton = document.getElementById('create-new-album-button')
                createNewAlbumButton.addEventListener('click', () => {
                    const titleForNewAlbum = document.getElementById('title-for-new-album').value;
                    const inputPreviewForNewAlbum = document.getElementById('preview-for-new-album');
                    const previewForNewAlbum = inputPreviewForNewAlbum.files[0];
                    const formData = new FormData();
                    formData.append('albumTitle', titleForNewAlbum);
                    formData.append('albumPreview', previewForNewAlbum);
                    fetch('/api/artist/create/album', {
                        method: 'POST',
                        body: formData,
                    })
                        .then(response => {
                            if (response.ok) {
                                openArtistPanel()
                            }
                        })
                        .catch(error => {
                            console.error('An error occurred:', error);
                        });
                })

            })

        })
        .catch(error => {
            console.error('Error fetching user profile data:', error);
        });
}