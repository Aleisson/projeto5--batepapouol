let msgs = [];
let setMsgs = 0;


function getMsgs() {
    msgs = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    msgs.then(popMsgHtml);

}


function popMsgHtml(msgs) {

    const divMsgs = document.querySelector(".box-msgs");

    if (divMsgs.querySelectorAll("div").length === 100) {
        divMsgs.innerHTML = "";
    }

    msgs.data.forEach(element => {

        divMsgs.innerHTML += `<div class="${element.type}">
        <h2> (${element.time}) </h2> <p><strong> ${element.from} </strong> para <strong>${element.to}</strong>: ${element.text}.</p>
        </div>`   


    });

    divMsgs.querySelectorAll("div")[99].scrollIntoView();
    console.log(divMsgs.querySelectorAll("div").length)

}
getMsgs();
setmsg = setInterval(getMsgs, 3000);


    // console.log(" From :" + element.from)
        // console.log(" to : " + element.to)
        // console.log(" text :" + element.text)
        // console.log(" type :" + element.type)
        // console.log(" time: " + element.time)
