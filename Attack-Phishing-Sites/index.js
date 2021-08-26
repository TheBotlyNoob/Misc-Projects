#!/usr/bin/env node

const fetch = require('node-fetch');
const generateUsername = require('better-usernames');
const generateEmail = require('email-generator').generateEmail;
const rockyou = require('./rockyou.json');

function main(url, num = 50) {
  const users = createUsers(num);
  for (const user of users) {
    (async (url) => {
      let res;
      try {
        res = await fetch(url, {
          method: 'POST',
          body: `email=${user.email}&username=${user.username}&password=${user.password}`
        });
      } catch (e) {}
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      process.stdout.write(
        `Status: ${res?.ok ? 'OK' : `NOT OK, Code: ${res?.status}`}`
      );
    })(url);
  }
}

main(`https://${process.argv[2]}`, parseInt(process.argv[3]));

function createUsers(num = 1) {
  let users = [];

  for (let i = 0; i < num; i++) {
    const password = rockyou[~~(rockyou.length * Math.random())];
    const username = generateUsername();
    const email = generateEmail().split('"')[1];

    users.push({ username, password, email });
  }

  return users;
}
