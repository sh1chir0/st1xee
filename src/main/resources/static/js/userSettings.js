import { artistPanel } from './artistPanel.js'
import { adminPanel } from './adminPanel.js'

const workStation = document.querySelector('.work-station')


function viewUserProfile() {
    workStation.innerHTML = '';
    const userSettings = document.createElement('div');
    userSettings.className = 'user-settings';

    fetch('/api/user/get', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            const menuContent = `
                <div class="space"></div>

                <div class="avatar">
                    <div class="current-avatar">
                        <img src="/images/${data.avatarId}" alt="Current Avatar">
                    </div>
                    <div class="load-avatar">
                        <input class="form-control" type="file" accept="image/*" id="avatar" name="avatar" required>
                        <br>
                        <button class="save-button" type="submit">Confirm</button>
                    </div>
                </div>

                <div class="block">
                    <div class="input-block">
                        <label for="nickname">Nickname:</label>
                        <input type="text" id="nickname" name="nickname" value="${data.nickname}">
                    </div>
                    <button class="save-button" id="saveNickname">Save</button>
                </div>

                <div class="block">
                    <div class="input-block">
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" value="${data.email}">
                    </div>
                    <button class="save-button" id="saveEmail">Save</button>
                </div>

                <div class "block">
                    <div class="input-block">
                        <label for="phone">Phone Number:</label>
                        <input type="tel" id="phone" name="phone" value="${data.phoneNumber}">
                    </div>
                    <button class="save-button" id="savePhone">Save</button>
                </div>

                <div class="block">
                    <div class="input-block">
                        <label for="password">Old password:</label>
                        <input type="password" id="old-password" name="password">
                    </div>
                </div>

                <div class="block">
                    <div class="input-block">
                        <label for="repeat-password">New password:</label>
                        <input type="password" id="new-password" name="repeat-password">
                    </div>
                    <button class="save-button" id="savePassword">Save</button>
                </div>

                ${data.artistOrder ? `
                <div class="block">
                    <div class="input-block">
                        <label for="artist-role">Get the status of a singer:</label>
                    </div>
                    
                    <button class="save-button" id="getArtistStatus">Get</button>
                    
                </div>
                ` : ''}

                <div class="space"></div>
            `;
            userSettings.innerHTML = menuContent;
            workStation.appendChild(userSettings);


            document.querySelector('.save-button').addEventListener('click', handleAvatarUpload);
            document.getElementById('saveNickname').addEventListener('click', saveNickname);
            document.getElementById('saveEmail').addEventListener('click', saveEmail);
            document.getElementById('savePhone').addEventListener('click', savePhone);
            document.getElementById('savePassword').addEventListener('click', savePassword);
            document.getElementById('getArtistStatus').addEventListener('click', getArtistStatus);
        })
        .catch(error => {
            console.error('Error fetching user profile data:', error);
        });
}

function handleAvatarUpload() {
    const inputElement = document.getElementById('avatar');
    const file = inputElement.files[0];

    if (file) {
        const formData = new FormData();
        formData.append('avatar', file);

        fetch('/api/user/update/avatar', {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                if (response.ok) {
                    viewUserProfile();
                } else {
                    console.error('Помилка при завантаженні файлу:', response.status);
                }
            })
            .catch(error => {
                console.error('Помилка при відправці запиту:', error);
            });
    }
}
function saveNickname() {
    const nickname = document.getElementById('nickname').value;
    fetch('/api/user/update/nickname', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'nickname=' + encodeURIComponent(nickname)
    })
        .then(response => {
            if (response.ok) {
                viewUserProfile();
            } else {
                console.error('Помилка при завантаженні файлу:', response.status);
            }
        })
        .catch(error => {
            console.error('Помилка при відправці запиту:', error);
        });
}

function saveEmail() {
    const email = document.getElementById('email').value;
    fetch('/api/user/update/email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'email=' + encodeURIComponent(email)
    })
        .then(response => {
            if (response.ok) {
                viewUserProfile();
            } else {
                console.error('Помилка при завантаженні файлу:', response.status);
            }
        })
        .catch(error => {
            console.error('Помилка при відправці запиту:', error);
        });
}

function savePhone() {
    const phone = document.getElementById('phone').value;
    fetch('/api/user/update/phone', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'phone=' + encodeURIComponent(phone)
    })
        .then(response => {
            if (response.ok) {
                viewUserProfile();
            } else {
                console.error('Помилка при завантаженні файлу:', response.status);
            }
        })
        .catch(error => {
            console.error('Помилка при відправці запиту:', error);
        });
}

function savePassword() {
    // Отримайте старий та новий паролі з полів вводу
    const oldPassword = document.getElementById('old-password').value;
    const newPassword = document.getElementById('new-password').value;

    // Створіть об'єкт для відправки на сервер
    const data = {
        oldPassword: oldPassword,
        newPassword: newPassword
    };

    // Отправка старого і нового паролів на сервер через AJAX запит
    fetch('/api/user/updatePassword', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (response.status === 200) {
                console.log('Password updated successfully');
            } else {
                console.error('Password update failed');
            }
        })
        .catch(error => {
            console.error('Error updating password:', error);
        });
}

function getArtistStatus() {
    const isConfirmed = window.confirm("Are you sure you want to perform this action?");

    if (isConfirmed) {
        sendArtistStatusRequest();
    }
}
function sendArtistStatusRequest() {

    fetch('/api/user/get-status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (response.ok) {
                // Обробити успішну відповідь від сервера, наприклад, оновити інформацію на сторінці
                // Можливо, ви захочете відобразити статус артиста або вжити інші дії.
            } else {
                console.error('Request failed with status', response.status);
                // Можливо, ви захочете обробити помилку, якщо запит не був успішним.
            }
        })
        .catch(error => {
            console.error('Request error:', error);
            // Обробити помилку під час виконання запиту.
        });
}

// function openSettings() {
//     console.log('Open Settings');
// }

function logOut() {
    fetch('/api/user/logout', {
        method: 'POST',
    })
        .then(response => {
            window.location.href = '/login';
        })
        .catch(error => {
            console.error('Помилка запиту: ' + error);
        });
}

export function openAdminPanel() {
    adminPanel()
}

export function openArtistPanel(){
    artistPanel()
}








const menuTrigger = document.getElementById("menu-trigger")
const dropdownMenu = document.querySelector('.dropdown-menu')
let closeTimeout
menuTrigger.addEventListener('mouseenter', () => {
    dropdownMenu.style.display = 'block'
    if (closeTimeout) {
        clearTimeout(closeTimeout);
    }
})
dropdownMenu.addEventListener('mouseenter', () => {
    dropdownMenu.style.display = 'block'
    if (closeTimeout) {
        clearTimeout(closeTimeout);
    }
})
menuTrigger.addEventListener('mouseleave', () => {
    closeTimeout = setTimeout(() => {
        dropdownMenu.style.display = 'none'
    }, 200)
})
dropdownMenu.addEventListener('mouseleave', () => {
    dropdownMenu.style.display = 'none'
})

const menuItems = document.querySelectorAll('.menu-item');
const actions = {
    viewUserProfile,
    // openSettings,
    logOut,
    openAdminPanel,
    openArtistPanel
};
menuItems.forEach((menuItem) => {
    menuItem.addEventListener('click', () => {
        const action = menuItem.getAttribute('data-action');
        actions[action]()
        dropdownMenu.style.display = 'none';
    });
});
