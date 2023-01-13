// 상태코드랑 상태코드메시지 추가하기...
export const httpStatusCodes = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const httpStatusErrorMessages = {
  400: "잘못된 요청입니다.",
  401: "인증이 필요합니다.",
  403: "권한이 없습니다.",
  404: "리소스를 찾을 수 없습니다.",
  500: "요청을 처리할 수 없습니다.",
  default: "알수없는 에러가 발생했습니다.",
};
