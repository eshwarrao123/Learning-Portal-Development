const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    res.status(403);
    throw new Error('Forbidden — admin access required');
  }
  next();
};

export { adminOnly };
