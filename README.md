# Golden Team: Football Club Website Template

A free one-page football club website built with [SportyBlocks](https://sportyblocks.com) components and Tailwind CSS 4. Golden Team is a fictional club in the fictional Blocks League.

## What is on the page

| Section | Built from |
|---|---|
| Hero with the next match | Template block |
| Latest results | Scoreboard v1, four cards |
| Next matches | Match Schedule v1 |
| League table | Standings v1 and Head-to-Head v1 |
| Player of the month | Player Stats v1 |
| Squad with position filter | Player Card v1, eight cards |
| News | Template block |
| Join the club, with training times and a form | Template block |
| Partners and footer | Template blocks |

Light and dark mode are both included, with a toggle in the header. Headings, cards and sections blur in as they scroll into view.

## Get it

- **Ready to upload:** download the zip from [sportyblocks.com/free/football-club-website-template](https://sportyblocks.com/free/football-club-website-template). It includes a built `dist/` folder: open `index.html` in a browser, or upload the folder to any web host. No tools needed.
- **From this repository:** clone it and run the build below. `dist/` is not committed; the build creates it.

## Edit it

The page is assembled from the pieces in `src/`, so the header, the footer and each section live in one place.

```bash
npm install
npm run dev     # rebuilds dist/ and the CSS whenever a file in src/ changes
npm run build   # one-off build with minified CSS
```

```
src/
  pages/        index.html, the list of sections
  blocks/       one file per section: hero, results, fixtures, table, player of the month,
                squad, news, join, sponsors
  components/   SportyBlocks components
  partials/     head, header, footer, section titles, team crest, photo placeholder,
                the result card and the fixture row
  css/input.css Tailwind entry point and the SportyBlocks theme
  js/main.js    mobile menu, theme toggle, squad filter, blur-in reveal
  img/          player photos
```

A page pulls in a piece with `<!-- @include partials/header.html -->`. Values passed on the include, such as `title="Home"`, replace `{{title}}` in the included file. The result cards and fixture rows take all their data this way, so a new match is one line in `blocks/results.html` or `components/MatchSchedule1.html`.

### Things to change first

- **Club name, crest and colours:** `partials/header.html`, `partials/footer.html` and `partials/crest.html` (one crest, coloured per team with `team="golden"`). The theme colours are in `css/input.css`; the club colour is `team-golden-primary`.
- **Content width:** every section sits in the `club-container` column (1400px). Change it in `css/input.css`.
- **Next match and tickets:** `blocks/hero.html`. Point the Buy tickets button and the Tickets button in the header at your ticket shop.
- **Animation:** anything with a `data-reveal` attribute blurs in (styles at the end of `css/input.css`, script in `js/main.js`). Remove the attribute to keep an element still. Visitors who prefer reduced motion see no animation, and without JavaScript everything simply shows.
- **Forms:** the newsletter and join forms are front-end only. Point their `action` at your own service.
- **Images:** the player photos, the news photos and the partner logos are AI-generated stand-ins (fictional people, fictional companies), free to use but meant to be replaced with your own. They live in `img/players`, `img/news` and `img/partners`.

## More components

Every section has more designs in the full SportyBlocks library: 12 scoreboards, 8 match schedules, 5 standings tables, 5 team rosters and 87 components in total, in HTML and React, with a Figma file. See [sportyblocks.com](https://sportyblocks.com).

## License

Free for unlimited personal and commercial websites, client work included. You may not resell or redistribute the template or its components as a template, theme or UI kit. The full terms and third-party credits are in [LICENSE.md](LICENSE.md).
