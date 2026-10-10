export interface ApiSuccess<T> {
  success: true;
  message: string;
  data?: T;
}

export interface ApiErrorBody {
  status: 'error';
  statusCode: number;
  message: string;
}
