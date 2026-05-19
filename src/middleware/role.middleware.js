const authorization = (role) => {
  return async (req, res, next) => { 
    if (!req.user) {
      return res.status(401).render("error")
    }

    if (req.user.role !== role) {
      return res.status(403).render("error");
    }

    next();
  };
};

export default authorization;