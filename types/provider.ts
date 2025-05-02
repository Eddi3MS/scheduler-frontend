export type Provider = {
  _id: string
  name: string
  workingHours: { start: string; end: string; _id: string }[]
  weeklyClosedDays: number[]
  closedDates: string[]
  userId: {
    _id: string
    name: string
  }
}
