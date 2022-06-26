let msgs = [];
let setMsgs = 0;
let setUser = 0;
let user;

function getUser() {
    user = prompt("Qual é seu lindo nome?")
    // user = user ? user: "user";
    const post = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", { name: user });
    post.then(x => {
        if (x.status === 200) {
            setuser = setInterval(postStatus, 4500);
            getMsgs();
            setmsg = setInterval(getMsgs, 3000);

        }
    });

    post.catch(x => { if (x.response.status === 400) getUser() });
}

function postStatus() {
    //console.log("postuser user: " + user);
    const status = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", { name: user });
    status.then(x => console.log("PostStatus :" + x.status));
}


function getMsgs() {
    msgs = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    msgs.then(popMsgHtml);

}



function popMsgHtml(msgs) {

    const divMsgs = document.querySelector(".box-msgs");

    divMsgs.innerHTML = "";

    msgs.data.forEach(element => {

        if (element.type === "private_message" && element.to === user) {
            divMsgs.innerHTML += `<div class="${element.type}">
            <h2> (${element.time}) </h2> <p><strong> ${element.from} </strong> para <strong>${element.to}</strong>: ${element.text}.</p>
            </div>`

        } else {
            divMsgs.innerHTML += `<div class="${element.type}">
            <h2> (${element.time}) </h2> <p><strong> ${element.from} </strong> para <strong>${element.to}</strong>: ${element.text}.</p>
            </div>`
        }

    });

    divMsgs.querySelectorAll("div")[divMsgs.querySelectorAll("div").length - 1].scrollIntoView();


}
getUser();




    // console.log(" From :" + element.from)
        // console.log(" to : " + element.to)
        // console.log(" text :" + element.text)
        // console.log(" type :" + element.type)
        // console.log(" time: " + element.time)
