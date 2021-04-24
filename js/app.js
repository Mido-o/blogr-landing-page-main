const collapsibles = Array.from(document.getElementsByClassName("collapsible"));
const content = document.getElementsByClassName("content");
const coll_cont = new Map();
collapsibles.forEach((value, idx) => coll_cont.set(value, content[idx]));
let src1 = "images/icon-hamburger.svg";
let src2 = "images/icon-close.svg";

let temp, contTemp, contParent, cont, img;
let test, testTemp;

window.addEventListener("click", function (event) {
    let This = event.target;
    test = This;
    contParent = This.closest(".content");
    if (This.getAttribute("src")) {
        img = This;
    } else { img = undefined; }
    if (This.matches(".collapsible")) {
        console.log("The target is: ", This);
        if (temp !== undefined && This !== temp) {
            console.log("2nd case");
            cont = coll_cont.get(This);
            collapse(This, cont, img);
        } else {
            temp = This; //The first time temp is assigned
            console.log("Temp is set");
            testTemp = temp;
            contTemp = coll_cont.get(temp);
            collapse(temp, contTemp, img);
        }
    } else {
        if (temp !== undefined && contTemp.style.maxHeight) {
            close(temp, contTemp);
        }
    }
});

function collapse(This, content, img) {
    content.classList.toggle("active");
    if (content.style.maxHeight) {
        close(This, content, img);
    } else {
        open(This, content, img);
    }
    temp = This;
    contTemp = content;
}

function open(This, content, img) {
    if (contTemp !== undefined && contParent !== null && contTemp === contParent && contTemp.style.maxHeight) { //temp !== undefined && contTemp.style.maxHeight && parent !== null && !parent.matches(".active")
        console.log("1st open case");
        temp = This;
        contTemp = contTemp = coll_cont.get(temp);
        close(temp, contTemp);
    } else if ((contTemp !== undefined && contParent !== null && contTemp !== contParent && contTemp.style.maxHeight) || contTemp !== undefined && contTemp.style.maxHeight) {
        console.log("2nd open case");
        close(temp, contTemp);
    } /*else if (contTemp !== undefined && contTemp.style.maxHeight) {
        console.log("3rd open case");
        close(temp, contTemp);
    }*/
    This.style.fontWeight = "bold";
    This.style.setProperty("--pseudo-transform", 'rotate(-180deg)');
    if (img) {
        img.setAttribute("src", src2);
    }
    content.style.maxHeight = 500 + "px";
}

function close(This, content, img) {
    This.style.fontWeight = "normal";
    This.style.setProperty("--pseudo-transform", 'rotate(0)');
    if (img) {
        img.setAttribute("src", src1);
    }
    content.style.maxHeight = null;
}