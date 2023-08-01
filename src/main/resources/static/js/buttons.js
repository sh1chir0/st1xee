function openTab(evt, tabName) {
    var i, tabContent, tabBtns;
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }
    tabBtns = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tabBtns.length; i++) {
        tabBtns[i].classList.remove("active");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
}

function showFavoriteHeart(songElement) {
    const favoriteHeart = songElement.querySelector('.favorite-heart');
    favoriteHeart.style.display = 'block';
}

function hideFavoriteHeart(songElement) {
    const favoriteHeart = songElement.querySelector('.favorite-heart');
    favoriteHeart.style.display = 'none';
}



