const fs = require('fs');

function generateID() {
  var nounJSON, noun, name, nameGender, nameJSON;
  nounJSON = JSON.parse(fs.readFileSync(__dirname + '/nouns.json', 'utf8'));
  noun = nounJSON[(nounJSON.length * Math.random()) | 0];
  nameGender = Math.round(Math.random()) ? 'girl' : 'boy';
  nameJSON = JSON.parse(
    fs.readFileSync(__dirname + '/' + nameGender + '-names.json', 'utf8')
  );
  name = nameJSON[(nameJSON.length * Math.random()) | 0];
  return noun + '-' + name + '-' + Math.floor(Math.random() * 1000);
}

function checkID(id = generateID()) {
  var IDs;
  try {
    IDs = JSON.parse(fs.readFileSync('IDs.json', 'utf8'));
  } catch (_) {
    fs.writeFileSync('IDs.json', '[]');
    IDs = JSON.parse(fs.readFileSync('IDs.json', 'utf8'));
  }
  if (IDs.includes(id)) checkID(generateID());
  IDs.push(id);
  fs.writeFileSync('IDs.json', JSON.stringify(IDs));
  return id;
}
console.log('Your ID Is: ' + checkID());
module.exports = { generateID, checkID };
