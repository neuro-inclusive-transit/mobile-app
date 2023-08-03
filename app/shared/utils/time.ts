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

export function printTime(date: Date) {
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

export function printDate(date: Date) {

  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();

  if(day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
    return "Heute"
  }

  if(day === new Date().getDate()+1 && month === new Date().getMonth() && year === new Date().getFullYear()) {
    return "Morgen"
  }

  var newDay = day.toString().padStart(2, '0');
  var newMonth = (month + 1).toString().padStart(2, '0');

  return newDay + "." + newMonth + "." + date.getFullYear()
}
