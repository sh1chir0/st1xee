import {deleteAvatar} from './userSettings.js'
import {changeUserNickname} from './userSettings.js'
import {changeUserEmail} from './userSettings.js'
import {changeUserPhone} from './userSettings.js'
import {changeUserPassword} from './userSettings.js'
import {changeUserRole} from './userSettings.js'
import {banUser} from './userSettings.js'

const workStation = document.querySelector('.work-station')

export function adminPanel(){
    workStation.innerHTML = ''
    const adminPanel = document.createElement('div')
    adminPanel.className = 'admin-panel'
    adminPanel.innerHTML = `
        <div class="admin-panel-title">
        <h1>Admin Panel</h1>
        </div>
        <div class="admin-buttons">
            <div class="admin-button">
                <div class="admins">
                    <button id="ap-admins">Admins</button>
                </div>
            </div>
            <div class="admin-button">
                <div class="artists">
                    <button id="ap-artists">Artists</button>
                </div>
            </div>
            <div class="admin-button">
                <div class="users">
                    <button id="ap-users">Users</button>
                </div>
            </div>
            <div class="admin-button">
                <div class="artists-orders">
                    <button id="ap-artists-orders">Artist's orders</button>
                </div>
            </div>
        </div>
    `
    workStation.appendChild(adminPanel)

    const adminsButton = document.getElementById('ap-admins')
    adminsButton.addEventListener('click', () => {
        adminsPage()
    })

    const artistsButton = document.getElementById('ap-artists')
    artistsButton.addEventListener('click', () => {
        console.log("button pressed")
        artistsPage()
    })

    const usersButton = document.getElementById('ap-users')
    usersButton.addEventListener('click', () => {
        usersPage()
    })

    const artistsOrders = document.getElementById('ap-artists-orders')
    artistsOrders.addEventListener('click', () => {
        fetch('/api/artist-order/get-all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                artistsOrdersPage(data)
            })
    })
}

function adminsPage(){
    workStation.innerHTML = ``
    fetch('/api/user/get/admins', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            createPageWithUsers('Admins', data)
        })
}

function artistsPage(){
    fetch('/api/user/get/artists', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            createPageWithUsers('Artists', data)
        })
}

function usersPage(){
    fetch(`/api/user/get/users`, {
        method: 'GET',
        headers:{
            'Content-type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            createPageWithUsers('Users', data)
        })
}

function artistsOrdersPage(list){
    workStation.innerHTML = ``
    const usersPage = document.createElement('div')
    usersPage.className = 'users-page'
    usersPage.innerHTML = `
        <div class="admin-panel-title">
            <h1>Artist's orders</h1>
        </div>
        <div class="users">
        </div>
    `
    workStation.appendChild(usersPage)

    const usersBlock = document.querySelector('.users')
    for (let i = 0; i < list.length; i++) {
        const user = list[i]

        const userBlock = document.createElement('div')
        const userButtonId = `user-button-${i}`
        const approveButtonId = `approve-${i}`
        const refuseButtonId = `refuse-${i}`
        userBlock.className = 'user-block'
        userBlock.innerHTML = `
            <div class="user-block">
              <div class="user-block-num">
                <p>${i + 1}.</p>
              </div>
              <div class="user-block-nickname">
                <button id="${userButtonId}">${user.nickname}</button>
              </div>
              <div class="line">
                <p>-</p>
              </div>
              <div class="user-block-role">
                <p>${user.role}</p>
              </div>
              <div class="admin-active-buttons">
                <div class="change-nickname admin-active-button">
                  <button id="${approveButtonId}">Approve</button>
                </div>
                <div class="change-phonenumber admin-active-button">
                  <button id="${refuseButtonId}">Refuse</button>
                </div>
              </div>
            </div>
        `
        usersBlock.appendChild(userBlock)

        if (i + 1 < list.length) {
            const hrBlock = document.createElement('div')
            hrBlock.className = 'user-block-hr'
            hrBlock.innerHTML = `<hr>`
            usersBlock.appendChild(hrBlock)
        }

        document.getElementById(approveButtonId).addEventListener('click', () => {
            changeUserRole(user.id, 'artist', adminPanel)
            fetch(`/api/get-artist-order/delete/${user.id}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                },
            })
                .then(response => {
                    if(response.ok){
                        adminPanel()
                    }
                })
        })

        document.getElementById(refuseButtonId).addEventListener('click', () => {
            fetch(`/api/get-artist-order/delete/${user.id}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                },
            })
                .then(response => {
                    if(response.ok){
                        adminPanel()
                    }
                })
        })
    }

}

function createPageWithUsers(title,list){
    workStation.innerHTML = ``
    const usersPage = document.createElement('div')
    usersPage.className = 'users-page'
    usersPage.innerHTML = `
        <div class="admin-panel-title">
            <h1>${title}</h1>
        </div>
        <div class="users">

        </div>
    `
    workStation.appendChild(usersPage)

    const usersBlock = document.querySelector('.users')
    for (let i = 0; i < list.length; i++) {
        const user = list[i]

        const userBlock = document.createElement('div')
        const userButtonId = `user-button-${i}`
        const changeNicknameButtonId = `change-nickname-${i}`
        const changePhoneNumberButtonId = `change-phone-number-${i}`
        const changeEmailButtonId = `change-email-${i}`
        const deleteAvatarButtonId = `delete-avatar-${i}`
        const changePasswordButtonId = `change-password-${i}`
        const changeRoleButtonId = `change-role-${i}`
        const banButtonId = `ban-${i}`
        userBlock.className = 'user-block'
        userBlock.innerHTML = `
            <div class="user-block">
              <div class="user-block-num">
                <p>${i+1}.</p>
              </div>
              <div class="user-block-nickname">
                <button id="${userButtonId}">${user.nickname}</button>
              </div>
              <div class="line">
                <p>-</p>
              </div>
              <div class="user-block-role">
                <p>${user.role}</p>
              </div>
              <div class="admin-active-buttons">
                <div class="change-nickname admin-active-button">
                  <button id="${changeNicknameButtonId}">Nickname</button>
                </div>
                <div class="change-phonenumber admin-active-button">
                  <button id="${changePhoneNumberButtonId}">Phone</button>
                </div>
                <div class="change-email admin-active-button">
                  <button id="${changeEmailButtonId}">Email</button>
                </div>
                <div class="delete-avatar admin-active-button">
                  <button id="${deleteAvatarButtonId}">Delete avatar</button>
                </div>
                <div class="change-password admin-active-button">
                  <button id="${changePasswordButtonId}">Password</button>
                </div>
                <div class="change-role admin-active-button">
                  <button id="${changeRoleButtonId}">Role</button>
                </div>
                <div class="ban admin-active-button">
                  <button id="${banButtonId}">Ban</button>
                </div>
              </div>
            </div>
        `
        usersBlock.appendChild(userBlock)

        const banBtn = document.getElementById(banButtonId)
        if (user.active) {
            banBtn.textContent = "Ban"
        } else {
            banBtn.textContent = "Unban"
        }

        if(i+1 < list.length){
            const hrBlock = document.createElement('div')
            hrBlock.className = 'user-block-hr'
            hrBlock.innerHTML = `<hr>`
            usersBlock.appendChild(hrBlock)
        }

        const changeNicknameButton = document.getElementById(changeNicknameButtonId)
        changeNicknameButton.addEventListener('click', (event) => {
            const nickname = prompt(`Please enter a new nickname for ${user.nickname}`, "")

            changeUserNickname(user.id, nickname, adminPanel)
        })

        const changePhoneNumberButton = document.getElementById(changePhoneNumberButtonId)
        changePhoneNumberButton.addEventListener('click', () => {
            const phone = prompt(`Please enter a new phoneNumber for ${user.nickname}`, "")

            changeUserPhone(user.id, phone, adminPanel)
        })

        const changeEmailButton = document.getElementById(changeEmailButtonId)
        changeEmailButton.addEventListener('click', () => {
            const email = prompt(`Please enter a new email for ${user.nickname}`, "")

            changeUserEmail(user.id, email, adminPanel)
        })

        const deleteAvatarButton = document.getElementById(deleteAvatarButtonId)
        deleteAvatarButton.addEventListener('click', () => {
            const confirmation = window.confirm(`Are you sure you want to delete avatar for ${user.nickname}?`)
            if(confirmation){
                deleteAvatar(user.id, adminPanel)
            }
        })

        const changePasswordButton = document.getElementById(changePasswordButtonId)
        changePasswordButton.addEventListener('click', () => {
            const password = prompt(`Please enter a new password for ${user.nickname}`, "")

            changeUserPassword(user.id, 'admin', password, adminPanel)
        })

        const changeRoleButton = document.getElementById(changeRoleButtonId)
        changeRoleButton.addEventListener('click', () => {
            const role = prompt(`Please enter a new role for ${user.nickname}`, "")

            changeUserRole(user.id, role, adminPanel)
        })

        const banButton = document.getElementById(banButtonId)
        banButton.addEventListener('click', () => {
            const confirmation = window.confirm(`Are you sure want to ban user - ${user.nickname}?`)
            if(confirmation){
                banUser(user.id, adminPanel)
            }
        })

    }
}




