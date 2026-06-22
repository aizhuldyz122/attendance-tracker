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

  document.getElementById("groupName").innerText = currentGroup;

  if (!students[currentGroup]) {
    students[currentGroup] = defaultStudents.map(name => ({
      name,
      status: "absent"
    }));
  }

  render();
};

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

function render(list = students[currentGroup]) {
  let ul = document.getElementById("studentList");
  ul.innerHTML = "";

  list.forEach((s, i) => {
    ul.innerHTML += `
      <li>
        <span>${s.name} - <b class="${s.status}">${s.status}</b></span>

        <div>
          <button onclick="setStatus(${i}, 'present')">P</button>
          <button onclick="setStatus(${i}, 'absent')">A</button>
          <button onclick="setStatus(${i}, 'late')">L</button>
        </div>
      </li>
    `;
  });
}

function setStatus(i, status) {
  students[currentGroup][i].status = status;
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
