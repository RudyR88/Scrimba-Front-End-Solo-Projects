import {posts} from './data.js';

function render(){
    document.querySelector('.posts-container').innerHTML = getPostHTML()
}

function getPostHTML(){
    let postHTML = "";
    for (const p of posts){
        const { name, 
                username, 
                location, 
                avatar, 
                avatarAlt, 
                post, 
                postAlt, 
                comment, 
                likes} = p
        postHTML += `
        <div class="post flex-column-left">
            <div class="post__header flex-row-gap">
                <img class="user-profile" src=${avatar} alt=${avatarAlt}>
                <div class="post__info">
                    <h2>${name}</h2>
                    <span class="location">${location}</span>
                </div>
            </div>
            <img class="post__img" src=${post} alt=${postAlt}>
            <div class="post__about">
                <div class="controls flex-between">
                    <img class="controls__icon" src="./assets/images/icon-heart.png" alt="love icon">
                    <img class="controls__icon" src="./assets/images/icon-comment.png" alt="comment icon">
                    <img class="controls__icon" src="./assets/images/icon-dm.png" alt="dm icon">
                </div>
                <span class="likes">${likes} likes</span>
                <p><strong>${username}</strong> ${comment}</p>
            </div>
        </div>
        `
    }
    return postHTML;
}

render()