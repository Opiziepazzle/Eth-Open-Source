//middleware for checking role

function checkContributorRole(req, res, next) {
    if (req.user.role === 'contributor') {
      next();
    } else {
      res.status(403).json({
        success: false,
        message: 'Access denied. Only contributors can update this information.',
      });
    }
  }
  
  function checkMaintainerRole(req, res, next) {
    if (req.user.role === 'maintainer') {
      next();
    } else {
      res.status(403).json({
        success: false,
        message: 'Access denied. Only maintainers can access this information.',
      });
    }
  }
  
  module.exports = {
    checkContributorRole,
    checkMaintainerRole,
  };