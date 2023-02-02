const SERVER_URL = 'http://127.0.0.1:8000'

async function login(user) {
    let response = await fetch(`${SERVER_URL}/user/login`,{
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    let data = await response.json();
    return data
}

async function submitLogin() {
    let user = {
        email: document.getElementById('id').value,
        password: document.getElementById('pw').value,
    }
    let result = await login(user);
    if (result.access_token) {
        setCookie('access_token', result.access_token);
        location.href = 'index.html';
    }
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
  
function setCookie(name, value) {
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + "; path=/";
    document.cookie = updatedCookie;
}