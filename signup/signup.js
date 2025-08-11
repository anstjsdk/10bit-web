document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.querySelector('form');
  
    signupForm.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const userid = document.getElementById('userid').value.trim();
      const password = document.getElementById('password').value.trim();
      const student = document.getElementById('student').value.trim();
      const email = document.getElementById('email').value.trim();
  
      if (!userid || !password || !student || !email) {
        alert('모든 항목을 입력해주세요.');
        return;
      }
  
      fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userid,
          password,
          student,
          email,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            alert('회원가입 성공!');
            window.location.href = '../login/login.html';
          } else {
            alert('회원가입 실패: ' + data.message);
          }
        })
        .catch((err) => {
          console.error('회원가입 오류:', err);
          alert('서버에 연결할 수 없습니다.');
        });
    });
  });