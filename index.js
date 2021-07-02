class CountdownTimer {
  constructor(timerObject) {
    this.selector = timerObject.selector;
    this.targetDate = timerObject.targetDate.getTime();
    this.timerId = null;
    this.initialDiff = Date.now() - this.targetDate;
    this.initRefs();
    this.startTimer();
  }

  initRefs() {
    this.refs = {
      daysDiv: document.querySelector(
        `${this.selector} span[data-value="days"]`,
      ),
      hoursDiv: document.querySelector(
        `${this.selector} span[data-value="hours"]`,
      ),
      minsDiv: document.querySelector(
        `${this.selector} span[data-value="mins"]`,
      ),
      secsDiv: document.querySelector(
        `${this.selector} span[data-value="secs"]`,
      ),
    };
  }

  startTimer() {
    const initialDate = Date.now();
    let counterDate = Date.now();
    this.timerId = setInterval(() => {
      const timeDiff = Date.now() - initialDate;
      counterDate = counterDate - 1000;

      if (counterDate <= this.targetDate) {
        clearInterval(this.timerId);
        console.log('Stop timer');
        return;
      }

      const t = this.initialDiff - timeDiff;
      const dateComponents = this.calculateDateComponents(t);
      const { days, hours, mins, secs } = dateComponents;
      this.updateUI(dateComponents);
      console.log(
        `${this.pad(days)}:${this.pad(hours)}:${this.pad(mins)}:${this.pad(
          secs,
        )}`,
      );
    }, 1000);
  }
  //Update html with time counter
  updateUI({ days, hours, mins, secs }) {
    this.refs.daysDiv.textContent = `${this.pad(days)}`;
    this.refs.hoursDiv.textContent = `${this.pad(hours)}`;
    this.refs.minsDiv.textContent = `${this.pad(mins)}`;
    this.refs.secsDiv.textContent = `${this.pad(secs)}`;
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

  calculateDateComponents(time) {
    /*
     * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
     * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
     */
    const days = Math.floor(time / (1000 * 60 * 60 * 24));

    /*
     * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
     * остатка % и делим его на количество миллисекунд в одном часе
     * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
     */
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    /*
     * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
     * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
     */
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

    /*
     * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
     * миллисекунд в одной секунде (1000)
     */
    const secs = Math.floor((time % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      mins,
      secs,
    };
  }
}

//Timer initialization
const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 02, 2021 15:19:00'),
});
