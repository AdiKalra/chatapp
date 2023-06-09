const not_found = (req, res, next) => {
  const err = new Error(`Not Found- ${req.url}`);
  res.status(404);
  next(err);
};

const error_handling = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    return res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};

module.exports = { not_found, error_handling };
