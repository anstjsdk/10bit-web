document.addEventListener('DOMContentLoaded', () => {
  // 🔹 드롭다운 버튼 관련
  const dropdownBtn = document.getElementById('dropdownBtn');
  const dropdownMenu = document.getElementById('dropdownMenu');

  dropdownBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isVisible = dropdownMenu.style.display === 'block';
    dropdownMenu.style.display = isVisible ? 'none' : 'block';
    dropdownBtn.setAttribute('aria-expanded', !isVisible);
  });

  // 메뉴 아이템 클릭 시 페이지 이동
  dropdownMenu.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', () => {
      const link = item.getAttribute('data-link');
      if (link) {
        window.location.href = link;
      }
    });
  });

  // 외부 클릭 시 드롭다운 닫기
  document.addEventListener('click', () => {
    dropdownMenu.style.display = 'none';
    dropdownBtn.setAttribute('aria-expanded', 'false');
  });

  // 🔹 테이블의 빈 td에 select 넣기
  const tbodyTds = document.querySelectorAll(".tb tbody td");

  tbodyTds.forEach(td => {
    // 빈 td에만 드롭다운을 넣기 위해 조건을 추가
    if (td.textContent.trim() === "") {
      const parentRow = td.parentElement;
      const attendanceTd = parentRow.querySelector('td:nth-child(4)'); // '출석' 컬럼

      // '출석' 컬럼에 들어갈 드롭다운만 생성
      if (td === attendanceTd) {
        const select = document.createElement("select");
        select.style.width = "70px";
        select.style.padding = "3px 10px";

        const Default = document.createElement("option");
        Default.value = "";
        Default.text = "선택";
        Default.disabled = true;
        Default.selected = true;

        const Present = document.createElement("option");
        Present.value = "출석";
        Present.text = "출석";

        const Absent = document.createElement("option");
        Absent.value = "미출석";
        Absent.text = "미출석";

        select.appendChild(Default);
        select.appendChild(Present);
        select.appendChild(Absent);

        td.appendChild(select);
      }
    }
  });

  // 🔹 페이지 버튼 클릭 시 색상 변경
  const pageLinks = document.querySelectorAll('.page-link');

  pageLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      // ◀▶ 버튼은 무시
      if (link.textContent === '◀' || link.textContent === '▶') return;

      // 모든 페이지 버튼에서 active 제거
      pageLinks.forEach(l => l.classList.remove('active'));

      // 클릭된 버튼에 active 클래스 추가
      link.classList.add('active');
    });
  });
});