const SERVER_URL = 'http://127.0.0.1:8000'

const showModal = async (id) => {
    let result = await getPost(id);
    let content = document.getElementById('content');
    content.innerText = result.content;
    let modal = document.getElementById('modal');
    modal.style.display = 'flex';
}
const closeModal = () => {
    let modal = document.getElementById('modal');
    modal.style.display = 'none';
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

async function getPost(id) { // 아티클 하나씩 불러오기
    let response = await fetch(`${SERVER_URL}/blog/article/${id}`);
    let data = await response.json(); // 여기도 꼭 await 를 해주어야 함
    return data;
  }

async function getPosts() {
    let response = await fetch(`${SERVER_URL}/blog/article`);
    let data = await response.json();
    return data
}

async function deletePost(id) {
    let token = getCookie('access_token');
    let response = await fetch(`${SERVER_URL}/blog/article/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    if (response.status === 204) { // DELETE 요청 성공
        let post = document.getElementById(id);
        post.remove();
    }
}

async function insertPosts() {
    let posts = await getPosts();
    posts.forEach(post => {
        document.body.insertAdjacentHTML('beforeend', `
            <div id="${post.id}" onclick="showModal(${post.id})">
                <h1>${post.author}</h1>
                <h1>${post.title}</h1>
                <p>${post.content}</p>
                <button onclick="deletePost(${post.id})">삭제</button>
            </div>
        `)
    })
}

insertPosts()