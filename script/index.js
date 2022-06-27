let msgs = [];
let setmsg = 0;
let setuser = 0;
let user;

function getUser() {

    user = prompt("Qual é seu lindo nome?")

    // user = user ? user: "user";

    const post = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", { name: user });

    post.then(x => {
        if (x.status === 200) {

            postStatus();
            setuser = setInterval(postStatus, 5000);
            getMsgs();
            setmsg = setInterval(getMsgs, 3000);

        }
    });

    post.catch(x => { if (x.response.status === 400) getUser() });
}

function postStatus() {
    //console.log("postuser user: " + user);

    const status = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", { name: user });

    //status.then(x => console.log("PostStatus :" + x.status));
}

function getMsgs() {

    msgs = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    msgs.then(popMsgHtml);

}

function popMsgHtml(msgs) {

    const divMsgs = document.querySelector(".box-msgs");

    divMsgs.innerHTML = "";

    msgs.data.forEach(element => {

        if (element.type !== "private_message" && element.to !== user) {

            divMsgs.innerHTML += `<div class="${element.type}">
            <h2> (${element.time}) </h2> <p><strong> ${element.from} </strong> para <strong>${element.to}</strong>: ${element.text}.</p>
            </div>`

        } else if (element.type === "private_message" && element.to === user) {

            divMsgs.innerHTML += `<div class="${element.type}">
            <h2> (${element.time}) </h2> <p><strong> ${element.from} </strong> para <strong>${element.to}</strong>: ${element.text}.</p>
            </div>`

        }

    });

    divMsgs.querySelectorAll("div")[divMsgs.querySelectorAll("div").length - 1].scrollIntoView();

}

function postMsg() {
    const text = document.querySelector(".bottom input").value;

    //console.log("Input valor: " + text);

    const to = "Todos";
    const type = "message";
    const post = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", {
        from: user,
        to: to,
        text: text,
        type: type
    });

    post.then(x => {
        if (x.status === 200) {
            clearInterval(setmsg);
            getMsgs();
            setmsg = setInterval(getMsgs, 3000);
            document.querySelector(".bottom input").value = "";
            document.querySelector(".bottom input").placeholder = "Algo mais pessoa com lindo nome?";
        }

    });

    post.catch(x => { if (x.response.status === 400) window.location.reload() });

}

function clickEnter(){

    const input =  document.querySelector(".bottom input");

    input.addEventListener("keypress", event =>{
        if (event.key === "Enter") {
           
            event.preventDefault();
            document.querySelector(".bottom ion-icon").click();
            //alert("Deu certo");
       
        }
    })

}

clickEnter();
getUser();

/*
código que usei pra testar a API:
function testPrivate(){

    for (let index = 0; index < 10; index++) {
        axios.post("https://mock-api.driven.com.br/api/v6/uol/messages",{
            from: "Private_teste",
            to: "Private_teste",
            text: "mensagem digitada",
            type: "private_message" 
        })
    }

}


console.log(" From :" + element.from)
console.log(" to : " + element.to)
console.log(" text :" + element.text)
console.log(" type :" + element.type)
console.log(" time: " + element.time)
*/