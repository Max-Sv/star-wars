# React + TypeScript + Vite

StrictMode was removed according to this article: https://github.com/facebook/react/issues/24425

Points:

✔Eslint is set up, when lint command is run it doesn't produce any errors (if there are warnings score might be less) - 15 points

✔Prettier is set up, fix commands fixes issues - 15 points

✔Husky is set up, linting is run on pre-commit - 10 points

✔Page is split into 2 sections, top one has Search and "Search" button, main section displays the list of results from the selected api when page is opened for the first time (loader should be shown whilst app makes a call to the api) - 20 points

✔When user types something to the Search and clicks "Search" button, a loader is displayed and the list is changed according to the response results for a provided search term - 15 points

✔The search term typed into the Search is saved in the local storage when user clicks on "Search" button (check it by closing the tab and open the app in the new one - the initial call should contain previously entered search term) - 15 points

✔Application is wrapped with ErrorBoundary, which logs error to a console and shows a fallback UI. Ther should be a button to throw an error - 10 points
