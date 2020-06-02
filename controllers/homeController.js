exports.showLikes = (req, res) => {
  res.render("likes");
};

exports.showSignUp = (req, res) => {
  res.render("contact");
};

exports.postedSignUpForm = (req, res) => {
  res.render("thanks");
};

exports.postedLikeUpForm = (req, res) => {
  res.render("thanks");
};


exports.getIndex = (req, res) => {
  res.render("index");
};

exports.getShirts = (req, res) => {
  res.render("shirts");
};

var likes = [
  { title: "today i like", like: "party", name: "Nils" },
  { title: "today i like", like: "chill", name: "Simon" },
  { title: "today i like", like: "work", name: "Marc" },
  { title: "today i like", like: "game", name: "Nele" },
  { title: "today i like", like: "cooking", name: "Lea" },
  { title: "today i like", like: "swimming", name: "Gordon" },
];

exports.showLikes = (req, res) => {
  res.render("likes", {
    sharedLikes: likes,
  });
};
