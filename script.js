let students = [
  { name: "Айбек", present: false },
  { name: "Аружан", present: false },
  { name: "Данияр", present: false },
  { name: "Медина", present: false }
];


function addStudent() {
  let input = document.getElementById("studentName");
  let name = input.value.trim();

  if (name === "") return;

  students.push({
    name: name,
    present: false
  });

  input.value = "";
  renderStudents();
}


function renderStudents(list = students) {
  let container = document.getElementById("studentList");
  container.innerHTML = "";

  let presentCount = 0;

  list.forEach((student, index) => {
    if (student.present) presentCount++;

    container.innerHTML += `
      <li>
        <span>
          ${student.name} -
          <span class="${student.present ? "present" : "absent"}">
            ${student.present ? "Present" : "Absent"}
          </span>
        </span>

        <div>
          <button onclick="toggleStatus(${index})">Toggle</button>
          <button onclick="deleteStudent(${index})">Delete</button>
        </div>
      </li>
    `;
  });

  document.getElementById("summary").innerText =
    `Total: ${students.length} | Present: ${presentCount}`;
}


function toggleStatus(index) {
  students[index].present = !students[index].present;
  renderStudents();
}


function deleteStudent(index) {
  students.splice(index, 1);
  renderStudents();
}


function searchStudent() {
  let value = document.getElementById("searchBox").value.toLowerCase();

  let filtered = students.filter(student =>
    student.name.toLowerCase().includes(value)
  );

  renderStudents(filtered);
}

renderStudents();
