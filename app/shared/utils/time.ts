/**
 * @param Date start
 * @param Date end
 * @return Difference Time in milisecconds
 */
export function calcDurationBetween(start: Date, end: Date){
  return end.getTime() - start.getTime();
}

export function printTime(duration: number) {
  const hours = Math.floor(duration / 1000 / 60 / 60) % 24;
  const minutes = Math.floor((duration / 1000 / 60) % 60);

  if(hours === 0) return `${minutes} Min.`

  return `${hours} Std. ${minutes} Min.`
}

export function getTime(date: Date) {
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

export function printDate(date: Date) {

  var day = date.getDay();
  var month = date.getMonth();
  var year = date.getFullYear();

  if(day === new Date().getDay() && month === new Date().getMonth() && year === new Date().getFullYear()) {
    return "Heute"
  }

  if(day === new Date().getDay()+1 && month === new Date().getMonth() && year === new Date().getFullYear()) {
    return "Morgen"
  }

  var newDay = day.toString();
  var newMonth = month.toString();
  if(day < 10) newDay = "0" + newDay;
  if(month < 10) newMonth = "0" + month;

  return newDay + "." + newMonth + "." + date.getFullYear()
  }
