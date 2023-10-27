import {openAdminPanel} from './userSettings.js'

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
                    <button id="admins">Admins</button>
                </div>
            </div>
            <div class="admin-button">
                <div class="artists">
                    <button id="artists">Artists</button>
                </div>
            </div>
            <div class="admin-button">
                <div class="users">
                    <button id="users">Users</button>
                </div>
            </div>
            <div class="admin-button">
                <div class="artists-orders">
                    <button id="artists-orders">Artist's orders</button>
                </div>
            </div>
        </div>
    `
    workStation.appendChild(adminPanel)

    const adminsButton = document.getElementById('admins')
    adminsButton.addEventListener('click', () => {
        adminsPage()
    })

    const artistsButton = document.getElementById('artists')
    artistsButton.addEventListener('click', () => {
        artistsPage()
    })

    const usersButton = document.getElementById('users')
    usersButton.addEventListener('click', () => {
        usersPage()
    })

    const artistsOrders = document.getElementById('artists-orders')
    artistsOrders.addEventListener('click', () => {
        artistsOrdersPage()
    })
}

function adminsPage(){
    workStation.innerHTML = ``
    fetch('/api/admin/get', {
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

}

function usersPage(){

}

function artistsOrdersPage(){

}

function createPageWithUsers(title,list){
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
        const changeBanButtonId = `ban-${i}`
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
                  <button id="${changeBanButtonId}">Ban</button>
                </div>
              </div>
            </div>
        `
        usersBlock.appendChild(userBlock)

        if(i+1 < list.length){
            const hrBlock = document.createElement('div')
            hrBlock.className = 'user-block-hr'
            hrBlock.innerHTML = `<hr>`
            usersBlock.appendChild(hrBlock)
        }

        // КНОПОЧКИ :)
    }
}

function createUserBlock(list){

}



