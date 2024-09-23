// ## Базовый уровень
// Реализуй таймер обратного отсчета от 25 минут до нуля. Можешь сделать его ускоренным.

// ### Требования:
// * при клике на кнопку **start** текст на ней меняется на **stop**
// * при клике на **stop** таймер останавливается, но **не сбрасывается**, текст на кнопке снова меняется на **start**
// * если снова кликнуть на кнопку, то отсчет возобновится со значения, на котором остановились
// * когда таймер дойдет до нуля, он должен сброситься в начальное состояние: **25:00** и текст на кнопке снова **start**

//## Продвинутый уровень
//В дополнение к базовому уровню добавится режим отдыха **break** и кнопка сброса отсчета (рядом с кнопкой stop / start)

//### Требования:
//* при переключении между режимами меняется время: **25:00** для pomodoro и **05:00** для break
//* при нажатии на кнопку сброса должно устанавливаться **начальное значение** таймера в зависимости от выбранного режима
//* переключение между режимами и кнопка сброса **останавливают** таймер (то есть отсчет должен заморозиться), даже если действие выполнено во время работы таймера

let displayTime = document.getElementById("pomodoro-time").textContent;
let isRunning = false; // переменная для отслеживания состояния таймера, по умолчанию таймер не работает
let currentMode = "pomodoro";

let array = displayTime.split(':');
let minutes = parseInt(array[0]); 
let seconds = parseInt(array[1]);

let timerId; 

// Функция обновления отображения таймера с форматированием, чтобы минуты и секунды всегда отображались двумя цифрами.
function updateDisplay() {
  let formattedMinutes;
    if (minutes < 10) {
        formattedMinutes = `0${minutes}`;
    } else {
        formattedMinutes = minutes;
    }
    
  let formattedSeconds;
    if (seconds < 10) {
        formattedSeconds = `0${seconds}`;
    } else {
        formattedSeconds = seconds;
    }
 
    document.getElementById("pomodoro-time").textContent = `${formattedMinutes}:${formattedSeconds}`;
}

// Функция запуска таймера с интервалом в 1 секунду. Если секунды достигают 0, уменьшаются минуты и секунды устанавливаются на 59. Если минуты также достигают нуля, таймер сбрасывается. 
function startTimer() {
    timerId = setInterval(() => {
        if (seconds === 0) {
            if (minutes === 0) {
                resetTimer(); 
                return;
            } else {
                minutes--;
                seconds = 59; 
            }
        } else {
            seconds--;
        }
        updateDisplay(); 
    }, 1000);
}

// Функция остановки таймера  с очисткой интервала.
function stopTimer() {
    clearInterval(timerId);
}

// Функция сброса таймера в начальное состояние в зависимости от текущего режима (pomodoro или break). Также обновляет дисплей, останавливает таймер и изменяет текст кнопки "start".
function resetTimer() {
       
    if (currentMode === "pomodoro") {
        minutes = parseInt(array[0]);
        seconds = parseInt(array[1]);
      } else if (currentMode === "break") {
        minutes = 5;
        seconds = 0;
      }
    
    updateDisplay();
    stopTimer();
    document.getElementById("start").textContent = 'start';
    isRunning = false;
}

// Добавляем обработчик событий для кнопки "start", который запускает или останавливает таймер и меняет текст кнопки в зависимости от текущего состояния таймера.
document.getElementById("start").addEventListener("click", () => {
    if (isRunning) {
        stopTimer();
        document.getElementById("start").textContent = 'start';
    } else {
        startTimer();
        document.getElementById("start").textContent = 'stop';
    }
    isRunning = !isRunning; // инверсия значения переменной "isRunning" для корректного поведения при последующих нажатиях на кнопку "start"
});

// Добавляем обработчик событий для кнопки "reset", который сбрасывает таймер.
document.getElementById("reset").addEventListener("click", resetTimer);

// Добавляем обработчик событий для кнопки "pomodoro", который останавливает таймер, устанавливает режим pomodoro, сбрасывает таймер и обновляет стили кнопок.
document.getElementById("pomodoro").addEventListener("click", () => {
    stopTimer();
    currentMode = "pomodoro";
    resetTimer();
    document.getElementById("pomodoro").classList.add("active");
    document.getElementById("break").classList.remove("active");
  });
  
  // Добавляем обработчик событий для кнопки "break", который останавливает таймер, устанавливает режим break, сбрасывает таймер и обновляет стили кнопок.
  document.getElementById("break").addEventListener("click", () => {
    stopTimer();
    currentMode = "break";
    resetTimer();
    document.getElementById("pomodoro").classList.remove("active");
    document.getElementById("break").classList.add("active");
  });
  

// Обновляем начальное отображение таймера при загрузке страницы.
  updateDisplay();


