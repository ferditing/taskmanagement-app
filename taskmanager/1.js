firebase.initializeApp({
    apiKey:"AIzaSyApr8c5pYt0Uzw3hO0EZJLl8OQzCaQe-pM",
    authDomain:"task-management-b3f70.firebaseapp.com",
    projectId:"task-management-b3f70"
});
const db = firebase.firestore();

function addTask(){
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value.trim();
    if(task !== ""){
        db.collection ("tasks").add({
        task: task,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    taskInput.value = "";
    }
}

function renderTask(doc){
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
    <span>${doc.data().task}</span>
    <button onclick = "deleteTask('${doc.id}')">Delete</button>
    `;
    taskList.appendChild(taskItem);
}

db.collection("tasks")
  .oderBy("timestamp", "desc")
  .onSnapshot(snapshot =>{
    const changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type === "added"){
            renderTask(change.doc);
        }
    });
  });

  function deleteTask(id){
    db.collection("tasks").doc(id).delete();
    }
  
  