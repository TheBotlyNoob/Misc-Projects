while (true)
  require('fkill')([
    'WpcUapApp.exe',
    'HxTsr.exe',
    'WpcTok.exe',
    'backgroundTaskHost.exe',
    'taskhostw.exe'
  ]).catch();
