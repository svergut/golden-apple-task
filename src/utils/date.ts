export function compareDates(d1: Date, d2: Date): 0 | 1 | -1 {
  if (d1.getFullYear() === d2.getFullYear()) {
    if (d1.getMonth() === d2.getMonth()) {
      if (d1.getDate() === d2.getDate()) {
        return 0
      }
      else {
        return d1.getDate() > d2.getDate() ? 1 : -1
      }
    }
    else {
      return d1.getMonth() > d2.getMonth() ? 1 : -1
    }
  }
  else {
    return d1.getFullYear() > d2.getFullYear() ? 1 : -1
  }
}

export function getWeekNumber(date: Date): number {
  const dateCopy = new Date(date)
  dateCopy.setHours(0, 0, 0, 0)

  const firstDayOfYear = new Date(dateCopy.getFullYear(), 0, 1);
  const dateDifferenceMs = dateCopy.valueOf() - firstDayOfYear.valueOf()

  const daysSinceYearFirstDay = dateDifferenceMs / 86400000;

  return Math.ceil((daysSinceYearFirstDay + firstDayOfYear.getDay() + 1) / 7);
}

interface GetDifferenceInDatesOptions {
  includeStartDate?: boolean,
  includeEndDate?: boolean
}

export function getDifferenceInDates(
  d1: Date, 
  d2: Date, 
  options: GetDifferenceInDatesOptions = { 
    includeStartDate: true,
    includeEndDate: false
  }
): number {
  const difference = 
    (d1.getTime() - d2.getTime()) / (1000 * 3600 * 24) - 
    (!options.includeStartDate ? 1 : 0) +
    (options.includeEndDate ? 1 : 0)

  return difference
}