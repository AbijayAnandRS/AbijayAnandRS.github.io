if (location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}

function colorEvent(element) {
    if (element.focused || element.value !== '') {
        element.style.color = "black";
    } else {
        element.style.color = "#888"
    }
}

function emptyAfterSuccess(id, value) {
    document.getElementById(id).value = value;
    document.getElementById(id).style.color = "#888";
}

function loadDescription(id) {
    var url = window.location.href;
    if (url.includes(id)) {
        document.getElementById(id).innerHTML = "See More...";
        goBack()
    } else {
        document.getElementById(id).innerHTML = "Back";
        url += "#" + id;
        window.location.href = url;
    }
}

function validateEmail(mail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
}

function send() {
    if (document.getElementById("send_email").value !== "ping") {
        return
    }
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const comments = document.getElementById("comments").value;
    document.getElementById("loader").style.display = "block";
    document.getElementById("send_email").value = "pinging..";
    document.body.style.backgroundColor = "black";
    document.body.style.opacity = "0.5";
    let data = null;

    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            document.getElementById("loader").style.display = "none";
            document.getElementById("send_email").value = "done";
            document.getElementById("event_notify").style.display = "block";
            document.body.style.backgroundColor = "white";
            document.body.style.opacity = "1";
            if (this.status === 200) {
                emptyAfterSuccess("name", "Name");
                emptyAfterSuccess("email", "Email");
                emptyAfterSuccess("comments", "Your thoughts");
                document.getElementById("event_notify").innerHTML = "&#128512 ya got it..."
            } else {
                document.getElementById("event_notify").innerHTML = "&#128532 sorry some issue happened"
            }
            setTimeout(function () {
                document.getElementById("send_email").value = "ping";
                document.getElementById("event_notify").style.display = "none";
            }, 3000);
        }
    });

    xhr.open("POST", "http://ec2-3-12-152-233.us-east-2.compute.amazonaws.com:8080/mail?subject=" + name + "&body=Hi<br />" + comments + "<br /><br />Thanks<br />" + email);
    xhr.send(data);
}

function validate() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const comments = document.getElementById("comments").value;
    if (!name || name.trim() === "" || name.trim() === "Name") {
        onErrorInput("name");
        return false
    } else if (!email || email.trim() === "" || email.trim() === "Email" || !validateEmail(email)) {
        onErrorInput("email");
        return false
    } else if (!comments || comments.trim() === "" || comments.trim() === "Your thoughts") {
        onErrorInput("comments");
        return false
    } else {
        return true
    }
}

function validateAndSend() {
    if (validate()) {
        send()
    }
}

function onErrorInput(elementId) {
    document.getElementById(elementId).style.borderColor = "red";
    setTimeout(function () {
        document.getElementById(elementId).style.borderColor = "#d8d8d8";
    }, 2000);
}

function goBack() {
    window.history.back();
}
