/**
 * @param Date start
 * @param Date end
 * @return Difference Time in milisecconds
 */
export function calcDurationBetween(start: Date, end: Date) {
  return end.getTime() - start.getTime();
}

export function printTime(duration: number) {
  const hours = Math.floor(duration / 1000 / 60 / 60) % 24;
  const minutes = Math.floor((duration / 1000 / 60) % 60);

  if (hours === 0) return `${minutes} Min.`;

  return `${hours} Std. ${minutes} Min.`;
}

export function getTime(date: Date) {
  return `${date.getHours().toString().padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
}

export function printDate(date: Date) {
  if (isToday(date)) {
    return "Heute";
  }

  if (isTomorrow(date)) {
    return "Morgen";
  }

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return day + "." + month + "." + year;
}

export function isToday(date: Date) {
  return (
    date.getDate() === new Date().getDate() &&
    date.getMonth() === new Date().getMonth() &&
    date.getFullYear() === new Date().getFullYear()
  );
}

export function isTomorrow(date: Date) {
  return (
    date.getDate() === new Date().getDate() + 1 &&
    date.getMonth() === new Date().getMonth() &&
    date.getFullYear() === new Date().getFullYear()
  );
}
