export type Provider = {
  _id: string
  name: string
  workingHours: { start: string; end: string; _id: string }[]
}
