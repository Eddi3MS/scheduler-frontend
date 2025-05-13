import {
  addHours,
  format,
  isAfter,
  isBefore,
  parse,
  startOfDay,
} from 'date-fns'

export function formatDate(date: Date) {
  return format(new Date(date), 'yyyy-MM-dd')
}

export function formatDateToDDMMYYYY(dateStr: string): string {
  const date = parse(dateStr, 'yyyy-MM-dd', new Date())
  return format(date, 'dd/MM/yyyy')
}

export function isDateTimeBeforeNow(dateStr: string, timeStr: string): boolean {
  const dateTime = parse(
    `${dateStr} ${timeStr}`,
    'yyyy-MM-dd HH:mm',
    new Date()
  )
  return isBefore(dateTime, new Date())
}

export function isBeforeToday(date: Date) {
  return isBefore(startOfDay(date), startOfDay(new Date()))
}

export function isTimeBeforeNow(timeStr: string): boolean {
  const todayStr = format(new Date(), 'yyyy-MM-dd')
  const dateTime = parse(
    `${todayStr} ${timeStr}`,
    'yyyy-MM-dd HH:mm',
    new Date()
  )
  return isBefore(dateTime, new Date())
}

export function isTimeTwoHoursAfterNow(timeStr: string): boolean {
  const todayStr = format(new Date(), 'yyyy-MM-dd')
  const dateTime = parse(
    `${todayStr} ${timeStr}`,
    'yyyy-MM-dd HH:mm',
    new Date()
  )
  const twoHoursFromNow = addHours(new Date(), 2)
  return isAfter(dateTime, twoHoursFromNow)
}
