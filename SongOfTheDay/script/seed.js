'use strict'

const {db, models: {User, Song} } = require('../server/db')
const fetch = require('node-fetch');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'Ryan', email: "ryan.cokely@gmail.com",  password: '123', admin: true }),
    // User.create({ username: 'murphy', password: '123' }),
  ])


  const API_KEY = '6e56a81fd7f7f0fb08932517fef4fc86';
  const PAGE_SIZE = 1000
  const TOTAL_TRACKS = 1000
  const url = `http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${API_KEY}&format=json&limit=${PAGE_SIZE}`;

  for (let page = 1; page <= TOTAL_TRACKS / PAGE_SIZE; page++) {
    const pageUrl = `${url}&page=${page}`;
    const response = await fetch(pageUrl);
    const data = await response.json();

    for (const track of data.tracks.track) {
      const name = track.name;
      const artist = track.artist.name;

      await Song.create({ name, artist });
    }
  }

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
