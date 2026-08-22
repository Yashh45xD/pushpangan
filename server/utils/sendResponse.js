export const sendResponse = (res, statusCode, success, message, data = null, meta = null) => {
  const responseObj = {
    success,
    message,
  };
  if (data !== null) responseObj.data = data;
  if (meta !== null) responseObj.meta = meta;

  return res.status(statusCode).json(responseObj);
};
