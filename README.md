# Mentorship-work

## To Run

`npm build`
runs `rimraf ./dist && tsc && copyfiles --up 1 **/*.graphql ./dist`

`npm start`
runs `npm run build && node dist/index.js`
