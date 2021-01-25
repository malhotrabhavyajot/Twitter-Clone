let users = {
  bsm: {
    id: "bsm",
    name: "Bhavyajot Malhotra",
    avatarURL: "https://instagram.fdel27-1.fna.fbcdn.net/v/t51.2885-19/s320x320/117137287_2693673027566602_5911546774753477308_n.jpg?_nc_ht=instagram.fdel27-1.fna.fbcdn.net&_nc_ohc=lgW3d8KjwrYAX-9DPlY&tp=1&oh=6368d5225197e901fd77523b29810218&oe=6038CC21",
    tweets: ['8xf0y6ziyjabvozdd253nd'],
  },
  vaibhav: {
    id: "vaibhav",
    name: "Vaibhav Nagpal",
    avatarURL: "https://instagram.fdel27-1.fna.fbcdn.net/v/t51.2885-19/s150x150/128155065_397149888160368_6721797198311809219_n.jpg?_nc_ht=instagram.fdel27-1.fna.fbcdn.net&_nc_ohc=mEJhTVBOtNUAX9xLGVI&tp=1&oh=2c05cc5c56b1e452689c1d84258c28e7&oe=60387B2B",
    tweets: ['5c9qojr2d1738zlx09afby'],
  },
  soumodeep: {
    id: "soumodeep",
    name: "Soumodeep Paul",
    avatarURL: "https://instagram.fdel27-1.fna.fbcdn.net/v/t51.2885-19/s150x150/129722132_2440109312964725_4267952707698822366_n.jpg?_nc_ht=instagram.fdel27-1.fna.fbcdn.net&_nc_ohc=rYlJDD2Ukw4AX82mk1Q&tp=1&oh=26c01c8ff8784ea6150c7c4cf53c843c&oe=6038E7FF",
    tweets: ['f4xzgapq7mu783k9t02ghx'],
  }
}

let tweets = {
  "8xf0y6ziyjabvozdd253nd": {
    id: "8xf0y6ziyjabvozdd253nd",
    text: "I hope one day the propTypes pendulum swings back. Such a simple yet effective API. Was one of my favorite parts of React.",
    author: "bsm",
    timestamp:  1611408995010,
    likes: ['soumodeep'],
    replies: [],
    replyingTo: null,
  },
  "5c9qojr2d1738zlx09afby": {
    id: "5c9qojr2d1738zlx09afby",
    text: "Shoutout to all the speakers I know for whom English is not a first language, but can STILL explain a concept well. It's hard enough to give a good talk in your mother tongue!",
    author: "vaibhav",
    timestamp: 1611408995010,
    likes: ['soumodeep'],
    replies: [],
    replyingTo: null,
  },
  "f4xzgapq7mu783k9t02ghx": {
    id: "f4xzgapq7mu783k9t02ghx",
    text: "I'm too noob at CSGO :(",
    author: "soumodeep",
    timestamp: 1611508995010,
    likes: [],
    replies: [],
    replyingTo: null,
  },
}

export function _getUsers () {
  return new Promise((res, rej) => {
    setTimeout(() => res({...users}), 1000)
  })
}

export function _getTweets () {
  return new Promise((res, rej) => {
    setTimeout(() => res({...tweets}), 1000)
  })
}

export function _saveLikeToggle ({ id, hasLiked, authedUser }) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      tweets = {
        ...tweets,
        [id]: {
          ...tweets[id],
          likes: hasLiked === true
            ? tweets[id].likes.filter((uid) => uid !== authedUser)
            : tweets[id].likes.concat([authedUser])
        }
      }

      res()
    }, 500)
  })
}

function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

function formatTweet ({ author, text, replyingTo = null }) {
  return {
    author,
    id: generateUID(),
    likes: [],
    replies: [],
    text,
    timestamp: Date.now(),
    replyingTo,
  }
}

export function _saveTweet ({ text, author, replyingTo }) {
  return new Promise((res, rej) => {
    const formattedTweet = formatTweet({
      text,
      author,
      replyingTo
    })

    setTimeout(() => {
      tweets = {
        ...tweets,
        [formattedTweet.id]: formattedTweet,
      }

      users = {
        ...users,
        [author]: {
          ...users[author],
          tweets: users[author].tweets.concat([formattedTweet.id])
        }
      }

      res(formattedTweet)
    }, 1000)
  })
}
