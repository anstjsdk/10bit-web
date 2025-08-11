document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('form');
  
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const userid = document.getElementById('userid').value.trim();
      const password = document.getElementById('password').value.trim();
  
      if (!userid || !password) {
        alert('아이디와 비밀번호를 모두 입력해주세요.');
        return;
      }
  
      fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userid,
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            alert(`환영합니다, ${userid}님!`);
            // 필요하면 토큰 저장도 가능
            window.location.href = '../main/main.html';
          } else {
            alert('로그인 실패: ' + data.message);
          }
        })
        .catch((err) => {
          console.error('로그인 오류:', err);
          alert('서버에 연결할 수 없습니다.');
        });
    });
  });