/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
const formatter = new Intl.DateTimeFormat('ru', {
  hour: 'numeric',
  minute: 'numeric',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

class PostCollection {
  constructor(posts) {
    this._posts = posts;
  }

  get(inputId) {
    return this._posts.find((element) => {
      if (element.id === inputId) {
        return true;
      }
      return false;
    });
  }

  static _validate(inputPost) {
    if (!inputPost) return false;
    if (typeof inputPost.author !== 'string') return false;
    if (typeof inputPost.id !== 'string') return false;
    if (typeof inputPost.description !== 'string') return false;
    if (typeof inputPost.createdAt === 'undefined') inputPost.createdAt = new Date();
    if (inputPost.description.length > 200) return false;
    if (inputPost.photoLink && typeof inputPost.photoLink !== 'string') return false;
    return true;
  }

  add(inputPost) {
    if (PostCollection._validate(inputPost)) {
      this._posts.push(inputPost);
      return true;
    }
    return false;
  }

  remove(inputId) {
    const prevLength = this._posts.length;
    this._posts = this._posts.filter((post) => post.id !== inputId);
    return ((prevLength - this._posts.length) === 1);
  }

  _sortPostsDate(inputPosts = this._posts) {
    inputPosts.sort((a, b) => b.createdAt - a.createdAt);
  }

  edit(inputId, inputPost) {
    const index = this._posts.findIndex((post) => (post.id === inputId));
    if (PostCollection._validate(this._posts[index])) {
      if (inputPost.description) {
        this._posts[index].description = inputPost.description;
      }
      if (inputPost.photoLink) {
        this._posts[index].photoLink = inputPost.photoLink;
      }
      if (inputPost.hashtagList) {
        this._posts[index].hashtagList = inputPost.hashtagList;
      }
      if (inputPost.likes) {
        this._posts[index].likes = inputPost.likes;
      }
      return true;
    }
    return false;
  }

  getPosts(skip = 0, top = 10, filter = {}) {
    let tempPosts = this._posts;
    if (filter.author) tempPosts = tempPosts.filter((post) => post.author === filter.author);
    if (filter.createdAt) {
      tempPosts = tempPosts.filter(
        (post) => post.createdAt === filter.createdAt,
      );
    }
    if (filter.hashtagList) {
      tempPosts = tempPosts.filter((post) => post.hashtagList && (
        (tpost) => {
          const ret = filter.hashtagList.some((elem) => {
            if (tpost.hashtagList && tpost.hashtagList.includes(elem)) {
              return true;
            }
            return false;
          });
          return ret;
        }
      )(post));
    }
    if (filter.likes) {
      tempPosts = tempPosts.filter((post) => post.likes && (
        (tpost) => {
          const ret = filter.likes.some((elem) => {
            if (tpost.likes && tpost.likes.includes(elem)) {
              return true;
            }
            return false;
          });
          return ret;
        }
      )(post));
    } // OR фильтрация по лайкам и хэштегам
    this._sortPostsDate(tempPosts);
    return tempPosts.slice(skip, top + skip);
  }

  addAll(posts) {
    const returnList = [];
    posts.array.forEach((element) => {
      if (this._validate(element)) {
        this._posts.push(element);
      } else {
        returnList.push(element);
      }
    });
    return returnList;
  }
}

const posts = [
  {
    id: '1',
    description: 'id = 1',
    createdAt: new Date('2020-03-17T23:00:01'),
    author: 'Lucas Tyber',
    likes: ['user1', 'user2'],
  },
  {
    id: '2',
    description: 'id = 2',
    createdAt: new Date('2020-04-17T23:00:02'),
    author: 'qwe',
    photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
    likes: ['user1', 'user3'],
  },
  {
    id: '3',
    description: 'id = 3',
    createdAt: new Date('2020-04-17T23:00:00'),
    author: 'qwe',
    photoLink: 'www.com',
    likes: ['user1', 'user12'],
  },
  {
    id: '4',
    description: 'sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text ',
    createdAt: new Date('2020-03-11T23:00:00'),
    author: 'zxcr',
    hashtagList: ['animee', '1334'],
    likes: ['user1', 'user123'],
  },
  {
    id: '5',
    description: 'id = 5 ',
    createdAt: new Date('2020-04-16T23:00:00'),
    author: 'zxcr',
    hashtagList: ['a', '13371'],
    likes: ['user12', 'user251'],
  },
  {
    id: '6',
    description: 'sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text ',
    createdAt: new Date('2010-03-17T23:00:00'),
    author: 'zxcr',
    likes: ['user11', 'user23'],
  },
  {
    id: '7',
    description: 'sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text ',
    createdAt: new Date('2020-01-17T23:00:00'),
    author: 'zxcr',
    likes: ['user12', 'user23'],
  },
  {
    id: '8',
    description: 'sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text ',
    createdAt: new Date('2020-03-17T21:00:00'),
    author: 'zxcr',
    likes: ['user251', 'user2'],
  },
  {
    id: '9',
    description: 'sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text ',
    createdAt: new Date('2019-03-17T23:00:00'),
    author: 'zxcr',
    likes: ['user1'],
  },
  {
    id: '10',
    description: 'sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text ',
    createdAt: new Date('2020-03-17T23:00:00'),
    author: 'zxcr',
    hashtagList: ['anime', '1337'],
    likes: ['user1'],
  },
  {
    id: '11',
    description: 'sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text ',
    createdAt: new Date('2020-04-17T23:00:00'),
    author: 'qwe',
    likes: ['user1'],
  },
  {
    id: '12',
    description: 'sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text ',
    createdAt: new Date('2020-03-17T23:01:00'),
    author: 'zqwe',
    likes: ['user1'],
  },
  {
    id: '13',
    description: 'sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text ',
    createdAt: new Date('2020-03-11T23:01:00'),
    author: 'zxcr',
    hashtagList: ['anime', '1337'],
    likes: ['user1'],

  },
  {
    id: '14',
    description: 'sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text ',
    createdAt: new Date('2020-03-15T23:06:00'),
    author: 'zxcr',
    likes: ['user1'],
  },
  {
    id: '15',
    description: 'sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text ',
    createdAt: new Date('2020-03-17T23:16:00'),
    author: 'zxcr',
    likes: ['user1'],
  },
  {
    id: '16',
    description: 'sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text ',
    createdAt: new Date('2020-03-17T23:20:00'),
    author: 'zxcr',
    likes: ['user1'],
  },
  {
    id: '17',
    description: 'sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text ',
    createdAt: new Date('2020-01-17T23:00:00'),
    author: 'zxcr',
    likes: ['user1'],
  },
  {
    id: '18',
    description: 'sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text ',
    createdAt: new Date('2020-02-17T23:00:00'),
    author: 'zxcr',
    likes: ['user1'],
  },
  {
    id: '19',
    description: 'id = 19',
    createdAt: new Date('2020-03-17T23:00:45'),
    author: 'dgsr',
    hashtagList: ['anime', '1338'],
    likes: ['user1'],
  },
  {
    id: '20',
    description: 'id = 20',
    createdAt: new Date('2020-03-17T23:00:03'),
    author: 'qwe',
    likes: ['user1'],
  },
];

class View {
  constructor(inputPosts) {
    this._postC = new PostCollection(inputPosts);
    this._template = document.querySelector('.template');
    this._container = document.querySelector('.wrap');
  }

  addPost(post) {
    this._postC.add(post);
  }

  deletePost(postId) {
    return this._postC.remove(postId);
  }

  static _fillPost(postDOM, post) {
    postDOM.querySelector('.post-text').textContent = post.description;
    postDOM.querySelector('.post-author').textContent = post.author;
    postDOM.querySelector('.likes-count').textContent = post.likes.length;
    postDOM.querySelector('.post-date').textContent = formatter.format(post.createdAt);
    let hashtaglist = '';
    if (typeof post.hashtagList !== 'undefined') post.hashtagList.forEach((hashtag) => { hashtaglist += (`#${hashtag} `); });
    postDOM.querySelector('.hashtags').textContent = hashtaglist;
    return postDOM;
  }

  _showPost(post) {
    let newPost = document.importNode(this._template.content, true);
    newPost = View._fillPost(newPost, post);
    return newPost;
  }

  showPosts() {
    const postList = this._postC.getPosts(0, 10);
    postList.forEach((post) => this._container.appendChild((this._showPost(post))));
  }

  // eslint-disable-next-line class-methods-use-this
  clearView() {
    const list = document.querySelectorAll('.flex-post');
    list.forEach((l) => {
      l.remove();
    });
  }

  get() {
    return this._postC;
  }

  edit(inputId = 1, inputPost) {
    return this._postC.edit(inputId, inputPost);
  }
}

const view = new View(posts);
function gs() {
  view.showPosts();
}
function gd(id) {
  return view.deletePost(id);
}
function cl() {
  view.clearView();
}
function upd() {
  view.clearView();
  view.showPosts();
}
function get() {
  return view.get();
}
function ed(inputId, inputPost) {
  return view.edit(inputId, inputPost);
}
function toggleStatus() {
  const statusDiv = document.querySelectorAll('.logged');
  const menuB = document.querySelectorAll('.unlogged');
  const arMenuB = Array.from(menuB);
  const arStDiv = Array.from(statusDiv);
  arMenuB.forEach((button) => { button.classList.toggle('hidden'); });
  arStDiv.forEach((button) => { button.classList.toggle('hidden'); });
  if (statusDiv.item(0).classList.contains('hidden')) {
    document.querySelector('.header').style.justifyContent = 'flex-end';
  } else {
    document.querySelector('.header').style.justifyContent = 'flex-start';
  }
}
function init() {
  toggleStatus();
  upd();
}
function editPost(inputId, inputPost) {
  view.edit(inputId, inputPost);
  upd();
}
function addPost(post) {
  view.addPost(post);
  upd();
}
function deletePost(id) {
  gd(id);
  upd();
}
init();
