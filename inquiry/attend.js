document.addEventListener("DOMContentLoaded", () => {
  // 드롭다운 (dropdownBtn)
  const dropdownBtn = document.getElementById("dropdownBtn");
  const dropdownMenu = document.getElementById("dropdownMenu");

  if (dropdownBtn && dropdownMenu) {
    dropdownBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isVisible = dropdownMenu.style.display === "block";
      dropdownMenu.style.display = isVisible ? "none" : "block";
      dropdownBtn.setAttribute("aria-expanded", !isVisible);
    });

    dropdownMenu.querySelectorAll(".dropdown-item").forEach((item) => {
      item.addEventListener("click", () => {
        const link = item.getAttribute("data-link");
        if (link) {
          window.location.href = link;
        }
      });
    });
  }

  // 테이블에 select 넣기
  const tds = document.querySelectorAll(".tb tbody td");

  tds.forEach((td) => {
    if (td.textContent.trim() === "") {
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

      td.textContent = "";
      td.appendChild(select);
    }
  });

  // 드롭다운 (teacher 버튼)

  const button = document.getElementById("teacher");
  let dropdown = null;

  if (button) {
    button.addEventListener("click", (e) => {
      e.stopPropagation();

      // 기존 드롭다운 있으면 제거
      if (dropdown) {
        dropdown.remove();
        dropdown = null;
        button.setAttribute("aria-expanded", "false");
        return;
      }

      // 새 드롭다운 생성
      dropdown = document.createElement("ul");
      dropdown.classList.add("dropdown", "teacher-dropdown");
      dropdown.style.position = "absolute";
      dropdown.style.top = `${button.offsetTop + button.offsetHeight}px`;
      dropdown.style.left = `${button.offsetLeft - 10}px`; // 살짝 왼쪽으로
      dropdown.style.backgroundColor = "#fff";
      dropdown.style.border = "1px solid #ccc";
      dropdown.style.padding = "10px";
      dropdown.style.margin = "0";
      dropdown.style.listStyle = "none";
      dropdown.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
      dropdown.style.width = "120px";
      dropdown.style.zIndex = "1000";

      // 로그아웃 항목 생성
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.textContent = "로그아웃하기";
      a.href = "../main/main.html";
      a.style.textDecoration = "none";
      a.style.backgroundColor = "#ffff";
      a.style.color = "#ef5350";
      a.style.padding = "10px 22px";
      a.style.borderRadius = "8px";
      a.style.boxSizing = "border-box";
      a.style.textAlign = "center";
      a.style.fontWeight = "bold";
      a.style.fontSize = "14px";


      a.addEventListener("click", (e) => {
        e.stopPropagation(); // 외부 클릭 이벤트 차단
      });
      li.appendChild(a);
      dropdown.appendChild(li);

      document.body.appendChild(dropdown);
      button.setAttribute("aria-expanded", "true");
    });
  }

  // 외부 클릭 시 모든 드롭다운 닫기
  document.addEventListener("click", () => {
    if (dropdownMenu) {
      dropdownMenu.style.display = "none";
      dropdownBtn?.setAttribute("aria-expanded", "false");
    }

    if (dropdown) {
      dropdown.remove();
      dropdown = null;
      button?.setAttribute("aria-expanded", "false");
    }
  });

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