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
  canceled: boolean
}

export type ProviderAppointment = {
  _id: string
  date: string
  time: string
  serviceId: {
    _id: string
    name: string
    duration: number
    price: number
  }
  clientId: {
    _id: string
    name: string
    email: string
  }
  providerId: string
  canceled: boolean
  __v: 0
}
