const menuButton = document.querySelector('#menu-button'),
    workStation = document.querySelector('.work-station')

menuButton.addEventListener('click', () => {
    workStation.innerHTML = '';

    const mainMenuDiv = document.createElement('div');
    mainMenuDiv.className = 'main-menu';

    const menuContent = `
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
	<button>
	<img src="../img/random.png" alt="Button 4">
	</button>
	</div>
	</div>
	`;

    mainMenuDiv.innerHTML = menuContent;
    workStation.appendChild(mainMenuDiv);

    const shazamButton = mainMenuDiv.querySelector('#shazam-button');

    shazamButton.addEventListener('click', () => {
        workStation.innerHTML = '';

        const albumContainer = document.createElement('div');
        albumContainer.className = 'album-container';
        albumContainer.innerHTML = `
            <div class="album" id="album">
                <div class="album-header">
                    <div class="album-preview">
                        <img src="https://upload.wikimedia.org/wikipedia/ru/4/45/Billie_Eilish_-_Happier_Than_Ever.png">
                    </div>
                    <div class="album-info">
                        <div class="artist-name">
                            <p>Billie Eilish</p>
                        </div>
                        <div class="info">
                            <p>Album • 2021 • 16 songs, 56 min 15 sec</p>
                        </div>
                        <div class="album-name">
                            <p>Happier Than Ever</p>
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
        const album = document.getElementById('album');
        album.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/ru/4/45/Billie_Eilish_-_Happier_Than_Ever.png')";

        // Виконуємо AJAX-запит до сервера
        $.ajax({
            url: '/api/albums/shazam',
            method: 'GET',
            success: function(response) {
                const songs = response;

                const albumSongsBlock = document.getElementById('album-songs');

                for (const song of songs) {
                    const songBlock = document.createElement('div');
                    songBlock.className = 'song-block';
                    songBlock.innerHTML = `
                        <div class="number">
                            <p>${song.id}</p>
                            <i class="fa-solid fa-play play-ic"></i>
                        </div>
                        <div class="name-block">
                            <div class="title">
                                <p>${song.title}</p>
                            </div>
                            <div class="artist">
                                <p>${song.artistNickname}</p>
                            </div>
                        </div>
                        <div class="time">
                            <p>${song.duration}</p>
                        </div>
                    `;
                    albumSongsBlock.appendChild(songBlock);
                }
            },
            error: function(error) {
                console.log('Error:', error);
            }
        });
    });
});
