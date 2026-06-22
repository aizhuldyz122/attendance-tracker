let currentGroup = "";
let students = JSON.parse(localStorage.getItem("attendance")) || {};

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

  document.getElementById("groupName").innerText = currentGroup;

  if (!students[currentGroup]) {
    students[currentGroup] = defaultStudents.map(name => ({
      name,
      status: "absent"
    }));
    save();
  }

  render();
};

function save() {
  localStorage.setItem("attendance", JSON.stringify(students));
}

function addStudent() {
  let input = document.getElementById("studentInput");
  let name = input.value.trim();

  if (!name) return;

  students[currentGroup].push({
    name,
    status: "absent"
  });

  input.value = "";
  save();
  render();
}

function render(list = students[currentGroup]) {
  let ul = document.getElementById("studentList");
  ul.innerHTML = "";

  let present = 0;

  list.forEach((s, i) => {
    if (s.status === "present") present++;

    ul.innerHTML += `
      <li>
        <span>${s.name} - <b class="${s.status}">${s.status}</b></span>

        <div>
          <button onclick="setStatus(${i}, 'present')">✔</button>
          <button onclick="setStatus(${i}, 'absent')">✖</button>
          <button onclick="setStatus(${i}, 'late')">⏰</button>
        </div>
      </li>
    `;
  });

  let percent = Math.round((present / list.length) * 100);

  let info = document.getElementById("info");
  if (!info) {
    document.querySelector(".panel").innerHTML += `<p id="info"></p>`;
  }

  document.getElementById("info").innerText =
    `Present: ${present}/${list.length} (${percent}%)`;
}

function setStatus(i, status) {
  students[currentGroup][i].status = status;
  save();
  render();
}

function searchStudent() {
  let val = document.getElementById("searchInput").value.toLowerCase();

  let filtered = students[currentGroup].filter(s =>
    s.name.toLowerCase().includes(val)
  );

  render(filtered);
}

function goBack() {
  window.location.href = "index.html";
}

function finishAttendance() {
  alert("Attendance saved successfully ✔");
}
