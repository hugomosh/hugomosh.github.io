
let container;
let resizeTimeot;
let currentSize;
let list;
let resizing = false;
const minSquare = 14;

const calculateGrid = (container: HTMLElement) => {
    const height = container.clientHeight;
    const width = container.clientWidth;
    return Math.floor(height / minSquare) * Math.floor(width / minSquare);
}

const resize = () => {
    if (resizing) return;
    resizing = true;
    const newSize = calculateGrid(container);
    if (newSize >= currentSize) {
        new Array(newSize).fill(undefined).forEach((_, i) => {
            if (list[i]) {
                list[i].className = "square";
            } else {
                const e = document.createElement("div");
                e.className = "square";
                e.style.backgroundColor = getRandomColor();
                container.appendChild(e);
                list.push(e);
            }
        })
    } else {
        const lLen = list.length;
        new Array(lLen - newSize).fill(undefined).forEach((_, i) => {
            list[lLen - 1 - i].classList.add("hidden");
        });
    }
    currentSize = newSize;
    resizing = false;
};

const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


const start = ({ parentElement: parent }: { parentElement: HTMLElement }) => {

    var style = document.createElement('style');
    style.innerHTML = `
    .flex-container {
        flex-wrap: wrap;
        display: flex;
        align-content: flex-start;
        justify-content: center;
        margin: 0;
    }
    .square{
        width:10px;
        height:10px;
        background-color:pink;
        border: 2px solid white;
        opacity:1;
    }
    .hidden{
        opacity:0;
        visibility: hidden;
    }
    `;
    document.head.appendChild(style);
    parent.className = "flex-container";
    container = parent;
    currentSize = calculateGrid(parent);

    list = new Array(currentSize).fill(undefined).map((_, i) => {
        const e = document.createElement("div");
        e.className = "square";
        e.style.backgroundColor = getRandomColor();
        parent.appendChild(e);
        return e;
    });
    window.onresize = (ev) => {
        clearTimeout(resizeTimeot);
        resizeTimeot = setTimeout(resize, 100);
    };
}
const grid = { start };
export default grid;