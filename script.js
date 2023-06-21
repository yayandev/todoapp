// show note
function showNote() {
  let data = localStorage.getItem("todoData");

  let parent = document.getElementById("parent");
  let parent2 = document.getElementById("parent2");
  if (data) {
    data = JSON.parse(data);

    for (let x = 0; x < data.length; x++) {
      if (data[x][2] === "no") {
        let noteDiv = document.createElement("div");
        noteDiv.classList.add("show-note");
        noteDiv.innerHTML = `
      <h3>${data[x][1]}</h3>
      <div class="menu">
        <button class="btn-check" onclick="successNote('${data[x][0]}')"><img src="icon/check.svg" /></button>
        <button class="btn-delete" onclick="deleteNote('${data[x][0]}')" >
          <img src="icon/delete.svg" alt="" />
        </button>
      </div>
    `;
        parent.appendChild(noteDiv);
      } else {
        let noteDiv = document.createElement("div");
        noteDiv.classList.add("show-note");
        noteDiv.innerHTML = `
      <h3 style="text-decoration: line-through;">${data[x][1]}</h3>
      <div class="menu">
        <button class="btn-try" onclick="tryNote('${data[x][0]}')"><img src="icon/again.svg" /></button>
        <button class="btn-delete" onclick="deleteNote('${data[x][0]}')" >
          <img src="icon/delete.svg" alt="" />
        </button>
      </div>
    `;
        parent2.appendChild(noteDiv);
      }
    }
  } else {
    parent.innerHTML = "<h4>Tidak ada Data</h4>";
    parent2.innerHTML = "<h4>Tidak ada Data</h4>";
  }
}

// add note
document.getElementById("btnAddNote").addEventListener("click", () => {
  let textInput = document.getElementById("textInput").value;
  if (textInput !== "") {
    let id = Date.now().toString(36) + Math.random().toString(36).substr(2);

    let data = [id, textInput, "no"];

    let dataLocal = localStorage.getItem("todoData");
    if (dataLocal) {
      dataLocal = JSON.parse(dataLocal);
      dataLocal.push(data);

      dataLocal = JSON.stringify(dataLocal);

      localStorage.setItem("todoData", dataLocal);
    } else {
      dataLocal = [data];
      data = JSON.stringify(dataLocal);
      localStorage.setItem("todoData", data);
    }
  }

  document.getElementById("textInput").value = "";
  document.getElementById("parent").innerHTML = "";
  document.getElementById("parent2").innerHTML = "";
  showNote();
});

// show note on load
showNote();

// delete note
function deleteNote(id) {
  let data = localStorage.getItem("todoData");
  data = JSON.parse(data);

  for (let x = 0; x < data.length; x++) {
    if (id === data[x][0]) {
      data.splice(data[x], 1);
    }
  }

  data = JSON.stringify(data);
  localStorage.setItem("todoData", data);
  document.getElementById("parent").innerHTML = "";
  document.getElementById("parent2").innerHTML = "";
  showNote();
}

function successNote(id) {
  let data = localStorage.getItem("todoData");
  data = JSON.parse(data);

  for (let x = 0; x < data.length; x++) {
    if (id === data[x][0]) {
      data[x][2] = "yes";
    }
  }

  data = JSON.stringify(data);
  localStorage.setItem("todoData", data);
  document.getElementById("parent").innerHTML = "";
  document.getElementById("parent2").innerHTML = "";
  showNote();
}

function tryNote(id) {
  let data = localStorage.getItem("todoData");
  data = JSON.parse(data);

  for (let x = 0; x < data.length; x++) {
    if (id === data[x][0]) {
      data[x][2] = "no";
    }
  }

  data = JSON.stringify(data);
  localStorage.setItem("todoData", data);
  document.getElementById("parent").innerHTML = "";
  document.getElementById("parent2").innerHTML = "";
  showNote();
}
