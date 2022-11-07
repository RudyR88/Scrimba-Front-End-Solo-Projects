export class Dog{
    constructor(data){
        Object.assign(this, data)
    }

    setDescisionHTML(){
        const {hasBeenLiked} = this;
        const descisionImgSrc = hasBeenLiked ? "./assets/images/badge-like.png" : "./assets/images/badge-nope.png";
        const descisionImgAlt = hasBeenLiked ? `neon blue to neon green rectangle 
        outline and the word like in capital letters at its center sharing its coloring` 
        : `dark red to light red rectangle outline and the word nope in capital letters at its center sharing its coloring`;
        return `<img class="descisionBadge" src="${descisionImgSrc}" alt="${descisionImgAlt}">`;
    }

    getProfileHtml(){
        const {name, avatar, age, bio, hasBeenSwiped} = this;
        let descision = hasBeenSwiped ? this.setDescisionHTML() : "";
        return `<div id="dogProfile__bg" style='background: var(--dark-gradient), url("${avatar}") center/cover no-repeat'>
                    ${descision}
                    <div id="dogProfile__bio">
                        <h1>${name}, ${age}</h1>
                        <p>${bio}</p>
                        </div>
                    </div>
                </div>`;
    }
}