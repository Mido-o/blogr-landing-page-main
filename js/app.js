const collapsibles = document.getElementsByClassName("collapsible");
const content = document.getElementsByClassName("content");
let src1 = "images/icon-hamburger.svg";
let src2 = "images/icon-close.svg";
for (let i = 0; i < collapsibles.length; ++i) {
    collapsibles[i].addEventListener("click", function (e) {
        let img = this.firstElementChild;
        //let content = this.nextElementSibling;
        this.classList.toggle("active");
        if (content[i].style.maxHeight) {
            content[i].style.maxHeight = null;
            if (img) {
                img.src = src1;
            }
            collapsibles[i].style.setProperty("--pseudo-transform", 'rotate(0)');
        } else {
            content[i].style.maxHeight = 500 + "px";
            if (img) {
                img.src = src2;
            }
            collapsibles[i].style.setProperty("--pseudo-transform", 'rotate(-180deg)');
        }
    });
}

/*const dropDown = document.getElementsByClassName("dropDown");
const dropDownContent = document.getElementsByClassName("dropDownContent");
for (let i = 0; i < dropDown.length; ++i) {
    dropDown[i].addEventListener("click", function () {
        this.classList.toggle("active");
        if (dropDownContent[i].style.maxHeight) {
            dropDownContent[i].style.maxHeight = null;
            dropDown[i].style.setProperty("--pseudo-transform", 'rotate(0)');
        } else {
            dropDownContent[i].style.maxHeight = 500 + "px";
            dropDown[i].style.setProperty("--pseudo-transform", 'rotate(-180deg)');
        }
    });
}*/