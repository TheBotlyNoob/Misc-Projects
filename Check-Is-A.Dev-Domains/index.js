'use strict';

const fetch = require('node-fetch'),
  fs = require('fs');

var down = [],
  promises = [];

(async () => {
  console.time('Completion');
  const fetchOpts = {
    headers: {
      Authorization: `Token ${process.env.GITHUB_TOKEN}`
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
          const current = i.path.replace('domains/', '').replace('.json', '');
          const domainData = await (
            await fetch(
              `https://api.github.com/repos/is-a-dev/register/commits?path=domains/${current}.json`,
              fetchOpts
            )
          ).json();
          let fetched;
          console.log(domainData);
          if (
            ['@', '_psl', '_dmarc'].includes(current) ||
            domainData[0].commit.author.date.split('-')[1] <=
              new Date().getMonth() - 5
          )
            return await new Promise((res) => setTimeout(res, 1000));

          try {
            fetched = await fetch(`https://${current}.is-a.dev`);
          } catch (_) {
            console.log(`https://${current}.is-a.dev Cannot Be Reached`);
            down.push({ domain: current, down: true, domainData });
            return await new Promise((res) => setTimeout(res, 5000));
          }

          if (!fetched?.ok) {
            console.log(
              `https://${current}.is-a.dev Is NOT OK, It Is: ${fetched.status}`
            );
            down.push({
              domain: current,
              code: fetched.status,
              domainData,
              down: false
            });
          }
        }
        await new Promise((res) => setTimeout(res, 5000));
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
      down,
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

> If You Are Using Vercel Or Netlify, Try [Railway](https://railway.app?referralCode=jj)

<details>
<summary><b>Users Who Have Broken Domains</b></summary>

<p>

${(
  await Promise.all(
    down.map(async ({ domain, domainData }) => {
      for (const item of domainData) {
        if (item.author?.login === 'phenax') continue;

        return `@${
          (item.author ? item.author.login : item.commiter?.login) === undefined
            ? void 0
            : item.author
            ? item.author.login
            : item.commiter?.login
        } - ${domain}.is-a.dev`;
      }
    })
  )
)
  .filter(Boolean)
  .join('\n')}

</p>

</details>`
    })
  });
})();
