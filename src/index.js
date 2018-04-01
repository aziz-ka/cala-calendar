class Calendar {
  constructor() {
    document.getElementById('calendar__nav-btn--prev').onclick = this.handleMonthChange.bind(this, -1);
    document.getElementById('calendar__nav-btn--next').onclick = this.handleMonthChange.bind(this, 1);
  }

  activeMonth = this.currentMonth;
  activeYear = this.currentYear;

  days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  handleMonthChange = direction => {
    this.activeMonth += direction;

    if (this.activeMonth === 12) {
      this.activeMonth = 0;
      this.activeYear += direction;
    }
    if (this.activeMonth < 0) {
      this.activeMonth = 11;
      this.activeYear += direction;
    }

    this.emptyTable();
    this.render();
  }

  get currentMonth() { return new Date().getMonth() }

  get currentYear() { return new Date().getFullYear() }

  get activeMonthName() {
    const date = new Date(this.activeYear, this.activeMonth, 1);
    return date.toLocaleString('en-us', { month: 'long' });
  }

  getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()

  getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay()

  getDates = (activeYear, activeMonth) => {
    let dateRows = [];
    let firstDayOfMonth = this.getFirstDayOfMonth(activeYear, activeMonth);
    let daysInMonth = this.getDaysInMonth(activeYear, activeMonth);
    let row = new Array(firstDayOfMonth).fill(null);

    for (let i = 1; i <= daysInMonth; i++) {
      row.push(i);

      if (row.length === 7 || i === daysInMonth) {
        dateRows.push(row);
        row = [];
      }
    }

    return dateRows;
  }

  emptyTable = () => document.querySelector('.calendar__dates').innerHTML = ''

  renderTitle = () => document.querySelector('.calendar__title').innerHTML = `${this.activeMonthName} ${this.activeYear}`

  renderDaysCol = (tr, day, key) => {
    const th = document.createElement('th');
    th.className = 'calendar__day';

    if (key % 6 === 0) th.className += ' calendar__day--weekend'

    th.innerHTML = day[0];
    tr.appendChild(th);
  }

  renderDaysRow = () => {
    const daysRow = document.querySelector('.calendar__days');

    if (daysRow.innerHTML) return;

    const tr = document.createElement('tr');
    this.days.map(this.renderDaysCol.bind(this, tr));
    daysRow.appendChild(tr);
  }

  renderDateCol = (tr, date, key) => {
    const td = document.createElement('td');

    if (date) {
      td.className = 'calendar__date';
      key % 6 === 0 && (td.className += ' calendar__date--weekend')
    }

    td.innerHTML = date;
    tr.appendChild(td);
  }

  renderDateRow = row => {
    const tr = document.createElement('tr');
    row.map(this.renderDateCol.bind(this, tr));
    document.querySelector('.calendar__dates').appendChild(tr);
  }

  render = () => {
    this.getDates(this.activeYear, this.activeMonth).map(this.renderDateRow);
    this.renderTitle();
    this.renderDaysRow();
  }
}

(() => {
  const cal = new Calendar();
  cal.render();
})()
