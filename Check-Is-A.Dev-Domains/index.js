'use strict';

const fetch = require('node-fetch'),
  fs = require('fs');

var down = [],
  fetched,
  current;

(async () => {
  console.time('Completion');
  const apiKey = (
      await (
        await fetch(
          'https://jsonblob.com/api/jsonBlob/13d8cb9b-b971-11eb-9475-3362627de252'
        )
      ).json()
    ).apiKey,
    fetchOpts = {
      method: 'GET',
      headers: {
        Authorization: `Token ${apiKey}`
      }
    };

  for (const i of (
    await (
      await fetch(
        'https://api.github.com/repos/is-a-dev/register/git/trees/main?recursive=1',
        fetchOpts
      )
    ).json()
  ).tree) {
    if (i.path.startsWith('domains/')) {
      try {
        current = i.path.replace('domains/', '').replace('.json', '');
        if (
          current === '@' ||
          (
            await (
              await fetch(
                `https://api.github.com/repos/is-a-dev/register/commits?path=domains/${current}.json`,
                fetchOpts
              )
            ).json()
          )[0].commit.author.date.split('-')[1] <=
            new Date().getMonth() - 5
        )
          continue;

        try {
          fetched = await fetch(`https://${current}.is-a.dev`);
        } catch (_) {
          down.push(current);
        }

        if (!fetched?.ok) {
          console.log(
            `https://${current}.is-a.dev Is NOT OK, It Is: ${fetched.status}`
          );
          down.push(current);
        }
      } catch (e) {}
    }
  }

  fs.writeFileSync(
    `${__dirname}/README.md`,
    `Broken Subdomains |
:---:
${down
  .map(
    (
      domain
    ) => `[${domain}.is-a.dev](https://${domain}.is-a.dev) With A JSON Path Of: [${domain}.json](https://github.com/is-a-dev/register/tree/main/domains/${domain}.json) |
`
  )
  .join('')}`
  );
  console.log();
  console.timeEnd('Completion');
})();
