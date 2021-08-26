const fetch = require('node-fetch');
const generateUsername = require('better-usernames');
const generateEmail = require('random-email');
const rockyou = require('./rockyou.json');

async function main(url, num, email = false) {
  const users = createUsers(num);
  for (const user of users) {
    const res = await fetch(url, {
      method: 'POST',
      body: `${
        email ? `email=${user.email}` : `username=${user.username}`
      }&password=${user.password}`
    });
    console.log(`Status: ${res.status}`);
    console.log(
      `Sent ${
        email ? `Email: ${user.email}` : `Username: ${user.username}`
      }, And Password ${user.password}`
    );
  }
}

main(
  `https://${process.argv[2]}`,
  parseInt(process.argv[3]),
  Boolean(process.argv[4])
);

function createUsers(num = 1) {
  let users = [];

  for (let i = 0; i < num; i++) {
    const password = rockyou[~~(rockyou.length * Math.random())];
    const username = generateUsername();
    const email = generateEmail();

    users.push({ username, password, email });
  }

  return users;
}
