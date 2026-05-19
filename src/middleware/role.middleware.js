const authorization = (role) => {
  return async (req, res, next) => {
    console.log(req.user);
 
    if (!req.user) {
      return res.status(401).render("error")
    }

    if (req.user.role !== role) {
      return res.status(403).render("forbidden");
    }

    next();
  };
};

export default authorization;