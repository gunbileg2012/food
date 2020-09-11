import uniqid from 'uniqid';

export default class Like {

    constructor(){
        this.likes = [];
    }

    addlike(id, title, author, img){
        //console.log(this.items);
        const like = {id, title, author, img};
        this.likes.push(like);
        return like;
    }

    deletelike(id){
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);
    }

    isLiked(id){
        return this.likes.findIndex(el => el.id === id) === -1;
    }

    getNumberOfLikes(){
        return this.likes.length;
    }
        
}