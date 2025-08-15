document.addEventListener('DOMContentLoaded', () => {
  const dropdownBtn = document.getElementById('dropdownBtn');
  const dropdownMenu = document.getElementById('dropdownMenu');

  dropdownBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isVisible = dropdownMenu.style.display === 'block';
    dropdownMenu.style.display = isVisible ? 'none' : 'block';
    dropdownBtn.setAttribute('aria-expanded', !isVisible);
  });

  dropdownMenu.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', () => {
      const link = item.getAttribute('data-link');
      if (link) {
        window.location.href = link;
      }
    });
  });

  document.addEventListener('click', () => {
    dropdownMenu.style.display = 'none';
    dropdownBtn.setAttribute('aria-expanded', 'false');
  });

  const tbodyTds = document.querySelectorAll(".tb tbody td");

  tbodyTds.forEach(td => {
    if (td.textContent.trim() === "") {
      const parentRow = td.parentElement;
      const attendanceTd = parentRow.querySelector('td:nth-child(4)');

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

  const pageLinks = document.querySelectorAll('.page-link');

  pageLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      if (link.textContent === '◀' || link.textContent === '▶') return;

      pageLinks.forEach(l => l.classList.remove('active'));

      link.classList.add('active');
    });
  });
});