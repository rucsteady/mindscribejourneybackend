exports.showLikes = (req, res) => {
  res.render("likes");
};

exports.showSignUp = (req, res) => {
  res.render("contact");
};

exports.postedSignUpForm = (req, res) => {
  res.render("thanks");
};

exports.getIndex = (req, res) => {
  res.render("index");
};

exports.getShirts = (req, res) => {
  res.render("shirts");
};

var likes = [
  { title: "today i like",  like: "to party" },
  { title: "today i like",  like: "to chill" },
  { title: "today i like",  like: "to work" },
];

exports.showLikes = (req, res) => {
  res.render("likes", {
    sharedLikes: likes,
  });
};
