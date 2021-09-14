'use strict';

const fetch = require('node-fetch'),
  fs = require('fs');

var down = [],
  fetched,
  current;

(async () => {
  console.time('Completion');
  const fetchOpts = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
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
      current = i.path.replace('domains/', '').replace('.json', '');
      if (
        ['@', '_psl', '_dmarc'].includes(current) ||
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
        console.log(`https://${current}.is-a.dev Cannot Be Reached`);
        down.push({ domain: current, down: true });
        continue;
      }

      if (!fetched?.ok) {
        console.log(
          `https://${current}.is-a.dev Is NOT OK, It Is: ${fetched.status}`
        );
        down.push({ domain: current, code: fetched.status });
      }
    }
  }

  console.log();
  console.timeEnd('Completion');

  fs.writeFileSync(
    `${__dirname}/README.md`,
    `Broken Subdomains |
:---:
${down
  .map(
    ({
      domain,
      down = false,
      code
    }) => `[${domain}.is-a.dev](https://${domain}.is-a.dev) ${
      down ? 'Cannot Be Reached' : `With A Code Of ${code}`
    } [JSON File](https://github.com/is-a-dev/register/tree/main/domains/${domain}.json) |
`
  )
  .join('')}`
  );

  await fetch('https://api.github.com/repos/is-a-dev/register/issues/1150', {
    method: 'PATCH',
    body: JSON.stringify({
      body: `
      This Is Just To Notify Everyone Who Has A Broken/Unused Domain. 
      If You Need Help Fixing Your Domain, Comment On This Issue, Or Create A New Issue. 
      If You Have Just Parked A Domain For Later Use, We Ask That You Give It Away To Someone Else Who Might Put It To Better Use.

      /cc @${(
        await Promise.all(
          down.map(
            async (domain) =>
              (
                await (
                  await fetch(
                    `https://api.github.com/repos/is-a-dev/register/commits?path=domains/${domain}.json`,
                    fetchOpts
                  )
                ).json()
              )[0].author.login
          )
        )
      ).join(' @')}
      `
    })
  });
})();
