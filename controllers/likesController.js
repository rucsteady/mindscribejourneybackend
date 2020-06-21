"use strict";
const httpStatus = require("http-status-codes"),
  User = require("../models/user");

const Like = require("../models/like"),
  getLikeParams = (body) => {
    return {
      name: body.name,
    };
  };
module.exports = {
  index: (req, res, next) => {
    Like.find()
      .then((likes) => {
        res.locals.likes = likes;
        next();
      })
      .catch((error) => {
        console.log(`Error fetching likes: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("likes/index");
  },
  new: (req, res) => {
    res.render("likes/new");
  },
  create: (req, res, next) => {
    let likeParams = getLikeParams(req.body);
    Like.create(likeParams)
      .then((like) => {
        res.locals.redirect = "/likes";
        res.locals.like = like;
        next();
      })
      .catch((error) => {
        console.log(`Error saving like:${error.message}`);
        next(error);
      });
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
  show: (req, res, next) => {
    var likeId = req.params.id;
    Like.findById(likeId)
      .then((like) => {
        res.locals.like = like;
        next();
      })
      .catch((error) => {
        console.log(`Error fetching like by ID:
         ${error.message}`);
        next(error);
      });
  },
  showView: (req, res) => {
    res.render("likes/show");
  },
  edit: (req, res, next) => {
    var likeId = req.params.id;
    Like.findById(likeId)
      .then((like) => {
        res.render("likes/edit", {
          like: like,
        });
      })
      .catch((error) => {
        console.log(`Error fetching like by ID: ${error.message}`);
        next(error);
      });
  },
  update: (req, res, next) => {
    let likeId = req.params.id,
      likeParams = getLikeParams(req.body);
    Like.findByIdAndUpdate(likeId, {
      $set: likeParams,
    })
      .then((like) => {
        res.locals.redirect = `/likes/${likeId}`;
        res.locals.like = like;
        next();
      })
      .catch((error) => {
        console.log(`Error updating like by ID:
                     ${error.message}`);
        next(error);
      });
  },
  delete: (req, res, next) => {
    let likeId = req.params.id;
    Like.findByIdAndRemove(likeId)
      .then(() => {
        res.locals.redirect = "/likes";
        next();
      })
      .catch((error) => {
        console.log(`Error deleting like by ID:
                     ${error.message}`);
        next();
      });
  },
  deleteLikes: (req, res, next) => {
    Like.deleteMany({})
      .then(() => {
        res.locals.redirect = "/likes";
        next();
      })
      .catch((error) => {
        console.log(`Error deleting likes:
                     ${error.message}`);
        next();
      });
  },
  respondJSON: (req, res) => {
    res.json({
      status: httpStatus.OK,
      data: res.locals,
    });
  },
  errorJSON: (error, req, res, next) => {
    let errorObject;

    if (error) {
      errorObject = {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    } else {
      errorObject = {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Unknown Error.",
      };
    }
    res.json(errorObject);
  },
  filterUserLikes: (req, res, next) => {
    let currentUser = res.locals.currentUser;
    if (currentUser) {
      let mappedLikes = res.locals.likes.map((like) => {
        let userJoined = currentUser.likes.some((userLike) => {
          return userLike.equals(like._id);
        });
        return Object.assign(like.toObject(), { joined: userJoined });
      });
      res.locals.likes = mappedLikes;
      next();
    } else {
      next();
    }
  },
  join: (req, res, next) => {
    let likeId = req.params.id,
      currentUser = req.user;

    if (currentUser) {
      User.findByIdAndUpdate(currentUser, {
        $addToSet: {
          likes: likeId,
        },
      })
        .then(() => {
          res.locals.success = true;
          next();
        })
        .catch((error) => {
          next(error);
        });
    } else {
      next(new Error("User must log in."));
    }
  },
};
