import {deleteAvatar, openArtistPanel} from './userSettings.js'
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

        const userButton = document.getElementById(userButtonId)
        userButton.addEventListener('click', () => {
            createUserPage(user)
        })


    }
}

function createUserPage(user){
    workStation.innerHTML = ``

    const userPage = document.createElement('div')
    userPage.className = 'admin-user-page'
    userPage.innerHTML = `
        <div class="admin-panel-title">
            <h1>Sh1chiro</h1>
        </div>
        <div class="admin-active-buttons aup">
            <div class="change-nickname admin-active-button">
                <button id="change-nickname-id">Nickname</button>
            </div>
            <div class="change-phonenumber admin-active-button">
                <button id="change-phonenumber-id">Phone</button>
            </div>
            <div class="change-email admin-active-button">
                <button id="change-email-id">Email</button>
            </div>
            <div class="delete-avatar admin-active-button">
                <button id="delete-avatar-id">Delete avatar</button>
            </div>
            <div class="change-password admin-active-button">
                <button id="change-password-id">Password</button>
            </div>
            <div class="change-role admin-active-button">
                <button id="change-role-id">Role</button>
            </div>
            <div class="ban admin-active-button">
                <button id="ban-id">Ban</button>
            </div>
        </div>
        
        <div class="admin-user-profile">
            <div class="current-avatar">
                <img src="${user.avatarId ? '/image/' + user.avatarId : '../img/without-image.png'}">
            </div>
            <div class="admin-user-profile-nickname blck">
                <p class="profile-label">Nickname:</p><p>${user.nickname}</p>
            </div>
            <div class="admin-user-profile-phone-number blck">
                <p class="profile-label">Phone number:</p><p>${user.phoneNumber}</p>
            </div>
            <div class="admin-user-profile-emai blckl">
                <p class="profile-label">Email:</p><p>${user.email}</p>
            </div>
            <div class="admin-user-profile-role blck">
                <p class="profile-label">Role:</p><p>${user.role}</p>
            </div>
            <div class="admin-user-profile-date-of-created blck">
                <p class="profile-label">Date of created:</p><p>${user.dateOfCreated}</p>
            </div>
        </div>
        
        <hr>
    `
    workStation.appendChild(userPage)

    const changeNicknameButton = document.getElementById('change-nickname-id')
    changeNicknameButton.addEventListener('click', (event) => {
        const nickname = prompt(`Please enter a new nickname for ${user.nickname}`, "")

        changeUserNickname(user.id, nickname, adminPanel)
    })

    const changePhoneNumberButton = document.getElementById('change-phonenumber-id')
    changePhoneNumberButton.addEventListener('click', () => {
        const phone = prompt(`Please enter a new phoneNumber for ${user.nickname}`, "")

        changeUserPhone(user.id, phone, adminPanel)
    })

    const changeEmailButton = document.getElementById('change-email-id')
    changeEmailButton.addEventListener('click', () => {
        const email = prompt(`Please enter a new email for ${user.nickname}`, "")

        changeUserEmail(user.id, email, adminPanel)
    })

    const deleteAvatarButton = document.getElementById('delete-avatar-id')
    deleteAvatarButton.addEventListener('click', () => {
        const confirmation = window.confirm(`Are you sure you want to delete avatar for ${user.nickname}?`)
        if(confirmation){
            deleteAvatar(user.id, adminPanel)
        }
    })

    const changePasswordButton = document.getElementById('change-password-id')
    changePasswordButton.addEventListener('click', () => {
        const password = prompt(`Please enter a new password for ${user.nickname}`, "")

        changeUserPassword(user.id, 'admin', password, adminPanel)
    })

    const changeRoleButton = document.getElementById('change-role-id')
    changeRoleButton.addEventListener('click', () => {
        const role = prompt(`Please enter a new role for ${user.nickname}`, "")

        changeUserRole(user.id, role, adminPanel)
    })

    const banButton = document.getElementById('ban-id')
    banButton.addEventListener('click', () => {
        const confirmation = window.confirm(`Are you sure want to ban user - ${user.nickname}?`)
        if(confirmation){
            banUser(user.id, adminPanel)
        }
    })


    if(user.role === 'artist' || user.role === 'moderator' || user.role === 'admin' || user.role === 'creator'){
        fetch(`/api/album/user-albums/${user.id}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                if(data.length > 0){
                    const userAlbums = document.createElement('div')
                    userAlbums.className = 'my-albums'
                    userAlbums.innerHTML = `
                        <div class="my-albums-title">
                            <h2>Albums</h2>
                        </div> `
                    userPage.append(userAlbums)

                    for(let i = 0; i < data.length; i++){
                        const album = data[i]

                        const albumButtonId = `my-albums-button-${i}`
                        const changeNicknameButtonId = `change-nickname-${i}`
                        const deleteAvatarButtonId = `delete-avatar-${i}`
                        const deleteAlbumButtonId = `delete-album-id-${i}`
                        const albumBlock = document.createElement('div')
                        albumBlock.className = 'my-album-block'
                        albumBlock.innerHTML = `
                            <div class="my-album-num">
                                <p>${i+1}.</p>
                            </div>
                            <div class="my-album-title">
                                <button class="my-albums-button-id" id="${albumButtonId}">${album.title}</button>
                            </div>
                            <div class="my-album-songs">
                                <p>${album.totalSongs}</p>
                            </div>
                            <div class="admin-active-buttons">
                                <div class="change-nickname admin-active-button">
                                    <button id="${changeNicknameButtonId}">Change title</button>
                                </div>
                                <div class="delete-avatar admin-active-button">
                                    <button id="${deleteAvatarButtonId}">Delete preview</button>
                                </div>
                                <div class="ban admin-active-button">
                                    <button id="${deleteAlbumButtonId}">Delete album</button>
                                </div>
                            </div>`
                        userAlbums.appendChild(albumBlock)

                        if(i+1 < data.length){
                            const hrBlock = document.createElement('div')
                            hrBlock.className = 'my-album-block-hr'
                            hrBlock.innerHTML = '<hr>'

                            userAlbums.appendChild(hrBlock)
                        }

                        document.getElementById(changeNicknameButtonId).addEventListener('click', () => {
                            const title = prompt(`Please enter a new title for ${album.title}`, "")
                            fetch(`/api/artist/update/album/${album.id}`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                },
                                body: 'albumTitle=' + encodeURIComponent(title)
                            })
                                .then(response => {
                                    if (response.ok) {
                                        adminPanel()
                                    }
                                })
                        })
                        document.getElementById(deleteAvatarButtonId).addEventListener('click', () => {
                            const confirmation = window.confirm(`Are you sure you want to delete avatar for ${album.title}?`)
                            if(confirmation){
                                fetch(`/api/image/delete/album-image/${album.id}`, {
                                    method: 'POST'
                                })
                                    .then(response => response.json)
                                    .then(data => {
                                        adminPanel()
                                    })
                            }
                        })
                        document.getElementById(deleteAlbumButtonId).addEventListener('click', () => {
                            const confirmation = window.confirm(`Are you sure you want to delete album ${album.title}?`)
                            if(confirmation){
                                fetch(`/api/album/delete/${album.id}`, {
                                    method: 'POST'
                                })
                                    .then(response => {
                                        if (response.ok) {
                                            adminPanel()
                                        }
                                    })
                                    .catch(error => {
                                        console.error('An error occurred:', error)
                                    })
                            }
                        })
                    }
                }
            })
    }

}




