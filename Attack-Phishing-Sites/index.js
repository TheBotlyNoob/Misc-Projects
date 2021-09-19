#!/usr/bin/env node

const fetch = require('node-fetch');
const generateUsername = require('better-usernames');
const generateEmail = require('email-generator').generateEmail;
const rockyou = require('./rockyou.json');

function main(url, num = 50) {
  const users = createUsers(num);
  for (const user of users) {
    (async () => {
      let res;
      try {
        res = await fetch(url, {
          method: 'POST',
          body: `email=${user.email}&username=${user.username}&password=${user.password}`
        });
        log(`Status: ${res?.ok ? 'OK' : `NOT OK, Code: ${res?.status}`}`);
      } catch (e) {
        log(e);
      } finally {
      }
    })();
  }
}

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

function log(data) {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(data.toString());
}

module.exports = main;

if (typeof require !== 'undefined' && require.main === module)
  main(
    process.argv[2].startsWith('http')
      ? process.argv[2]
      : `http://${process.argv[2]}`,
    parseInt(process.argv[3])
  );
