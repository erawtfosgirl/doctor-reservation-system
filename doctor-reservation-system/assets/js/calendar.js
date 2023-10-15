const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];



const calendarContainer = document.querySelector(".days");
const currentMonthYear = document.getElementById("currentMonthYear");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentDate = new Date();

export function renderCalendar(year, month , obj , loadTime) {
  calendarContainer.innerHTML = "";
  currentMonthYear.textContent = `${monthNames[Number(months[month]) -1]} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    const emptyDay = document.createElement("div");
    calendarContainer.appendChild(emptyDay);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dayElement = document.createElement("div");
    dayElement.textContent = day;
    dayElement.classList.add("day");

    if (date < currentDate) {
      dayElement.classList.add("disabled");
    } else {
      dayElement.addEventListener("click", (e) => {
        
        [...e.target.parentElement.children].forEach(day=>{
          day.classList.remove('selected')
        })
        e.target.classList.add('selected')
        obj.date = `${year}-${months[month]}-${day}`
        loadTime()
      });
    }

    calendarContainer.appendChild(dayElement);
  }
}

 
prevBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
});

nextBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
});