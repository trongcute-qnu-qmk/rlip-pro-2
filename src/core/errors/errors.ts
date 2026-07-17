export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;

  constructor(message: string, code: string = 'APP_ERROR', statusCode: number = 500) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR', 400);
  }
}

export class NetworkError extends AppError {
  constructor(message: string = 'Lỗi kết nối mạng') {
    super(message, 'NETWORK_ERROR', 503);
  }
}

export class PermissionError extends AppError {
  constructor(message: string = 'Bạn không có quyền thực hiện hành động này') {
    super(message, 'PERMISSION_DENIED', 403);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Bạn chưa đăng nhập') {
    super(message, 'UNAUTHENTICATED', 401);
  }
}
