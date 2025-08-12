document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.querySelector('form');
  const container = document.getElementById('login-container');
  const logoutButton = document.createElement('button');
  logoutButton.textContent = '로그아웃';
  logoutButton.style.display = 'none';

  container.appendChild(logoutButton);

  const token = localStorage.getItem('token');
  if (token) {
    showLogout();
  } else {
    showLogin();
  }

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const publicId = document.getElementById('userid').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!publicId || !password) {
      alert('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'userAgent': navigator.userAgent
      },
      body: JSON.stringify({
        publicId,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.token) {
          localStorage.setItem('token', data.token);
          alert(`환영합니다, ${publicId}님!`);
          showLogout();
        } else {
          alert('로그인 실패: ' + data.message);
        }
      })
      .catch((err) => {
        console.error('로그인 오류:', err);
        alert('서버에 연결할 수 없습니다.');
      });
  });

  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('token');
    alert('로그아웃 되었습니다.');
    showLogin();
  });

  function showLogout() {
    loginForm.style.display = 'none';
    logoutButton.style.display = 'inline-block';
  }

  function showLogin() {
    loginForm.style.display = 'block';
    logoutButton.style.display = 'none';
  }
});