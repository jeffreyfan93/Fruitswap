const allowDrop = (ev) => {
    ev.preventDefault();
};

const drag = (ev) => {
    ev.dataTransfer.setData("target", ev.target.id);
};

const drop = (ev) => {
    ev.preventDefault();
    var src = document.getElementById(ev.dataTransfer.getData("target"));
    var srcParent = src.parentNode;
    var tgt = ev.currentTarget.firstElementChild;

    ev.currentTarget.replaceChild(src, tgt);
    srcParent.appendChild(tgt);
};

window.allowDrop = allowDrop;
window.drag = drag;
window.drop = drop;

module.exports = allowDrop;
module.exports = drag;
module.exports = drop;
