import { loadAlbum } from './albumPage.js'

const menuButton = document.querySelector('#menu-button'),
    workStation = document.querySelector('.work-station'),
    logotype = document.getElementById('logotype')
let shazamButton = document.querySelector('#shazam-button')

function updateShazamButtonListener() {
    shazamButton.addEventListener('click', () => {
        workStation.innerHTML = '';
        $.ajax({
            url: '/api/albums/shazam',
            method: 'GET',
            success: function(response) {
                loadAlbum(response)
            },
            error: function(error) {
                console.log('Error:', error);
            }
        });
    })
}

menuButton.addEventListener('click', () => {
    loadMenu()
});
updateShazamButtonListener()

logotype.addEventListener('click', () => {
    loadMenu()
});

function loadMenu(){
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

}

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