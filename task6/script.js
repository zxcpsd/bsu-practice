var functionZ = function (){
var posts = [
    {
        id:'1',
        description: 'sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text ',
        createdAt: new Date('2020-03-17T23:00:01'),
        author: 'Lucas Tyber',
        likes: ['user1','user2']
    },
    {
        id:'2',
        description: 'sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text ',
        createdAt: new Date('2020-04-17T23:00:02'),
        author: 'qwe', 
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        likes: ['user1','user3']
    },
    {
        id:'3',
        description: 'sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text ',
        createdAt: new Date('2020-04-17T23:00:00'),
        author: 'qwe',
        photoLink: "www.com",
        likes: ['user1','user12'],
    },
    {
        id:'4',
        description: 'sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text ',
        createdAt: new Date('2020-03-11T23:00:00'),
        author: 'zxcr',
        hashtagList: ['animee','1334'],
        likes: ['user1','user123'],
    },
    {
        id:'5',
        description: 'sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text ',
        createdAt: new Date('2020-04-16T23:00:00'),
        author: 'zxcr',
        hashtagList:['a','13371'],
        likes: ['user12','user251'],
    },
    {
        id:'6',
        description: 'sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text ',
        createdAt: new Date('2010-03-17T23:00:00'),
        author: 'zxcr',
        likes: ['user11','user23'],
    },
    {
        id:'7',
        description: 'sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text ',
        createdAt: new Date('2020-01-17T23:00:00'),
        author: 'zxcr',
        likes: ['user12','user23'],
    },
    {
        id:'8',
        description: 'sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text ',
        createdAt: new Date('2020-03-17T21:00:00'),
        author: 'zxcr',
        likes: ['user251','user2'],
    },
    {
        id:'9',
        description: 'sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text ',
        createdAt: new Date('2021-03-17T23:00:00'),
        author: 'zxcr',
        likes: ['user1'],
    },
    {
        id:'10',
        description: 'sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text ',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'zxcr',
        hashtagList:['anime','1337'],
        likes: ['user1'],
    },
    {
        id:'11',
        description: 'sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text ',
        createdAt: new Date('2020-04-17T23:00:00'),
        author: 'qwe',
        likes: ['user1'],
    },
    {
        id:'12',
        description: 'sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text ',
        createdAt: new Date('2020-03-17T23:01:00'),
        author: 'zqwe',
        likes: ['user1'],
    },
    {
        id:'13',
        description: 'sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text ',
        createdAt: new Date('2020-03-11T23:01:00'),
        author: 'zxcr',
        hashtagList:['anime','1337'],
        likes: ['user1'],
        
    },
    {
        id:'14',
        description: 'sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text ',
        createdAt: new Date('2020-03-15T23:06:00'),
        author: 'zxcr',
        likes: ['user1'],
    },
    {
        id:'15',
        description: 'sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text ',
        createdAt: new Date('2020-03-17T23:16:00'),
        author: 'zxcr',
        likes: ['user1'],
    },
    {
        id:'16',
        description: 'sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text ',
        createdAt: new Date('2020-03-17T23:20:00'),
        author: 'zxcr',
        likes: ['user1'],
    },
    {
        id:'17',
        description: 'sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text ',
        createdAt: new Date('2020-01-17T23:00:00'),
        author: 'zxcr',
        likes: ['user1'],
    },
    {
        id:'18',
        description: 'sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text ',
        createdAt: new Date('2020-02-17T23:00:00'),
        author: 'zxcr',
        likes: ['user1'],
    },
    {
        id:'19',
        description: 'sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text ',
        createdAt: new Date('2020-03-17T23:00:45'),
        author: 'dgsr',
        hashtagList:['anime','1338'],
        likes: ['user1'],
    },
    {
        id:'20',
        description: 'sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text ',
        createdAt: new Date('2020-03-17T23:00:03'),
        author: 'qwe',
        likes: ['user1'],
    },
]
let getPost = function(inputId){
    for (var post of posts){
        if (post.id === inputId) {
            return post;
        }
    }
}
let validatePost = function(inputPost){
    if (typeof inputPost.author !== 'string') return false;
    if (typeof inputPost.id !== 'string') return false;
    if (typeof inputPost.description !== 'string') return false;
    if (typeof inputPost.createdAt !== 'object') return false;
    if (inputPost.description.length > 200) return false;
    if (inputPost.photoLink && typeof inputPost.photoLink !== 'string') return false;
    return true;
}

let addPost = function(inputPost){
    if (validatePost(inputPost)) {
        posts.push(inputPost);
        return true;
    }
    else{
        return false;
    }
}

let post1 = {
    id:'123', 
    description:"qweqwewqeqweqwe",
    createdAt: new Date(),
    author:'Lucas Tyber',
    hashtagList:['qwe','ert']
}
let removePost = function(inputId){
    let prevLength = posts.length;
    posts = posts.filter(post => post.id !== inputId);
    
    return ((prevLength - posts.length) === 1) ? true : false;
}
let sortPostsDate = function(inputPosts){
    inputPosts.sort(function compareDates(a, b) {
             return a.createdAt - b.createdAt;
             })
}
let editPost = function(inputId,inputPost,tempPosts){
    let index = tempPosts.findIndex(post => (post.id === inputId));
    if (validatePost(tempPosts[index])){
        if (inputPost.description) {
            tempPosts[index].description = inputPost.description;
        }
        if (inputPost.photoLink){
            tempPosts[index].photoLink = inputPost.photoLink;
        }
        if (inputPost.hashtagList){
            tempPosts[index].hashtagList = inputPost.hashtagList;
        }
        if (inputPost.likes){
            tempPosts[index].likes = inputPost.likes;
        }
        return true;
    }
    return false;
}
let getPosts = function(skip = 0,top = 10, filter = {}){
    let tempPosts = posts;
    if (filter.author) tempPosts = tempPosts.filter(post => post.author === filter.author);
    if (filter.createdAt) tempPosts = tempPosts.filter(post => post.createdAt === filter.createdAt);
    if (filter.hashtagList) {
            tempPosts = tempPosts.filter(post => post.hashtagList && (
                (post)=>{
                    for (var hashTag of filter.hashtagList){
                        if (post.hashtagList && post.hashtagList.includes(hashTag)) {
                        return true;}
                    }
                    return false;}
                )(post)); 
    }
    if (filter.likes){
        tempPosts = tempPosts.filter(post => post.likes && (
            (post)=>{
                for (var like of filter.likes){
                    if (post.likes && post.likes.includes(like)) 
                    return true;}
                return false;}
            )(post)); 
    } // OR фильтрация по лайкам и хэштегам 
    sortPostsDate(tempPosts);
    
    return tempPosts.slice(skip,top+skip);
}
console.log(getPost('1'));
console.log(posts);
console.log(addPost(post1));
console.log(posts);//добавили пост

// 
console.log(removePost('2'));// удалили пост с существующим id
console.log(removePost('12452')); //удалили пост с несуществующим id, вернуло false
console.log(posts);//
console.log(getPosts(0,10,{author:'zxcr'}));
console.log(getPosts(4,10));
console.log(getPosts(0,0));
console.log(getPosts(0,10,{hashtagList:['anime','qwe']}));
console.log(getPosts(0,10,{likes:['user','user251']}));
editPost('8',{description:'changed',photoLink:'qweqwe'},posts);
console.log(getPost('8'));//изменили пост и вывели
}
functionZ();