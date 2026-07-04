# DemoQA app

In this project I have created five tests on [DemoQA](https://demoqa.com/books) site. Three test test the UI of website and two test the API behind the app.

Since the book detail does not function properly from address https://demoqa.com/books?book={ISBN} I have decided two show the detail of the book through profile page, where it functions correctly that is through https://demoqa.com/profile?book={ISBN}.

## Project logic

Although the tests are very simple I still decided to show a bit of real life example where separated the test in some logical pieces. I have decided to create an `api` folder where I putted all the API calls and also payloads and schema verification. Though if it was a bigger project I would separate these into its own folders.

Than there is a `helper` folder where I create a helpers for authorization on API, generalized some expects (to reduce amount of code), added helper for locator, and choice of random number.

`Pages` folder contains page objects for more cleaner work with locators on the webpage.

In `tests` folder are obviously tests for both API and UI. Since there is so few of them this is enough on bigger project I would consider a higher degree of folder structure.

Obviously, now test can be run only locally if we would like to run them on pipeline we would a `ci` folder (or `.github` folder) where would handle all the pipelines. Also, we can add other folders which would make sense, but for this purpose it is enough.

## Potential nice to have

Though we have made the foundation of folder structure quite good we can also add some nice to have like eslint and other monitoring tools for code unification. Also, since we are not working with login, we should add it into globalSetup of config file.