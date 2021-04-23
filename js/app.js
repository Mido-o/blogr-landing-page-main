const collapsibles = Array.from(document.getElementsByClassName("collapsible"));
const content = Array.from(document.getElementsByClassName("content"));
const coll_cont = new Map();
collapsibles.forEach((value, idx) => coll_cont.set(value, content[idx]));
let src1 = "images/icon-hamburger.svg";
let src2 = "images/icon-close.svg";

let temp, cont;

window.addEventListener("click", function (event) {
    let This = event.target;
    if (This.classList.contains("collapsible")) {
        console.log("The target is: ", This);
        temp = This;
        cont = coll_cont.get(temp);
        collapse(This);
    } else if (This !== temp && typeof (cont) !== "undefined") {
        console.log("The other element is: ", This);
        if (cont.style.maxHeight) {
            temp.style.fontWeight = "normal";
            temp.style.setProperty("--pseudo-transform", 'rotate(0)');
            cont.style.maxHeight = null;
        }
    }
});

function collapse(This) {
    let content = coll_cont.get(This);
    This.classList.toggle("active");
    let img = This.firstElementChild;
    if (content.style.maxHeight) {
        This.style.fontWeight = "normal";
        This.style.setProperty("--pseudo-transform", 'rotate(0)');
        if (img) {
            img.src = src1;
        }
        content.style.maxHeight = null;
    } else {
        This.style.fontWeight = "bold";
        This.style.setProperty("--pseudo-transform", 'rotate(-180deg)');
        if (img) {
            img.src = src2;
        }
        content.style.maxHeight = 500 + "px";
    }
}