document.addEventListener('DOMContentLoaded', function () {
  const signupForm = document.querySelector('form');

  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const publicId = document.getElementById('userid').value.trim();
    const password = document.getElementById('password').value.trim();
    const studentNumber = parseInt(document.getElementById('student').value.trim(), 10);
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!publicId || !password || isNaN(studentNumber) || !name || !email) {
      alert('모든 항목을 올바르게 입력해주세요.');
      return;
    }

    fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentNumber,
        name,
        publicId,
        password,
        email
      }),
    })
    .then((res) => {
      if (!res.ok) {
        return res.json().then(errorData => {
          throw new Error(errorData.message || '서버 오류가 발생했습니다.');
        });
      }
      return res.json();
    })
    .then((data) => {
      if (data.success) {
        alert('회원가입 성공!');
        window.location.href = '../login/login.html';
      } else {
        alert('회원가입 실패: ' + (data.message || '알 수 없는 오류'));
      }
    })
    .catch((err) => {
      console.error('회원가입 오류:', err);
      alert(err.message || '서버에 연결할 수 없습니다. 서버 상태를 확인해주세요.');
    });
  });
});