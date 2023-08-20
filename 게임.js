const start = document.querySelector('.start')
const gameTimer = document.querySelector('.gameTimer')
const sec = document.querySelector('.sec')


const carrot_size = 80;
const carrot_count = 10;
const bug_count = 10;
const gameSec = 10;

const field = document.querySelector('.field');
const fieldRect = field.getBoundingClientRect()

const popUp = document.querySelector('.popup')
const popUpText = document.querySelector('.popup_masage')
const popUpRefresh = document.querySelector('.popup_refresh')

const carrotSound = new Audio('./carrot/sound/carrot_pull.mp3')
const alertSound = new Audio('./carrot/sound/alert.wav')
const bgSound = new Audio('./carrot/sound/bg.mp3')
const bugSound = new Audio('./carrot/sound/bug_pull.mp3')
const winSound = new Audio('./carrot/sound/game_win.mp3')

let started = false;
let score = 0;
let timer = undefined;

field.addEventListener('click', onFieldClick);

// let chk = 0;
start.addEventListener('click', function () {
    // 게임 시작버튼
    // if (chk == 0) {
    //     chk = 1;
    //     start.innerHTML = `<i class="fa-solid fa-stop"></i>`
    //     sec.innerText = "10"
    // }
    // else {
    //     chk = 0;
    //     start.innerHTML = `<i class="fa-solid fa-play"></i>`

    // }

    // 게임 시작&정지 알기
    if (started) {
        stopGame();

    }
    else {
        startGame();
    }

})
popUpRefresh.addEventListener('click', function () {
    startGame();
    hidePopup();
})
function startGame() {
    started = true;
    initGame();
    showStopBtn();
    showTimerAndScore();
    startGameTimer();
    playSound(bgSound)
}

function stopGame() {
    started = false;
    stopGameTimer()
    hideGameBtn()
    showPopupText('REPLAY?')
    playSound(alertSound)
    stopSound(bgSound)

}

function finishGame(win) {
    started = false;
    hideGameBtn();
    if (win) {
        playSound(winSound);
    } else {
        playSound(bugSound);
    }
    stopGameTimer();
    stopSound(bgSound);
    showPopupText(win ? 'YOU WIN🎉' : 'YOU LOST👻');
}
function showStopBtn() {
    const icon = start.querySelector('.fa-solid')
    icon.classList.add('fa-stop')
    icon.classList.remove('fa-play')
    start.style.visibility = 'visible'

}

function hideGameBtn() {
    start.style.visibility = 'hidden'
}

function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    sec.style.visibility = 'visible';
};


function startGameTimer() {
    let remainTime = gameSec;
    updateTimerText(remainTime);
    timer = setInterval(() => {
        if (remainTime <= 0) {
            clearInterval(timer);
            finishGame(carrot_count == score);
            return;
        }
        updateTimerText(--remainTime);
    }, 1000);

    // sec.innerHTML = `${carrot_count}`
}
function stopGameTimer() {
    clearInterval(timer);
}

function updateTimerText(time) {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60;
    gameTimer.innerText = `${minutes}:${seconds}`

}

function showPopupText(text) {
    popUpText.innerText = text;
    popUp.classList.remove('pop-up--hide');

}

function hidePopup() {
    popUp.classList.add('pop-up--hide');

}



// 어떤 아이템을, 몇 개, 무슨 이미지로 넣어줄 건지 정해주는 함수
function initGame() {
    score = 0;
    field.innerHTML = '';
    sec.innerText = carrot_count;
    // 벌레와 당근 생성 후 field에 추가
    addItem('carrot', carrot_count, './carrot/img/carrot.png')
    addItem('bug', bug_count, './carrot/img/bug.png')
}

// 필드의 아이템 클릭 함수
function onFieldClick(event) {
    if (!started) {
        return;
    }
    const target = event.target;
    if (target.matches('.carrot')) {
        // 당근
        target.remove();
        score++;
        playSound(carrotSound)
        updateScoreBoard();
        if (score == carrot_count) {
            finishGame(true);
        }
    } else if (target.matches('.bug')) {
        // 벌레
        finishGame(false);
    }
}


function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound) {
    sound.pause();
}

function updateScoreBoard() {
    sec.innerText = carrot_count - score;
}

// 아이템을 만들어주는 함수
function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - carrot_size;
    const y2 = fieldRect.height - carrot_size;

    for (let i = 0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);
    }
}

// 랜덤으로 배치해주는 함수
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


