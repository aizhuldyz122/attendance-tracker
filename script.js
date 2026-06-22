let students = {};
let currentGroup = "";

let defaultStudents = [
  "Айбек",
  "Аружан",
  "Медина",
  "Данияр",
  "Нуржан",
  "Айсулу",
  "Еркебулан"
];

window.onload = () => {
  let params = new URLSearchParams(window.location.search);
  currentGroup = params.get("group");

  if (!currentGroup) {
    document.body.innerHTML = "<h2 style='color:red;text-align:center'>No group selected</h2>";
    return;
  }

  document.getElementById("groupName").innerText = currentGroup;

  if (!students[currentGroup]) {
    students[currentGroup] = defaultStudents.map(name => ({
      name,
      status: "absent"
    }));
  }

  render();
};

// ADD STUDENT
function addStudent() {
  let input = document.getElementById("studentInput");
  let name = input.value.trim();

  if (!name) return;

  students[currentGroup].push({
    name,
    status: "absent"
  });

  input.value = "";
  render();
}

// RENDER (ВАЖНО: КНОПКИ НАСТОЯЩИЕ)
function render() {
  let ul = document.getElementById("studentList");
  ul.innerHTML = "";

  students[currentGroup].forEach((s, i) => {
    ul.innerHTML += `
      <li>
        <span>${s.name} - <b>${s.status}</b></span>

        <div>
          <button onclick="setStatus(${i}, 'present')">✔ Present</button>
          <button onclick="setStatus(${i}, 'absent')">✖ Absent</button>
          <button onclick="setStatus(${i}, 'late')">⏰ Late</button>
        </div>
      </li>
    `;
  });
}

// STATUS
function setStatus(i, status) {
  students[currentGroup][i].status = status;
  render();
}

// SEARCH (НЕ ЛОМАЕТ ДАННЫЕ)
function searchStudent() {
  let val = document.getElementById("searchInput").value.toLowerCase();

  let filtered = students[currentGroup].filter(s =>
    s.name.toLowerCase().includes(val)
  );

  let ul = document.getElementById("studentList");
  ul.innerHTML = "";

  filtered.forEach((s, i) => {
    ul.innerHTML += `
      <li>
        <span>${s.name} - <b>${s.status}</b></span>

        <div>
          <button onclick="setStatus(${i}, 'present')">✔ Present</button>
          <button onclick="setStatus(${i}, 'absent')">✖ Absent</button>
          <button onclick="setStatus(${i}, 'late')">⏰ Late</button>
        </div>
      </li>
    `;
  });
}

// BACK
function goBack() {
  window.location.href = "index.html";
}

// FINISH
function finishAttendance() {
  let present = students[currentGroup].filter(s => s.status === "present").length;
  let late = students[currentGroup].filter(s => s.status === "late").length;
  let absent = students[currentGroup].filter(s => s.status === "absent").length;

  alert(
    `GROUP: ${currentGroup}\n` +
    `Present: ${present}\n` +
    `Late: ${late}\n` +
    `Absent: ${absent}`
  );
}
