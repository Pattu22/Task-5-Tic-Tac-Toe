const x = 'x'
const o = 'o'
//const brd ;
const win = [
    //horizontal
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    //vertical
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    //cross
    [0, 4, 8], [2, 4, 6]
]
let playerturn;
//
const forhover = document.getElementById('hvr')
const mtext = document.querySelector('[data-text]')
const msg = document.getElementById('msg')
const boxes = document.querySelectorAll('.box');
start()
function start() {

    boxes.forEach(box => {
        box.classList.remove(o)
        box.classList.remove(x)
        box.addEventListener('click', handle, { once: true })
    });
    Hov()
    msg.classList.remove('show')
}
function handle(t) {
    let box = t.target
    let cur = playerturn ? o : x;
    place(box, cur)
    if (check(cur)) {
        over(false)
    } else if (tie()) {
        over(true)
    }
    else {
        Change()
        Hov()
    }

}
function over(draw) {
    if (draw) {
        mtext.innerText = `Draw!`
    } else {
        mtext.innerText = `Player ${playerturn ? "O" : "X"} Wins!`
    }
    msg.classList.add('show')
    boxes.forEach(box => {
    box.removeEventListener('click', handle)
    });
}
function tie() {
    return [...boxes].every(box => {
        return box.classList.contains(o) || box.classList.contains(x)
    })
}
function place(box, cur) {
    box.classList.add(cur)
}
function Change() {
    playerturn = !playerturn
}
function Hov() {
    forhover.classList.remove(x)
    forhover.classList.remove(o)
    if (playerturn) {
        forhover.classList.add(o)
    } else {
        forhover.classList.add(x)
    }
}
function check(cur) {
    return win.some(com => {
        return com.every(index => {
            return boxes[index].classList.contains(cur)
        })
    })
}