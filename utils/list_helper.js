const dummy = blogs => {
  // ...

  return 1;
};

const totalLikes = blogs => {
  const likesCount = blogs.reduce((acc, item) => {
    return acc + item.likes;
  }, 0);

  return likesCount;
};

const favoriteBlog = blogs => {
  const favBlog = blogs.reduce((a, b) => {
    return Math.max(a, b.likes);
  }, 0);

  return favBlog;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
