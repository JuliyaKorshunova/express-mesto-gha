const httpRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

module.exports = { httpRegex, emailRegex };

// const BAD_REQUEST_ERROR = 400;
// const UNAUTHORIZED_ERROR = 401;
// const FORBIDDEN_ERROR = 403;
// const NOT_FOUND_ERROR = 404;
// const CONFLICT_ERROR = 409;
// const INTERNAL_SERVER_ERROR = 500;

// module.exports = {
//   BAD_REQUEST_ERROR,
//   UNAUTHORIZED_ERROR,
//   FORBIDDEN_ERROR,
//   NOT_FOUND_ERROR,
//   CONFLICT_ERROR,
//   INTERNAL_SERVER_ERROR,
// };
