function addStudent() {
  let name = document.getElementById("studentName").value.trim();
  if (!name) return;

  data[currentGroup].push({ name, present: false });
  document.getElementById("studentName").value = "";

  render();
}

function render(list = data[currentGroup]) {
  let ul = document.getElementById("list");
  ul.innerHTML = "";

  list.forEach((s, i) => {
    ul.innerHTML += `
      <li>
        ${s.name} - ${s.present ? "Present" : "Absent"}
        <div>
          <button onclick="toggle(${i})">✔</button>
          <button onclick="removeStudent(${i})">✖</button>
        </div>
      </li>
    `;
  });
}

function toggle(i) {
  data[currentGroup][i].present = !data[currentGroup][i].present;
  render();
}

function removeStudent(i) {
  data[currentGroup].splice(i, 1);
  render();
}

function searchStudent() {
  let val = document.getElementById("search").value.toLowerCase();

  let filtered = data[currentGroup].filter(s =>
    s.name.toLowerCase().includes(val)
  );

  render(filtered);
}
