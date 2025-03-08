document.addEventListener("DOMContentLoaded", function () {
    loadRoster();
    loadEvents();
    loadSchedule();
});

function addMember() {
    let name = prompt("Enter member name:");
    let grade = prompt("Enter grade:");
    let events = prompt("Enter assigned events:");
    if (name && grade && events) {
        let row = document.getElementById("rosterTable").insertRow();
        row.insertCell(0).innerText = name;
        row.insertCell(1).innerText = grade;
        row.insertCell(2).innerText = events;
        saveRoster();
    }
}

function saveRoster() {
    localStorage.setItem("roster", document.getElementById("rosterTable").innerHTML);
}

function loadRoster() {
    if (localStorage.getItem("roster")) {
        document.getElementById("rosterTable").innerHTML = localStorage.getItem("roster");
    }
}

function assignEvent() {
    let event = prompt("Enter event name:");
    if (event) {
        let li = document.createElement("li");
        li.innerText = event;
        document.getElementById("eventList").appendChild(li);
    }
}

function addScheduleItem() {
    let scheduleItem = prompt("Enter schedule event:");
    if (scheduleItem) {
        let li = document.createElement("li");
        li.innerText = scheduleItem;
        document.getElementById("scheduleList").appendChild(li);
    }
}

function addResource() {
    let resourceName = prompt("Enter resource name:");
    let resourceLink = prompt("Enter resource URL:");
    if (resourceName && resourceLink) {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.href = resourceLink;
        a.innerText = resourceName;
        li.appendChild(a);
        document.getElementById("resourceList").appendChild(li);
    }
}
