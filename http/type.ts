type Success<T> = {
  success: true
  data: T
}

type Failure = {
  success: false
  error: string
}

export type ApiResponse<T> = Success<T> | Failure
