const collapsibles = Array.from(document.getElementsByClassName("collapsible"));
const content = document.getElementsByClassName("content");
const coll_cont = new Map();
collapsibles.forEach((value, idx) => coll_cont.set(value, content[idx]));
let src1 = "https://raw.githubusercontent.com/Mido-o/blogr-landing-page-main/16f6de776de3e8e0d69f0b3acb005423af6c1c5d/images/icon-hamburger.svg";
let src2 = "https://raw.githubusercontent.com/Mido-o/blogr-landing-page-main/16f6de776de3e8e0d69f0b3acb005423af6c1c5d/images/icon-close.svg";
let key, cont, previousKey, previousCont, parent;

window.addEventListener("click", function (e) {
    if (e.target.matches(".collapsible")) { //if the clicked element is collapsible
        key = e.target;
        cont = coll_cont.get(key);
        if (parent && previousCont !== parent && cont !== previousCont) { //for the mobile menu (some collapsible elements will be inside their parent content)
            previousCont.classList.remove("active");
            previousKey.style.fontWeight = "normal";
            previousKey.style.setProperty("--pseudo-transform", 'rotate(0)');
        }
        parent = key.closest(".content"); //retrive the parent content
        cont.classList.toggle("active");
        key.style.fontWeight = "bold";
        key.style.setProperty("--pseudo-transform", 'rotate(-180deg)');
        if (cont.classList.contains("active")) {
            if (key.closest("#burger-king")) {
                key.src = src2;
            }
        } else {
            previousKey.style.fontWeight = "normal";
            key.style.setProperty("--pseudo-transform", 'rotate(0)');
            if (key.closest("#burger-king")) {
                key.src = src1;
            }
        }
        previousKey = e.target;
        previousCont = coll_cont.get(previousKey);
    } else {
        const actives = document.getElementsByClassName("active");
        coll_cont.keys().next().value.src = src1; //retrive a key from map by value (the #burger-king element)
        for (let i = actives.length - 1; i >= 0; --i) {
            actives[i].classList.remove("active");
        }
        if (previousKey) {
            previousKey.style.fontWeight = "normal";
            previousKey.style.setProperty("--pseudo-transform", 'rotate(0)');
        }
    }
});