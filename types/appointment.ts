export type Appointment = {
  _id: string
  date: string
  time: string
  serviceId: {
    _id: string
    name: string
    duration: number
    price: number
  }
  providerId: {
    _id: string
    userId: {
      _id: string
      name: string
    }
  }
  clientId: string
  canceled: false
  __v: 0
}
