const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    console.log("err", err);
    const errors = err.errors.map((error) => error.message);
    console.log("VALIDATION ERRORS", errors);
    res.status(400).json({ errors });
  }
};

export default validate;
