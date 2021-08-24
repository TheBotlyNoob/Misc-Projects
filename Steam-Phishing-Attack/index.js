const fetch = require('node-fetch');
const hri = require('human-readable-ids').hri.random;

async function main(url) {
  const username = hri();
  const password = CreatePassword(18);

  const res = await fetch(`${url}/auth/login`, {
    method: 'POST',
    body: `username=${username}&password=${password}&code=`
  });

  console.log(`Status: ${res.status}`);

  console.log(`Sent Username ${username}, And Password ${password}`);
}

for (let i = 0; i < 10000; i++) main('http://gamerolls.net.ru');

function CreatePassword(PassLenght) {
  const Lenght = parseInt(PassLenght);
  const Charecters =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let Password = '';
  for (var i = 0, n = Charecters.length; i < Lenght; ++i) {
    Password += Charecters.charAt(Math.floor(Math.random() * n));
  }
  return Password;
}
