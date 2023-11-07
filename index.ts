const board = document.querySelector('.game-container') as HTMLElement;
const button = document.querySelector('.button') as HTMLElement;
const winMessage = document.querySelector('.winner') as HTMLElement;

type Turn = 'X' | 'O' | '';

let turn: Turn = 'X';

function listenBoard(): void {
    board.addEventListener('click', runGame);
}

function main(): void {
    createBoard();
    listenBoard();
    button.addEventListener('click', resetGame);
}

function runGame(e: Event): void {
    const boxId: string | null = (<HTMLElement>e.target).id;
    console.log(boxId);
    if (boxId === null) return;
    const box: HTMLElement | null = document.querySelector(`#${boxId}`);
    if (box === null || box.textContent !== '') return;
    box.textContent = turn;
    changeBoxBackground(box);
    const winner: boolean = checkWinner();
    if (winner) {
        endGame();
    } else if (isTieGame()) {
        displayTieMessage();
    } else {
        switchPlayer();
    }
}

function changeBoxBackground(box: HTMLElement): void {
    if (turn === 'X') box.classList.replace('box', 'x');
    else box.classList.replace('box', 'o');
}

function endGame(): void {
    board.removeEventListener('click', runGame);
    button.addEventListener('click', resetGame);
    if (winMessage === null) return;
    winMessage.textContent = `Winner is ${turn}!`;
    winMessage.setAttribute('display', 'block');
    button.style.visibility = 'visible';
}

function resetGame(): void {
    turn = 'X';
    resetBoxes();
    button.style.visibility = 'hidden';
    winMessage.textContent = '';
    board.addEventListener('click', runGame);
}


function resetBoxes(): void {
    for (let i = 0; i <= 8; i++) {
        const box = document.querySelector(`#box-${i}`) as HTMLElement;
        box.textContent = '';
        // Resetting animation
        const boxClass: string = box.className;
        box.classList.remove(boxClass);
        void box.offsetWidth;
        box.classList.add('box');
    }
}

function checkWinner(): boolean {
    const boxes: Array<string> = getBoxes();
    return (
        (boxes[0] === boxes[1] && boxes[1] === boxes[2] && boxes[0] !== '') ||
        (boxes[3] === boxes[4] && boxes[4] === boxes[5] && boxes[3] !== '') ||
        (boxes[6] === boxes[7] && boxes[7] === boxes[8] && boxes[6] !== '') ||
        (boxes[0] === boxes[4] && boxes[4] === boxes[8] && boxes[0] !== '') ||
        (boxes[2] === boxes[4] && boxes[4] === boxes[6] && boxes[2] !== '') ||
        (boxes[1] === boxes[4] && boxes[4] === boxes[7] && boxes[1] !== '') ||
        (boxes[0] === boxes[3] && boxes[3] === boxes[6] && boxes[0] !== '') ||
        (boxes[2] === boxes[5] && boxes[5] === boxes[8] && boxes[2] !== '')
    );
}

function getBoxes(): Array<string> {
    const boxesContent: Array<string> = [];
    for (let i = 0; i <= 8; i++) {
        const box = document.querySelector(`#box-${i}`) as HTMLElement;
        const boxContent: string | null = box.textContent;
        if (boxContent === null) boxesContent.push('');
        else {
            boxesContent.push(boxContent);
        }
    }
    return boxesContent;
}

function switchPlayer(): void {
    if (turn === 'X') {
        turn = 'O';
    } else {
        turn = 'X';
    }
}

function createBoard(): void {
    for (let i = 0; i < 9; i++) makeBox(i);
}

function makeBox(i: number): void {
    const box: HTMLDivElement = document.createElement('div');
    box.className = 'box';
    box.id = `box-${i}`;
    box.textContent = '';
    board.append(box);
}

function isTieGame(): boolean {
    const boxes: Array<string> = getBoxes();
    return boxes.every((box) => box !== '');
}

function displayTieMessage(): void {
    if (winMessage === null) return;
    winMessage.textContent = "It's a tie!";
    winMessage.style.display = 'block';
    button.style.visibility = 'visible';
}

main();
