// Global students Data variable
const students = [];

// Get html elements using Id attributes
const studentTableBody = document.getElementById("student-body");
const studentForm = document.getElementById("student-form");
const submitButton = document.getElementById("submit-button");
const searchInput = document.getElementById("search");

let editStudentId = null;

//function that will render/add html in table body with all students data if not passed filtered students data as paramater to it
// Display the list of students on the page, Render the array of students in the form of a table
function renderStudents(filteredStudents) {
  studentTableBody.innerHTML = "";
  var renderstudents = [];
  if(filteredStudents){
    renderstudents = filteredStudents;
  }else{
    renderstudents = students;
  }

  renderstudents.forEach((student) => {
    const row = document.createElement("tr");   //createElement tr

    //edit icon next to each student on the table that, when clicked, allows users to edit the properties of that student in a form
    // a delete button next to each student on the list that, when clicked, deletes that student profile.
    row.innerHTML = `
      <td>${student.ID}</td>
      <td>${student.name}</td>
      <td>${student.email}</td>
      <td>${student.age}</td>
      <td>${student.grade}</td>
      <td>${student.degree} 
        <span class='edit'>
          <img class="edit-button" data-id="${student.ID}" src="./img/edit.svg" />
          <img class="delete-button" data-id="${student.ID}" src="./img/trash.svg" />
        </span>
      </td>
      `
    ;
    row.classList.add("entry");
    studentTableBody.appendChild(row);      //append created element tr to table body
  });

  
    const row1 = document.createElement("tr");  //createElement tr
    row1.innerHTML = `
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
    `;
    row1.classList.add("tRowHeight");
    studentTableBody.appendChild(row1);     //append created element tr to table body
  
}

// Empty input fields after add new or edit existing student record and change submit button text to "Add Student"
function clearForm() {
  studentForm.reset();
  submitButton.innerText = "Add Student";
  editStudentId = null;
}

// Function to add new student record or update edited student record
// add students to the students object should be appended in the array
function addOrUpdateStudent(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const grade = document.getElementById("grade").value;
  const age = document.getElementById("age").value;
  const degree = document.getElementById("degree").value;

  if (editStudentId !== null) {
    const index = students.findIndex((student) => student.ID === editStudentId);
    if (index !== -1) {
      students[index] = { ID: editStudentId, name, email, grade, age, degree };
      editStudentId = null;
    }
  } else {
    const ID = students.length + 1;
    students.push({ ID, name, email, grade, age, degree});
  }

  renderStudents();
  clearForm();
}


// Function to delete student record from table
function deleteStudent(ID) {
  const index = students.findIndex((student) => student.ID === ID);
  if (index !== -1) {
    students.splice(index, 1);  // remove clicked record from students array
    renderStudents();
  }
}

//Function to edit student record of clicked student ID
// edit icon next to each student on the table that, when clicked, allows users to edit the properties of that student in a form
function editStudent(ID) {
  const student = students.find((student) => student.ID === ID);
  if (student) {
    document.getElementById("name").value = student.name;
    document.getElementById("email").value = student.email;
    document.getElementById("grade").value = student.grade;
    document.getElementById("age").value = student.age;
    document.getElementById("degree").value = student.degree;

    submitButton.innerText = "Edit Student";
    editStudentId = ID;
  }
}

// Function to search in table of name, email and degree columns
// a search box that allows users to filter the list of students by name,email, or degree.
function searchStudents(query) {
  console.log("search value: ", query);
  // filter will return entries which match the input query in search field
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query) ||
      student.degree.toLowerCase().includes(query)
  );
  console.log("filteredStudents : ", filteredStudents);
  renderStudents(filteredStudents);
}

//call renderStudent function on script load
renderStudents();

// call addOrUpdateStudent function on click of sub,it button
studentForm.addEventListener("submit", addOrUpdateStudent);

// if clicked button is delete-button then call deleteStudent function and pass user entry id to it
// if clicked button is edit-button then call editStudent function and pass user entry id to it
studentTableBody.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-button")) {
    deleteStudent(Number(event.target.dataset.id));
  } else if (event.target.classList.contains("edit-button")) {
    editStudent(Number(event.target.dataset.id));
  }
});

// when input field changes call searchStudents function and pass search value to it
searchInput.addEventListener("input", (event) => {
  searchStudents(event.target.value.toLowerCase());
});
