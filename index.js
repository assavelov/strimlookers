let first = document.getElementById('firstRow')

for(let i = 1; i <= 4; i++) {
    let img = document.createElement('img');
    img.className = 'photo';
    img.src = 'frames/frame.png'
    first.appendChild(img);
}

let second = document.getElementById('secondRow')

for(let i = 1; i <= 7; i++) {
    let img = document.createElement('img');
    img.className = 'photo';
    img.src = 'frames/frame.png'
    second.appendChild(img);
}

let third = document.getElementById('thirdRow')

for(let i = 1; i <= 7; i++) {
    let img = document.createElement('img');
    img.className = 'photo';
    img.src = 'frames/frame.png'
    third.appendChild(img);
}