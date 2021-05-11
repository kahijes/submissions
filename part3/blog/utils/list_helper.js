const dummy = (array) => {
  array
  return 1
}


const totalLikes = (array) => {

  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return array.length === 0
    ? 0
    : array.reduce(reducer, 0)

}

const favoriteBlog = (array) => {
  let maxBlog = array.reduce(((max, blog) => max.likes >= blog.likes ? max : blog), 0)

  return {
    'title': maxBlog.title,
    'author': maxBlog.author,
    'likes': maxBlog.likes
  }
}



module.exports = {
  dummy, totalLikes, favoriteBlog
}