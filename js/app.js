const collapsibles = Array.from(document.getElementsByClassName("collapsible"));
const content = document.getElementsByClassName("content");
const coll_cont = new Map();
collapsibles.forEach((value, idx) => coll_cont.set(value, content[idx]));
let src1 = "images/icon-hamburger.svg";
let src2 = "images/icon-close.svg";

let temp, contTemp, contParent, cont, img, parentImg; //temp: will be the previously collapsible element and contTemp is its content. contParent: the parent content, should have the calss content. cont: is the content of the currently clicked element. img: is the image of the clicked element, if exsits.

window.addEventListener("click", function (event) {
    let This = event.target; //to retrive the element that was clicked.
    if (This.matches(".collapsible")) { //if that element has the class collapsible (collapsible element).
        if (This.getAttribute("src")) {
            img = This;
            parentImg = img;
        } else { img = undefined; } //if that element has a photo, retrive it.
        contParent = This.closest(".content"); //retrive the nearest parent, of the clicked element, with the calss content (parent content).
        if (temp !== undefined && This !== temp) { //if the currently clicked element is not the previously clicked element.
            cont = coll_cont.get(This);
            collapse(This, cont, img);
        } else { //the first time a collapsible element is clicked, this condition will be triggered
            temp = This; //The first time temp is assigned
            contTemp = coll_cont.get(temp);
            collapse(temp, contTemp, img);
        }
    } else {
        if (temp !== undefined && contTemp.style.maxHeight) { //if the clicked element is not collapsible and a previous content was open.
            close(temp, contTemp, img);
            if (contParent !== null && contParent.style.maxHeight) { //if the parent content is open.
                close(This, contParent, parentImg);
            }
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
    if (contTemp !== undefined && contTemp === contParent) { //before opening the new element, and we're inside the content, and if the previously opened content is the parent content, dont't close it. Just update the previous element and its content to be the currently clicked element.
        temp = This;
        contTemp = contTemp = coll_cont.get(temp);
    } else if ((contTemp !== undefined && contTemp !== contParent && contTemp.style.maxHeight)) { //before opening a new element, and we're inside the content, and if the previously opened content is not the parent content, close the previously opened content.
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