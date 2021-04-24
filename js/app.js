const collapsibles = Array.from(document.getElementsByClassName("collapsible"));
const content = document.getElementsByClassName("content");
const coll_cont = new Map();
collapsibles.forEach((value, idx) => coll_cont.set(value, content[idx]));
let src1 = "images/icon-hamburger.svg";
let src2 = "images/icon-close.svg";

let temp, contTemp, cont, img;
let test, testTemp;

window.addEventListener("click", function (event) {
    let This = event.target;
    test = This;
    /*if ((This !== temp && typeof (temp) !== "undefined")) { //This !== temp && typeof (temp) !== "undefined" && typeof (This.closest(".content")) === "undefined"
        console.log("The other element is: ", This);
        if (cont.style.maxHeight) {
            collapse(temp, cont);
        }
    }*/
    if (This.matches(".collapsible")) {
        console.log("The target is: ", This);
        if (This.getAttribute("src")) { img = This; }
        if (This !== temp && temp !== undefined) {
            console.log("In the second case");
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
            close(temp, contTemp, img);
        }
    }
});

function collapse(This, content, img) {
    This.classList.toggle("active");
    if (content.style.maxHeight) {
        close(This, content, img);
    } else {
        open(This, content, img);
    }
    temp = This;
    contTemp = content;
}

function open(This, content, img) {
    if (temp !== undefined && contTemp.style.maxHeight) {
        close(temp, contTemp, img);
    }
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