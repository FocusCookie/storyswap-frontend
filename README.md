
# Storyswap

A local book-sharing app to reduce waste, overcome the current paper shortage, and to declutter your bookshelf.


## Demo

Insert gif or link to demo

![Storyswap Demo](https://media.giphy.com/media/fBPilb1mU3YsZ0RTnJ/giphy.gif)

## Features

- Multilanguage support (ENG and GER)
- Mapbox to show the location of the book
- ISBNdb check, the book data is handle automatically based on the books isbn number
- Mobile first
- Reserve books for up to three days
- User data is completelly handled via auth0


## Design

[Figma Design](https://www.figma.com/file/CxlsG8TtjDscf39zBhvGgN/storyswap?node-id=0%3A1)

- Created a design system (colors, fonts, spacing, ...)

- Created components first

- Created views with the components

- Build an clickable mockup to test new ideas and the flows of the views/app
## Tech Stack

**Client:** React, TailwindCSS, [Storybook Design System](https://619caf130836b5003a6bffa2-uvhbuxxhfb.chromatic.com/) for testing,


**Server:** Node, Express, Mongoose, JEST for testing

**API's:** ISBNdb, Mapbox

**Database:** MongoDB

**Authentication&Authorization:** Auth0

**Deployment:** Digital Ocean App, Droplet, Docker & Docker-Compose

**Design:** Figma
## Architecture
In the beginning, I used docker containers and put these together with docker-compose. 
This docker-compose was running on a digital-ocean droplet with a load balancer in front to 
have an HTTPS cert and connection.

To have a better workflow for further development I switched to the digitial-ocean app platform.
The backend and frontend will be automatically rebuilt on every git merge on the main branch.

### Highlevel Architecture
![Highlevel Architecture](https://i.ibb.co/jJwT62X/storyswap-architecture.png)
[Highlevel Architecture](https://ibb.co/NTNsVPB)

### Current Hosting Solution
![Hosting with CICD](https://i.ibb.co/MMS8FCk/storyswap-architecture-cicd.png)
[Hosting with CICD](https://ibb.co/gz9vkRZ)


### Old Hosting Solution
![Hosting with Linux Server](https://i.ibb.co/L5kpJBf/storyswap-architecture-hosting-old.png)
[Hosting with Linux Server](https://ibb.co/rs7ycqJ)




## 🚀 About Me
I'm Stephan 👋 and I'm product owner/manager and full stack developer and a design enthusiasts.




# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# ENV File

CHROMATIC_PROJECT_TOKEN is setup in Github. Its defined in the chromatic.yml file.

```
CHROMATIC_PROJECT_TOKEN=
REACT_APP_MAPBOX_TOKEN=
```

# Github Secret

If you want to use github actions you need to setup a secret env war in github repo.
SEttings--> Secrets: CHROMATIC_PROJECT_TOKEN with the project token from chromatic
You also need to setup the REACT_APP_MAPBOX_TOKEN in the githubsecrets in order to have a working map in the online storybook
