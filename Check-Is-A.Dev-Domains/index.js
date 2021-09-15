'use strict';

const fetch = require('node-fetch'),
  fs = require('fs');

var down = [],
  promises = [];

(async () => {
  console.time('Completion');
  const fetchOpts = {
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
    promises.push(
      (async () => {
        if (i.path.startsWith('domains/')) {
          let current = i.path.replace('domains/', '').replace('.json', '');
          let fetched;
          if (['@', '_psl', '_dmarc'].includes(current)) return;

          try {
            fetched = await fetch(`https://${current}.is-a.dev`);
          } catch (_) {
            console.log(`https://${current}.is-a.dev Cannot Be Reached`);
            down.push({ domain: current, down: true });
            return;
          }

          if (!fetched?.ok) {
            console.log(
              `https://${current}.is-a.dev Is NOT OK, It Is: ${fetched.status}`
            );
            down.push({ domain: current, code: fetched.status });
          }
        }
      })()
    );
  }

  await Promise.all(promises);

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
    ...fetchOpts,
    method: 'PATCH',
    body: JSON.stringify({
      body: `
This Is Just To Notify Everyone Who Has A Broken/Unused Domain.
If You Need Help Fixing Your Domain, Comment On This Issue, Or Create A New Issue.
If You Have Just Parked A Domain For Later Use, We Ask That You Give It Away To Someone Else Who Might Put It To Better Use.

<detail>
<summary><b>Users Who Have Broken Domains</b></summary>

<p>

@${[
        ...new Set(
          await Promise.all(
            down.map(async ({ domain }) => {
              const data = await (
                await fetch(
                  `https://api.github.com/repos/is-a-dev/register/commits?path=domains/${domain}.json`,
                  fetchOpts
                )
              ).json();
              for (const item of data) {
                if (item.author?.login === 'phenax') continue;

                return (item.author
                  ? item.author.login
                  : item.commiter?.login) === undefined
                  ? void 0
                  : item.author
                  ? item.author.login
                  : item.commiter?.login;
              }
            })
          )
        )
      ].join('\n@')}

</p>

</detail>`
    })
  });
})();
