This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Install the dependencies by running `pnpm install`

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## App instrunctions

This is a 3 page application.

The homepage = Offers a quiz to test cocktail knowledge
Search page = Returns a list of cocktails by ingredient (Free version of API limited to one ingredient)
Cocktail details page = Shows details of selected cocktail

## Points of improvement

1. Centralize the API calls in its own service/file
2. Transform the API data shape and use ZOD for validation
3. Better way to show errors with fetching data to users
