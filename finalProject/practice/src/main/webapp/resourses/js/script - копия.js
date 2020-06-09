/* eslint-disable no-inner-declarations */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */

function onl() {
  let skipGlobal = 10;
  let topGlobal = 0;
  let globalFilter;
  let logged = false;
  let author = 'Lucas Tyber';

  const formatter = new Intl.DateTimeFormat('ru', {
    hour: 'numeric',
    minute: 'numeric',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  class PostCollection {
    constructor() {
      this.restore();
      this._posts.forEach((post) => {
        post.createdAt = new Date(post.createdAt);
      });
    }

    restore() {
      this._posts = JSON.parse(localStorage.getItem('posts'));
    }

    save() {
      localStorage.setItem('posts', JSON.stringify(this._posts));
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
      if (inputPost.description.length > 200 || inputPost.description.length < 1) return false;
      if (inputPost.photoLink && typeof inputPost.photoLink !== 'string') return false;
      if (!inputPost.likes) inputPost.likes = [];
      return true;
    }

    add(inputPost) {
      if (PostCollection._validate(inputPost)) {
        this._posts.push(inputPost);
        this.save();
        return true;
      }
      return false;
    }

    remove(inputId) {
      const prevLength = this._posts.length;
      this._posts = this._posts.filter((post) => post.id !== inputId);
      this.save();
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
        if (inputPost.hashTags) {
          this._posts[index].hashTags = inputPost.hashTags;
        }
        if (inputPost.likes) {
          this._posts[index].likes = inputPost.likes;
        }
        this.save();
        return true;
      }
      return false;
    }

    getPosts(skip = 0, top = 0, filter = {}) {
      let tempPosts = this._posts;
      if (filter.author) tempPosts = tempPosts.filter((post) => post.author === filter.author);
      if (filter.hashTags) {
        tempPosts = tempPosts.filter((post) => post.hashTags && (
          (tpost) => {
            const ret = filter.hashTags.some((elem) => {
              if (tpost.hashTags && tpost.hashTags.includes(elem)) {
                return true;
              }
              return false;
            });
            return ret;
          }
        )(post));
      }
      if (filter.createdAt) {
        tempPosts = tempPosts.filter((post) => {
          if (filter.createdAt.getFullYear() !== post.createdAt.getFullYear()) return false;
          if (filter.createdAt.getMonth() !== post.createdAt.getMonth()) return false;
          if (filter.createdAt.getDate() !== post.createdAt.getDate()) return false;
          return true;
        });
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
      return tempPosts.slice(top, top + skip);
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
      this.save();
      return returnList;
    }

    addLike(id) {
      const post = this.get(id);
      if (!post.likes.includes(author)) {
        post.likes.push(author);
        this.remove(id);
        this.add(post);
      }
      this.save();
    }

    removeLike(id) {
      const post = this.get(id);
      post.likes = post.likes.filter((like) => like !== author);
      this.remove(id);
      this.add(post);
      this.save();
    }
  }

  class View {
    constructor(inputPosts) {
      this._postC = new PostCollection(inputPosts);
      this._template = document.querySelector('.template');
      this._container = document.querySelector('.wrap');
      function examineNode(event) {
        if (event.target.tagName !== 'BUTTON') {
          return;
        }
        const edited = event.target.parentElement.parentElement.parentElement
          .parentElement.parentElement;
        if (event.target.getAttribute('value') === 'editPost') {
          const p = edited.querySelector('.post-text');
          const textarea = document.createElement('textarea');
          const prevDescription = p.innerHTML;
          const countLength = document.createElement('div');
          const sendButton = document.createElement('button');
          const insertPlace = edited.querySelector('.post-bottom');
          const chooseCap = document.querySelectorAll('.post-button');
          const chCap = Array.from(chooseCap);
          const hashtagTextarea = document.createElement('textarea');
          const prevHashtags = edited.querySelector('.hashtags').textContent;
          const hashtagLength = document.createElement('div');
          const form = document.createElement('form');
          //
          hashtagLength.classList.add('count-length');
          chCap.forEach((node) => { node.classList.toggle('hidden'); });
          //
          sendButton.classList.add('send-button');
          sendButton.textContent = 'Изменить';
          sendButton.type = 'submit';
          //
          edited.removeChild(p);
          //
          textarea.setAttribute('maxlength', '200');
          textarea.setAttribute('name', 'description');
          textarea.setAttribute('form', 'textform');
          textarea.textContent = prevDescription;
          //
          hashtagTextarea.setAttribute('maxlength', '50');
          hashtagTextarea.setAttribute('name', 'hashtags');
          hashtagTextarea.setAttribute('form', 'textform');
          hashtagTextarea.textContent = prevHashtags;
          //
          edited.addEventListener('input', onInp);
          insertPlace.before(form);
          form.setAttribute('onsubmit', 'return false');
          form.append(textarea);
          textarea.focus();
          textarea.selectionStart = prevDescription.length;
          hashtagTextarea.selectionStart = prevHashtags.length;
          countLength.classList.add('count-length');
          countLength.textContent = `Cимволов: ${textarea.value.length}/200`;
          hashtagLength.textContent = `Cимволов: ${hashtagTextarea.value.length}/50`;
          form.append(countLength);
          function onInp() {
            countLength.textContent = `Cимволов: ${textarea.value.length}/200`;
            hashtagLength.textContent = `Cимволов: ${hashtagTextarea.value.length}/50`;
          }
          sendButton.setAttribute('form', 'textform');
          sendButton.setAttribute('action', 'submit');
          const postBottom = edited.querySelector('.post-bottom');
          postBottom.classList.toggle('hidden');
          //
          form.id = 'textform';
          form.method = 'post';
          form.name = 'textform';
          //
          form.append(hashtagTextarea);
          form.append(hashtagLength);
          form.append(sendButton);
        } else if (event.target.getAttribute('value') === 'deletePost') {
          deletePost(edited.getAttribute('id'));
        }
      }
      function submitAction(event) {
        const form = event.target;
        event.preventDefault();
        if (form.classList.contains('like-button-form')) {
          const flexPost = form.parentElement.parentElement;
          if (form.classList.contains('liked')) {
            form.classList.toggle('liked');
            const id = flexPost.getAttribute('id');
            removeLike(id);
            form.querySelector('.likes-count').textContent = Number(form.querySelector('.likes-count').textContent) - 1;
          } else {
            form.classList.toggle('liked');
            const id = flexPost.getAttribute('id');
            addLike(id);
            form.querySelector('.likes-count').textContent = Number(form.querySelector('.likes-count').textContent) + 1;
          }
        } else {
          const e = form.parentElement.getAttribute('id');
          let hashTagsList = [];
          hashTagsList = form.hashtags.value.split('#').join(' ').split(' ');
          hashTagsList = hashTagsList.filter((ht) => ht !== '');
          editPost(e, { description: form.description.value, hashTags: hashTagsList });
        }
      }
      function eventAddPost(event) {
        if (!document.querySelector('.add-post-form')) {
          const postForm = document.createElement('div');
          const inForm = document.createElement('form');
          const textArDescription = document.createElement('textarea');
          const textArHashtags = document.createElement('textarea');
          const countDescr = document.createElement('p');
          const countHtags = document.createElement('p');
          const sendBut = document.createElement('button');
          const denyBut = document.createElement('button');
          //
          postForm.classList.add('add-post-form');
          textArDescription.classList.add('textarea-descr');
          textArHashtags.classList.add('textarea-htags');
          sendBut.classList.add('new-post-button');
          denyBut.classList.add('new-post-button');
          //
          countDescr.textContent = `Cимволов: ${textArDescription.value.length}/200`;
          countHtags.textContent = `Cимволов: ${textArHashtags.value.length}/50`;
          textArDescription.maxLength = '200';
          textArHashtags.maxLength = '50';
          //
          sendBut.textContent = 'Отправить';
          denyBut.textContent = 'Отменить';
          textArDescription.placeholder = 'Текст поста...';
          textArHashtags.placeholder = '#cats #322';
          textArDescription.name = 'description';
          textArHashtags.name = 'hashtags';
          textArDescription.setAttribute('form', 'sendForm');
          textArHashtags.setAttribute('form', 'sendForm');
          inForm.id = 'sendForm';
          inForm.method = 'post';
          inForm.setAttribute('onsubmit', 'return false;');
          sendBut.type = 'submit';
          sendBut.action = 'submit';
          denyBut.type = 'button';
          denyBut.id = 'denyBut';
          denyBut.onclick = function oncl() {
            const deleted = document.querySelector('.add-post-form');
            deleted.parentNode.removeChild(deleted);
          };
          //
          inForm.append(textArDescription);
          inForm.append(countDescr);
          inForm.append(textArHashtags);
          inForm.append(countHtags);
          inForm.append(sendBut);
          inForm.append(denyBut);
          //
          postForm.append(inForm);
          document.querySelector('header').append(postForm);
          //
          function onInp() {
            countDescr.textContent = `Cимволов: ${textArDescription.value.length}/200`;
            countHtags.textContent = `Cимволов: ${textArHashtags.value.length}/50`;
          }
          function sendPost(event2) {
            const rId = String(Math.floor(Math.random() * (10000)));
            const postAuthor = 'Lucas Tyber';
            const postDescription = event2.target.description.value;
            let hashTagsList = event2.target.hashtags.value.split('#').join(' ').split(' ');
            hashTagsList = hashTagsList.filter((ht) => ht !== '');
            addPost({
              id: rId,
              author: postAuthor,
              description: postDescription,
              hashTags: hashTagsList,
            });
            const deleted = document.querySelector('.add-post-form');
            deleted.parentNode.removeChild(deleted);
          }
          inForm.addEventListener('input', onInp);
          postForm.addEventListener('submit', sendPost);
        }
      }
      function exitFunc(event) {
        toggleStatus();
      }
      //
      const examineNodeBind = examineNode.bind(this);
      this._container.addEventListener('click', examineNodeBind);
      this._container.addEventListener('submit', submitAction);
      document.querySelector('.add-post').addEventListener('click', eventAddPost);
      document.querySelector('.exit').addEventListener('click', exitFunc);
      document.querySelector('.login').addEventListener('click', exitFunc);
      //
      document.getElementById('filter-form').setAttribute('onsubmit', 'return false');
      function addFilterAuthor() {
        if (!document.getElementById('filter-author')) {
          const newFilter = document.createElement('div');
          newFilter.classList.add('filter-item');
          newFilter.setAttribute('id', 'filter-author');
          const input = document.createElement('input');
          const exitButton = document.createElement('button');
          exitButton.classList.add('exit-button');
          exitButton.textContent = 'Удалить фильтр';
          input.setAttribute('form', 'filter-form');
          input.type = 'text';
          input.name = 'author';
          input.placeholder = 'Никнейм автора';
          newFilter.append(input);
          newFilter.append(exitButton);
          document.getElementById('filter-form').prepend(newFilter);
          exitButton.onclick = () => {
            const form = document.getElementById('filter-form');
            if (form.author) form.author.value = null;
            form.removeChild(document.getElementById('filter-author'));
          };
        }
      }
      function addFilterDate() {
        if (!document.getElementById('filter-date')) {
          const newFilter = document.createElement('div');
          newFilter.classList.add('filter-item');
          newFilter.setAttribute('id', 'filter-date');
          const input = document.createElement('input');
          const exitButton = document.createElement('button');
          exitButton.classList.add('exit-button');
          exitButton.textContent = 'Удалить фильтр';
          input.setAttribute('form', 'filter-form');
          input.type = 'text';
          input.name = 'date';
          input.placeholder = 'гггг-мм-дд';
          newFilter.append(input);
          newFilter.append(exitButton);
          document.getElementById('filter-form').prepend(newFilter);
          exitButton.onclick = () => {
            const form = document.getElementById('filter-form');
            if (form.date) form.date.value = null;
            form.removeChild(document.getElementById('filter-date'));
          };
        }
      }
      function addFilterHashtag() {
        if (!document.getElementById('filter-hashtag')) {
          const newFilter = document.createElement('div');
          newFilter.classList.add('filter-item');
          newFilter.setAttribute('id', 'filter-hashtag');
          const input = document.createElement('input');
          const exitButton = document.createElement('button');
          exitButton.classList.add('exit-button');
          exitButton.textContent = 'Удалить фильтр';
          input.setAttribute('form', 'filter-form');
          input.type = 'text';
          input.name = 'hashtags';
          input.placeholder = 'Введите хэштеги';
          newFilter.append(input);
          newFilter.append(exitButton);
          document.getElementById('filter-form').prepend(newFilter);
          exitButton.onclick = () => {
            const form = document.getElementById('filter-form');
            if (form.hashtags) form.hashtags.value = null;
            form.removeChild(document.getElementById('filter-hashtag'));
          };
        }
      }
      function submitFilters(event) {
        event.preventDefault();
        const form = document.getElementById('filter-form');
        form.setAttribute('onsubmit', 'return false;');
        let postHashtags = '';
        if (form.hashtags) postHashtags = form.hashtags.value;
        postHashtags = postHashtags.split('#').join(' ').split(' ').filter((ht) => ht !== '');
        if (postHashtags.length === 0) {
          postHashtags = undefined;
        }
        let postAuthor = '';
        if (form.author) postAuthor = form.author.value;
        let postDate = '';
        if (form.date) postDate = form.date.value;
        postDate = new Date(Date.parse(postDate));
        if (postAuthor === '') postAuthor = undefined;
        // eslint-disable-next-line no-restricted-globals
        if (isNaN(postDate.getTime())) postDate = undefined;

        skipGlobal = 10;
        topGlobal = 0;
        const filter = { author: postAuthor, createdAt: postDate, hashTags: postHashtags };
        globalFilter = filter;
        gs(skipGlobal, topGlobal, filter);
      }
      function loadMore(event) {
        if (globalFilter !== {} && topGlobal === 0) cl();
        np();
        topGlobal += 10;
      }
      //
      document.getElementById('author-filter').onclick = addFilterAuthor;
      document.getElementById('hashtag-filter').onclick = addFilterHashtag;
      document.getElementById('date-filter').onclick = addFilterDate;
      document.getElementById('filter-form').addEventListener('submit', submitFilters);
      document.getElementById('load-more-button').addEventListener('click', loadMore);
      //
    }

    addLike(id) {
      this._postC.addLike(id);
    }

    removeLike(id) {
      this._postC.removeLike(id);
    }

    addPost(post) {
      this._postC.add(post);
    }

    deletePost(postId) {
      return this._postC.remove(postId);
    }

    static _fillPost(postDOM, post) {
      let hashtaglist = '';
      postDOM.querySelector('.flex-post').setAttribute('id', post.id);
      postDOM.querySelector('.post-text').textContent = post.description;
      postDOM.querySelector('.post-author').textContent = post.author;
      if (post.likes.includes(author)) {
        postDOM.querySelector('.like-button-form').classList.add('liked');
      }
      postDOM.querySelector('.likes-count').textContent = post.likes.length;
      postDOM.querySelector('.post-date').textContent = formatter.format(post.createdAt);
      if (typeof post.hashTags !== 'undefined') post.hashTags.forEach((hashtag) => { hashtaglist += (`#${hashtag} `); });
      postDOM.querySelector('.hashtags').textContent = hashtaglist;
      return postDOM;
    }

    _showPost(post) {
      let newPost = document.importNode(this._template.content, true);
      newPost = View._fillPost(newPost, post);
      return newPost;
    }

    showPosts(skip = 0, top = 10, filter = globalFilter) {
      const postList = this._postC.getPosts(skip, top, filter);
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

    static toggleStatus() {
      logged = !logged;
      const statusDiv = document.querySelectorAll('.logged');
      const menuB = document.querySelectorAll('.unlogged');
      const arMenuB = Array.from(menuB);
      const arStDiv = Array.from(statusDiv);
      arMenuB.forEach((button) => { button.classList.toggle('hidden'); });
      arStDiv.forEach((button) => { button.classList.toggle('hidden'); });
      if (statusDiv.item(0).classList.contains('hidden')) {
        document.querySelector('.header').style.justifyContent = 'flex-end';
      } else {
        document.querySelector('.header').removeAttribute('style');
      }
    }

    update() {
      this.clearView();
      this.showPosts();
    }
  }

  const view = new View();
  function addLike(id) {
    view.addLike(id);
  }
  function removeLike(id) {
    view.removeLike(id);
  }
  function gs(skip = 0, top = 10, filter = {}) {
    view.clearView();
    view.showPosts(skip, top, filter);
  }
  function gd(id) {
    return view.deletePost(id);
  }
  function cl() {
    view.clearView();
  }
  function upd() {
    view.clearView();
    view.showPosts(10, 0);
  }
  function np() {
    view.showPosts(skipGlobal, topGlobal, globalFilter);
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
    View.toggleStatus();
    view.update();
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
  // init();
  toggleStatus();
}
document.addEventListener('DOMContentLoaded', onl, false);
