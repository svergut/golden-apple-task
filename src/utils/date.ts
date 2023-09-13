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

export function getDifferenceInDates(d1: Date, d2: Date, includeLastDay?: boolean): number {
  const difference = (d1.getTime() - d2.getTime()) / (1000 * 3600 * 24)

  return includeLastDay ? difference + 1 : difference
}