import corsMiddleware from './corsMiddleware';
const success = async ({req, res, result}) => {
  await corsMiddleware({req, res});
  res.json(result);
  res.statusCode = 200;
}

const error = async ({req, res, status, message}) => {
  await corsMiddleware({req, res});
  res.json({
    status: res.statusCode,
    error: {
      message,
    }
  });
  res.statusCode = status || 404;
}

export {
  success,
  error,
}