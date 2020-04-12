const formatResponse = (err, data, message) => {
  return {err, data, message};
}

const baseRouter = {};

baseRouter.success = (res, code=200, data=null, message=null) => {
  return res.status(code).json(formatResponse(null, data, message));
}

baseRouter.error = (res, code=500, message="Something went wrong") => {
  return res.status(code).json(formatResponse(true, null, message));
}

module.exports = baseRouter;