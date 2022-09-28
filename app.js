var count = 1;
var text = "";
var imgId = "";


function postThePost() {
    var postDate = new Date();
    var time = postDate.toLocaleTimeString().split("");
    var arr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    time.splice(4, 3);
    var date = arr[postDate.getMonth()] + " " + postDate.getDate() + " at " + time.join("");
    if (document.getElementById("input_name").value !== "") {
        var username = document.getElementById("input_name").value;
    } else {
        var username = "Anonymous"
    }
    var val = document.getElementById("write_text").value;
    if (val !== "") {
        document.getElementById("write_text").value = "";
        document.getElementById("main").innerHTML += `
    <div class="posted">
    <div class="title">
        <div class="name-sec">
            <img class="user-image" width="40px" height="50px" src="images/user.png" alt="" srcset="">
            <div class="time">
                <p class="name">${username}</p>
                <p id="time">${date}
                </p>
            </div>
            <i onclick="deletePost()" id="option" class="fa-solid fa-trash"></i>
        </div>
    </div>
    <div class="bgPosition" ${text}>
        <p>
            ${val}
        </p>
    </div >
    <div class="last_sec">
        <div onclick="thumbChange()" class="like">
            <i class="fa-regular fa-thumbs-up"></i>Like
        </div>
        <div class="comment">
            <i onclick="showComment()" class="fa-solid fa-comment"></i>
            <p onclick="showComment()">Comment</p>
        </div>
    </div>
    <div id="comment-box">
        <img class="user-image" width="40px" height="40px" src="images/user.png" alt="">
        <input type="text" placeholder="Write a comment..." id="comment-text" />
        <i onclick="commented()" id="commented" class="fa-solid fa-paper-plane comm_icon"></i>
    </div>
    <div id="comment">
    </div>
</div >

        `
        if (imgId !== "") {
            document.getElementById(`text${count}`).style.backgroundImage = "url(" + document.querySelector(`#${imgId} img`).src + ")";
            count = count + 1;
        }
    }
    else {
        document.getElementById("error_message").innerHTML = "*Post cannot be submitted empty"
    }
    setTimeout(function () {
        document.getElementById("error_message").innerHTML = ""
    }, 2000)
    imgId = "";
    document.getElementById("write_text").focus();
    document.getElementById("write_text").style.backgroundImage = "";
    document.getElementById("input_name").value = "";

    if (val.length < 200) {
        var divPos = document.querySelector(".bgPosition")
        divPos.style.height = 250 + "px"
        divPos.style.fontSize = 32 + "px"
    }
}

function putImageInBackground(a) {
    imgId = a;
    if (imgId) {
        text = `id="text${count}"`;
    } else {
        text = "";
    }
    document.getElementById("write_text").style.backgroundImage = "url(" + document.querySelector(`#${a} img`).src + ")";
    document.getElementById("write_text").focus()
}

function deletePost() {
    event.target.parentNode.parentNode.parentNode.remove();
}

function thumbChange() {
    if (event.target.classList.contains("fa-thumbs-up")) {
        if (event.target.classList.contains("fa-regular")) {
            event.target.classList.remove("fa-regular")
            event.target.classList.add("fa-solid")
        } else if (event.target.classList.contains("fa-solid")) {
            event.target.classList.remove("fa-solid")
            event.target.classList.add("fa-regular")
        }
    } else if (event.target.children[0].classList.contains("fa-thumbs-up")) {
        if (event.target.children[0].classList.contains("fa-regular")) {
            event.target.children[0].classList.remove("fa-regular")
            event.target.children[0].classList.add("fa-solid")
        } else if (event.target.children[0].classList.contains("fa-solid")) {
            event.target.children[0].classList.remove("fa-solid")
            event.target.children[0].classList.add("fa-regular")
        }
    }
}

function commented() {
    var commentVal = event.target.previousElementSibling.value;
    var gettingCommentList = event.target.parentNode.nextElementSibling;
    if (commentVal !== "") {
        event.target.previousElementSibling.value = "";
        gettingCommentList.innerHTML += `
        <div class="comment-list">
            <p>${commentVal}</p><i onclick="deleteComment()" id="bin" class="fa-solid fa-trash"></i>
        </div>
`;
    }
    event.target.previousElementSibling.focus();
}

function deleteComment() {
    event.target.parentNode.remove();
}

function removeImageInBackground() {
    document.getElementById("write_text").style.backgroundImage = "";
}


function showComment() {
    var commentedBox = document.getElementById("comment-box").style.display = "block"
    // commentedBox.style.display = "block"
}