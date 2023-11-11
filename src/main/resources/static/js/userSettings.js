import { artistPanel } from './artistPanel.js'
import { adminPanel } from './adminPanel.js'

const workStation = document.querySelector('.work-station')


function viewUserProfile() {
    workStation.innerHTML = ''
    const userSettings = document.createElement('div')
    userSettings.className = 'user-settings'

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
                        <img src="/image/${data.avatarId}" alt="Current Avatar">
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

                <div class="block">
                    <div class="input-block">
                        <label for="artist-role">Get the status of a singer:</label>
                    </div>
                    <button class="save-button" id="getArtistStatus">Get</button>
                </div>
                

                <div class="space"></div>
            `
            userSettings.innerHTML = menuContent
            workStation.appendChild(userSettings)


            document.querySelector('.save-button').addEventListener('click', handleAvatarUpload)

            document.getElementById('saveNickname').addEventListener('click', () => {
                const nickname = document.getElementById('nickname').value
                changeUserNickname(data.id, nickname, viewUserProfile)
            })

            document.getElementById('saveEmail').addEventListener('click', () => {
                const email = document.getElementById('email').value
                changeUserEmail(data.id, email, viewUserProfile)
            })

            document.getElementById('savePhone').addEventListener('click', () => {
                const phone = document.getElementById('phone').value
                changeUserPhone(data.id, phone, viewUserProfile)
            })

            document.getElementById('savePassword').addEventListener('click', () => {
                const oldPassword = document.getElementById('old-password').value
                const newPassword = document.getElementById('new-password').value

                changeUserPassword(data.id, oldPassword, newPassword, logOut)
            })
            document.getElementById('getArtistStatus').addEventListener('click', getArtistStatus)
        })
        .catch(error => {
            console.error('Error fetching user profile data:', error)
        })
}

function handleAvatarUpload() {
    const inputElement = document.getElementById('avatar')
    const file = inputElement.files[0]

    if (file) {
        const formData = new FormData()
        formData.append('avatar', file)

        fetch('/api/user/update/avatar', {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                if (response.ok) {
                    viewUserProfile()
                }
            })
    }
}

export function deleteAvatar(id, func){
    fetch(`/api/user/${id}/avatar/delete`, {
        method: 'POST',
    })
        .then(response => {
            if(response.ok){
                func()
            }
        })
}

export function changeUserNickname(id, nickname, func) {
    fetch(`/api/user/${id}/update/nickname`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'nickname=' + encodeURIComponent(nickname)
    })
        .then(response => {
            if (response.ok) {
                func()
            }
        })
}

export function changeUserEmail(id, email, func) {
    fetch(`/api/user/${id}/update/email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'email=' + encodeURIComponent(email)
    })
        .then(response => {
            if (response.ok) {
                func()
            }
        })
}

export function changeUserPhone(id, phoneNumber, func) {
    fetch(`/api/user/${id}/update/phone`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'phone=' + encodeURIComponent(phoneNumber)
    })
        .then(response => {
            if (response.ok) {
                func()
            }
        })
}

export function changeUserPassword(id, oldPassword, newPassword, func) {
    const data = {
        oldPassword: oldPassword,
        newPassword: newPassword
    }

    fetch(`/api/user/${id}/update/password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (response.status === 200) {
                func()
            }
        })
}

export function changeUserRole(id, role, func){
    fetch(`/api/user/${id}/change-role`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'role=' + encodeURIComponent(role)
    })
        .then(response => {
            if(response.ok){
                func()
            }
    })
}

export function banUser(id, func){
    fetch(`/api/user/${id}/ban`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
        .then(response => {
            if(response.ok){
                func()
            }
        })
}

function getArtistStatus() {
    const isConfirmed = window.confirm("Are you sure you want to perform this action?")

    if (isConfirmed) {
        fetch('/api/user/get-status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.ok) {

                }
            })
    }
}


function logOut() {
    fetch('/api/user/logout', {
        method: 'POST',
    })
        .then(response => {
            window.location.href = '/login'
        })
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
        clearTimeout(closeTimeout)
    }
})
dropdownMenu.addEventListener('mouseenter', () => {
    dropdownMenu.style.display = 'block'
    if (closeTimeout) {
        clearTimeout(closeTimeout)
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

const menuItems = document.querySelectorAll('.menu-item')
const actions = {
    viewUserProfile,
    // openSettings,
    logOut,
    openAdminPanel,
    openArtistPanel
}
menuItems.forEach((menuItem) => {
    menuItem.addEventListener('click', () => {
        const action = menuItem.getAttribute('data-action')
        actions[action]()
        dropdownMenu.style.display = 'none'
    })
})
