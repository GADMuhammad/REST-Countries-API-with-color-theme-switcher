# REST Countries API with color theme switcher

An interactive atlas of the world's 249 countries and territories. Browse every
country as a card, search and filter the list, open any country for full detail,
hop between neighbours through their shared borders, and flip the whole interface
between a light and dark theme that is remembered across visits.

It is a solution to the
[Frontend Mentor "REST Countries API with color theme switcher" challenge](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469ff3675171d8d0f9d).

![Desktop preview](public/design/desktop-preview.jpg)

## Features

- **Country grid** – every country as a card showing its flag, population,
  region and capital, with lazy-loaded flag images and a fade-in on load.
- **Search** – free-text search that matches on country name, native name,
  capital, ISO alpha-3 code, currency name or language name.
- **Region / language / currency filter** – a single dropdown that filters by
  continent (Africa, Asia, Europe, Oceania), sub-region (Caribbean, Northern
  America, South America), spoken language (Arabic, English, French, …) or
  currency (British Pound, Euro, US Dollar, …).
- **Composable filtering** – search text and the dropdown apply together, so
  narrowing one never clears the other. A query with no matches shows a friendly
  "no results" illustration.
- **Country detail page** – native name, top-level domain, population,
  currencies (with symbols), region, sub-region, languages, area and capital,
  plus buttons for every bordering country that navigate straight to that
  country's detail page.
- **Light / dark theme** – toggled from the header, persisted in `localStorage`,
  and applied before first paint so there is no flash on reload.
- **Offline-friendly** – the dataset is fetched once and cached in memory and
  `localStorage`; later visits and reloads render instantly with no network.
- **Responsive** – layout adapts from a four-column grid down to a single column,
  with breakpoints tuned for the design at 1300 / 1190 / 930 / 860 / 580 px.

## Tech stack

| Concern | Choice |
| --- | --- |
| UI library | React 19 |
| Build tool | Vite 6 (`@vitejs/plugin-react-swc`) |
| Routing | React Router 7 (`createBrowserRouter`) |
| Styling | Tailwind CSS 3, `darkMode: "class"` |
| Filter control | `react-select` |
| Loading indicator | `styled-components` |
| Fonts / icons | Nunito Sans (Google Fonts), Ionicons |
| Linting | ESLint 9 (flat config) + Prettier |
| Hosting | Vercel (SPA rewrite in `vercel.json`) |

## How it works

### Data

The country data lives in `public/data.json` (249 entries in the REST Countries
**v2** shape – `alpha3Code`, `nativeName` as a string, `currencies`/`languages`
as arrays of `{ name, … }`). Serving it as a static asset instead of calling the
live API keeps the app fast and reliable.

`src/useCountries.js` is a hook that:

1. returns any dataset already cached in `localStorage` (or a module-level
   variable) synchronously, so warm loads never show a spinner;
2. otherwise fetches `/data.json`, stores it in both caches, and exposes a
   `status` of `"loading" | "ready" | "error"`.

Every component that needs the data calls this one hook, so the fetch happens at
most once per page load. To force a refresh, clear the `countries` key from
`localStorage`.

### Filtering

`src/filterCountries.js` is a pure function:

```js
filterCountries(countries, { query, category }) => Country[]
```

`Home` owns the `query` and `category` state, and derives the visible list with
`useMemo`. `SearchInput` and `RegionMenu` are controlled components that only
report their value upward – they hold no data of their own.

### Theming

`index.html` runs a tiny inline script that adds the `dark` class to
`<html>` from `localStorage` **before** React mounts, avoiding a light-mode
flash. `Header` then mirrors that state and toggles the class plus the stored
value.

### Routing

```text
/            → <Header> (title + theme toggle) with:
  index      → <Home>                 country grid + search + filter
  /:country  → <CountryDetailsPage>   matched by alpha-3 code or name
```

`vercel.json` rewrites all paths to `/` so deep links to `/:country` resolve on
refresh.

## Project layout

| Path | Responsibility |
| --- | --- |
| `src/main.jsx` | React entry point |
| `src/App.jsx` | Router definition |
| `src/useCountries.js` | Load + cache the dataset; expose `{ countries, status }` |
| `src/filterCountries.js` | Pure, composable search + category filtering |
| `src/components/Header.jsx` | Title bar and theme toggle |
| `src/components/Home.jsx` | Owns search/category state, renders the grid |
| `src/components/SearchInput.jsx` | Controlled search box |
| `src/components/RegionMenu.jsx` | Controlled `react-select` filter |
| `src/components/Countries.jsx` | Responsive grid wrapper |
| `src/components/CountryCard.jsx` | Single card in the grid |
| `src/components/CountryDetailsPage.jsx` | Full country view + border links |
| `src/components/Loading.jsx` | Themed loading indicator |
| `src/components/ErrorElement.jsx` | "No results found" illustration |
| `public/data.json` | The country dataset |
| `public/design/` | Reference designs from the challenge |

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint over the project |
