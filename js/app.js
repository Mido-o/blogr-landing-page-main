const collapsibles = Array.from(document.getElementsByClassName("collapsible"));
const content = document.getElementsByClassName("content");
const coll_cont = new Map();
collapsibles.forEach((value, idx) => coll_cont.set(value, content[idx]));
let src1 = "images/icon-hamburger.svg";
let src2 = "images/icon-close.svg";

let temp, contTemp, contParent, cont, img; //temp: temporary collapsible element and contTemp is its content. contParent: the parent element, will have the calss content. cont: is the content of the currently clicked element. img: is the image of the clicked element, if exsits.
let test, testTemp;

window.addEventListener("click", function (event) {
    let This = event.target; //to retrive the element that was clicked
    test = This;
    if (This.getAttribute("src")) { //if that element has a photo, retrive it
        img = This;
    } else { img = undefined; }
    if (This.matches(".collapsible")) { //if that element has the class collapsible
        console.log("The target is: ", This);
        contParent = This.closest(".content"); //retrive the nearest parent, of the clicked element, with the calss content
        if (temp !== undefined && This !== temp) {
            console.log("2nd case");
            cont = coll_cont.get(This);
            collapse(This, cont, img);
        } else { //the first time a collapsible element is clicked, this condition will be triggered
            temp = This; //The first time temp is assigned
            console.log("Temp is set");
            testTemp = temp;
            contTemp = coll_cont.get(temp);
            collapse(temp, contTemp, img);
        }
    } else {
        if (temp !== undefined && contTemp.style.maxHeight) { //if the clicked element is not collapsible and a previous(temporary) content was open
            console.log("3rd case.1");
            close(temp, contTemp, img);
            if (contParent !== null && contParent.style.maxHeight) { //if the content of the parent element (that has the calss content) is open
                console.log("3rd case.2");
                close(This, contParent, img);
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
    if (contTemp !== undefined && contTemp === contParent) { //before opening the new element, and we're inside the content, if the previously opened content is the parent content, dont't close it. Just update the previous element and its content to be the currently clicked element.
        console.log("1st open case");
        temp = This;
        contTemp = contTemp = coll_cont.get(temp);
        //close(temp, contTemp, img);
    } else if ((contTemp !== undefined && contTemp !== contParent && contTemp.style.maxHeight) || contTemp !== undefined && contTemp.style.maxHeight) { //before opening a new element, and we're inside the content, close the previously opened content
        console.log("2nd open case");
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