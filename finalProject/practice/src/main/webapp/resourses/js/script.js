/* eslint-disable no-inner-declarations */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */

function onl() {
  let skipGlobal = 10;
  let topGlobal = 0;
  let globalFilter;
  let logged = false;
  let author = '';
  let authorId = 0;
  const formatter = new Intl.DateTimeFormat('ru', {
    hour: 'numeric',
    minute: 'numeric',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  class PostCollection {
    constructor() {
      // this._posts.forEach((post) => {
      //   post.createdAt = new Date(post.createdAt);
      // });
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
      return true;
    }

    async add(inputPost) {
      inputPost.hashTags = inputPost.hashTags.join(' ');
      inputPost.id = authorId;
      const headers = {
          'Content-Type': 'application/json;charset=utf-8'
        };
      if (PostCollection._validateEdit(inputPost)) {
        const myInit = {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(inputPost)
        };
        const response = await fetch(`http://localhost:8080/practice/logged/add?userid=${authorId}`, myInit);
        if (!response.ok) {
         alert(response.statusText);
          }
      }
      
    }

    async remove(inputId) {
      let url = 'http://localhost:8080/practice/logged/delete';
      let query = `id=${inputId}`;
      if (query.length) {
        url = `${url}?${query}`;
      }
      const response = await fetch(url);
    }

    _sortPostsDate(inputPosts = this._posts) {
      inputPosts.sort((a, b) => b.createdAt - a.createdAt);
    }

    static _validateEdit(inputPost) {
      console.log(inputPost);
      if (typeof inputPost.photoLink === 'undefined' ||!inputPost.description) { 
        console.log('fail validate');
        return false;
      } 
      return true;
    }
    async edit(inputId, inputPost) {
      inputPost.hashTags = inputPost.hashTags.join(' ');
      inputPost.id = inputId;
      const headers = {
          'Content-Type': 'application/json;charset=utf-8'
        };
      if (PostCollection._validateEdit(inputPost)) {
        const myInit = {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(inputPost)
        };
        const response = await fetch('http://localhost:8080/practice/logged/edit', myInit);
        if (!response.ok) {
         alert(response.statusText);
          }
          const result = await response.text();
      }
    }

    async getPosts(skip = 10, top = 0, filter = {}) {
      //asGetPosts(skip,top,filter).then();
      let url = 'http://localhost:8080/practice/showposts';
      let query = '';
      query+=(`skip=${skip}&top=${top}&userid=${authorId}`);
      if (filter !== {}) {  
          if (filter.createdAt) query+=('&date='+Date.parse(filter.createdAt));
          if (filter.hashTags) {
            query+=('&hashtags=')
            filter.hashTags.forEach((hashtag) => {
              query+=('&hashtags='+encodeURIComponent(hashtag));
            })
          }
          if (filter.author) {
            const authorNew = filter.author.split(' ').join('_');
            query+=('&author='+authorNew);
          }
        
      }
      if (query.length) {
        url = `${url}?${query}`;
      }
      console.log(url);
      let response = await fetch(url);
      let posts = await response.json();
      this._posts = posts;
      console.log(this._posts);
      return this._posts;
    }

    
    async addLike(id) {
      let url = 'http://localhost:8080/practice/logged/toggle';
      const query = `postid=${id}&authorid=${authorId}&isliked=false`;
      if (query.length) {
        url = `${url}?${query}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        alert(response.statusText);
         }
    }

    async removeLike(id) {
      let url = 'http://localhost:8080/practice/logged/toggle';
      const query = `postid=${id}&authorid=${authorId}&isliked=true`;
      if (query.length) {
        url = `${url}?${query}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        alert(response.statusText);
         }
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
          const id = flexPost.getAttribute('id');
          if (authorId !== 0) {
            if (form.classList.contains('liked')) {
              form.classList.toggle('liked');
              removeLike(id);
              form.querySelector('.likes-count').textContent = Number(form.querySelector('.likes-count').textContent) - 1;
            } else {
              form.classList.toggle('liked');
              addLike(id);
              form.querySelector('.likes-count').textContent = Number(form.querySelector('.likes-count').textContent) + 1;
            }
          }
        } else {
          const e = form.parentElement.getAttribute('id');
          let hashTagsList = [];
          let photo = '';
          hashTagsList = form.hashtags.value.split('#').join(' ').split(' ');
          hashTagsList = hashTagsList.filter((ht) => ht !== '');
          editPost(e, { description: form.description.value, hashTags: hashTagsList, photoLink: photo });
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
            const postAuthor = author;
            const postDescription = event2.target.description.value;
            let hashTagsList = event2.target.hashtags.value.split('#').join(' ').split(' ');
            hashTagsList = hashTagsList.filter((ht) => ht !== '');
            addPost({
              id: rId,
              author: postAuthor,
              description: postDescription,
              hashTags: hashTagsList,
              photoLink: ''
            });
            const deleted = document.querySelector('.add-post-form');
            deleted.parentNode.removeChild(deleted);
          }
          inForm.addEventListener('input', onInp);
          postForm.addEventListener('submit', sendPost);
        }
      }
      async function logout() {
        const response = await fetch('http://localhost:8080/practice/logged/logout');
      }
      function exitFunc(event) {
        function onSuccess(value) {
          authorId = 0;
          author = '';
          toggleStatus();
          upd();
        }
        function onError(reason) {
          console.log(`Logout error: ${reason}`);
        }
        logout().then(onSuccess,onError);
      }
      function abortLogin(event) {
        const formWrap = document.querySelector('.log-in');
        formWrap.classList.toggle('hidden');
        let formInput = document.getElementsByClassName('log-input');
        formInput = Array.from(formInput);
        formInput.forEach((item => item.value=''));
      }
      function abortRegister(event) {
        const formWrap = document.querySelector('.register');
        formWrap.classList.toggle('hidden');
        let formInput = document.getElementsByClassName('reg-input');
        formInput = Array.from(formInput);
        formInput.forEach((item => item.value=''));
      }
      async function login(inputName, inputPassword) {
        let url = 'http://localhost:8080/practice/login';
      let query = `username=${btoa(inputName)}&password=${btoa(inputPassword)}`;
        url = `${url}?${query}`;
        const headers = {
          'Content-Type': 'application/json;charset=utf-8'
        };
        const myInit = {
          method: 'POST',
          headers: headers,
        };
        const response = await fetch(url,myInit);
        if (!response.ok) {
         alert(response.statusText);
        }
        const object = response.json();
        return object;
        
      }
      async function register(inputName, inputPassword) {
        const object = {username: btoa(inputName),password: btoa(inputPassword)}
        const headers = {
          'Content-Type': 'application/json;charset=utf-8'
        };
        const myInit = {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(object)
        };
        
        const response = await fetch('http://localhost:8080/practice/register', myInit);
        if (!response.ok) {
         alert(response.statusText);
        }
      
      }
      function submitLogin(event) {
        event.preventDefault();
        const formName = document.getElementById('log-name-input').value;
        const formPassword = document.getElementById('log-pass-input').value;
        function onSuccess(value) {
          console.log(value);
          author = value.name;
          authorId = value.id;
          console.log('Вход в систему прошел успешно.');
          abortLogin(event);
          const status = document.getElementById('log-status');
          const loginButton = document.getElementById('submit-log');
          loginButton.classList.add('hidden');
          toggleStatus();
        }
        function onError(reason) {
          console.log('Ошибка входа');
          const status = document.getElementById('log-status');
          status.textContent = 'Произошла ошибка входа.';
        }
        login(formName,formPassword).then(onSuccess,onError);
      }
      function submitRegister(event) {
        event.preventDefault();
        const formName = document.getElementById('reg-name-input').value;
        const formPassword = document.getElementById('reg-pass-input').value;
        function onSuccess() {
          console.log('Регистрация прошла успешно.');
          const status = document.getElementById('reg-status');
          status.textContent = 'Регистрация прошла успешно.';
          const registerButton = document.getElementById('submit-reg');
          registerButton.classList.add('hidden');
        }
        function onError(reason) {
          console.log('Ошибка регистрации.');
          const status = document.getElementById('reg-status');
          status.textContent = 'Произошла ошибка регистрации.';
        }
        register(formName,formPassword).then(onSuccess,onError);
      }
      function loginFunc(event) {
        event.preventDefault();
        const formWrap = document.querySelector('.log-in');
        formWrap.classList.toggle('hidden');
        const loginButton = document.getElementById('submit-log');
        loginButton.classList.remove('hidden');
        const denyButton = document.getElementById('deny-log');
        denyButton.addEventListener('click',abortLogin);
        const form = document.getElementById('login-form');
        form.addEventListener('submit',submitLogin);
      }
      function registerFunc(event) {
        event.preventDefault();
        const formWrap = document.querySelector('.register');
        formWrap.classList.toggle('hidden');
        const registerButton = document.getElementById('submit-reg');
        registerButton.classList.remove('hidden');
        const denyButton = document.getElementById('deny-reg');
        denyButton.addEventListener('click',abortRegister);
        const form = document.getElementById('register-form');
        form.addEventListener('submit',submitRegister);
      }
      const examineNodeBind = examineNode.bind(this);
      this._container.addEventListener('click', examineNodeBind);
      this._container.addEventListener('submit', submitAction);
      document.querySelector('.add-post').addEventListener('click', eventAddPost);
      document.querySelector('.exit').addEventListener('click', exitFunc);
      document.querySelector('.reg').addEventListener('click',registerFunc);
      document.querySelector('.log').addEventListener('click',loginFunc);
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
      function onError(reason) {
        alert('add-post-error');
      }
      function onSuccess() {
        upd();
      }
      this._postC.add(post).then(onSuccess,onError);
    }

    deletePost(postId) {
      function onError(reason) {
        alert('error delete')
      }
      function onSuccess() {
        console.log('deletion completed');
        upd();
      }
      this._postC.remove(postId).then(onSuccess,onError);
    }

    static _fillPost(postDOM, post) {
      let hashtaglist = '';
      postDOM.querySelector('.flex-post').setAttribute('id', post.id);
      postDOM.querySelector('.post-text').textContent = post.description;
      postDOM.querySelector('.post-author').textContent = post.author;
      if (post.liked) {
        postDOM.querySelector('.like-button-form').classList.add('liked');
      }
      if (post.author_id !== authorId) postDOM.querySelector('.post-button').classList.add('hidden');
      else postDOM.querySelector('.post-button').classList.remove('hidden');
      postDOM.querySelector('.likes-count').textContent = post.likes;
      postDOM.querySelector('.post-date').textContent = formatter.format(new Date(post.createdAt));
      if (typeof post.hashTags !== 'undefined') {
        console.log(post);
        let hashtags = post.hashTags.split(' ');
        hashtags = hashtags.filter((ht) => ht !== '');
        console.log(hashtags);
       hashtags.forEach((hashtag) => { hashtaglist += (`#${hashtag} `); });
      }
      postDOM.querySelector('.hashtags').textContent = hashtaglist;
      return postDOM;
    }

    _showPost(post) {
      let newPost = document.importNode(this._template.content, true);
      newPost = View._fillPost(newPost, post);
      return newPost;
    }

    showPosts(skip = 0, top = 10, filter = globalFilter) {
      let postList;
      function onError(reason) {
        alert('error show');
      }
      function onSuccess(value) {
        postList = value;
        postList = Array.from(postList);
        console.log(postList);
        postList.forEach((post) => this._container.appendChild((this._showPost(post))));
      }
      onSuccess = onSuccess.bind(this);
      this._postC.getPosts(skip, top, filter).then(onSuccess,onError);
      
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

    edit(inputId, inputPost) {
      function onError(reason) {
        alert('error edit');
        console.log(reason);
      }
      function onSuccess() {
        upd();
      }
      this._postC.edit(inputId, inputPost).then(onSuccess,onError);
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
    const name = document.querySelector('.user-name');
    const statusDiv = document.querySelectorAll('.logged');
    const menuB = document.querySelectorAll('.unlogged');
    const arMenuB = Array.from(menuB);
    const arStDiv = Array.from(statusDiv);
    name.textContent = author;
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
  }
  function addPost(post) {
    view.addPost(post);
  }
  function deletePost(id) {
    gd(id);
  }
  // init();
}
document.addEventListener('DOMContentLoaded', onl, false);
