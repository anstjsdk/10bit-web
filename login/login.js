document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.querySelector('form');
  if (!loginForm) {
    console.error('로그인 폼을 찾을 수 없습니다.');
    return;
  }

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

    fetch('http://127.0.0.1:5500/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'userAgent': navigator.userAgent
      },
      body: JSON.stringify({ publicId, password }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`서버 응답 오류: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('서버 응답:', data);

        if (data.token) {
          localStorage.setItem('token', data.token);
          alert(`환영합니다, ${publicId}님!`);
          showLogout();
          fetchProtectedAPI();
        } else {
          alert('로그인 실패: ' + (data.message || '서버 응답에 토큰이 없습니다.'));
        }
      })
      .catch((err) => {
        console.error('로그인 오류:', err);
        alert('서버에 연결할 수 없습니다. 서버가 실행 중인지 확인하고 포트 설정을 확인하세요.');
      });
  });

  function fetchProtectedAPI() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('토큰이 없습니다. 보호된 API를 호출할 수 없습니다.');
      return;
    }

    fetch('http://127.0.0.1:5500/someProtectedRoute', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => res.json())
      .then(data => console.log('보호된 API 응답:', data))
      .catch(err => console.error('보호된 API 오류:', err));
  }

  function showLogout() {
    loginForm.style.display = 'none';
    logoutButton.style.display = 'inline-block';
  }

  function showLogin() {
    loginForm.style.display = 'block';
    logoutButton.style.display = 'none';
  }
});