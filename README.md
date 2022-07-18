## Setup
1. Create a fork and clone the repo
2. Run `npm install` [npm](https://docs.npmjs.com/cli/install)
3. Run `npm run json-server` [json-server](https://www.npmjs.com/package/json-server)
4. In a separate terminal, Run `npm start` [Create React App](https://github.com/facebook/create-react-app) - (Should have two terminals running, 1 for the json server & 1 for the UI)


## Test Instructions
1. Add functionality and improve code
  - The minimum goal is that the user should be able to view, add, update, and delete contacts when you are done (the async methods to accomplish this are provided already)
  - After completing base functionality, focus on improving the code and/or the UI/UX
  - Use any libraries you think will help you accomplish what you want
2. Update this README file
  - List changes you make and brief explanations of why you made them under "Changes Made"
  - If you don't have time to complete everything you'd like to, list further changes under "Changes Needed"
3. Finally, in a last commit, share your thoughts about the test under "Final Thoughts." What went well? What were the challenges?

## Evaluation Criteria
1. Your thought process
  - Listing your changes and why you made them is just as important as your code. We want to understand how you think about code.
2. Your code
  - Best practices
  - Readability
  - Reliability
3. UI/UX



## Changes Made
I changed the repo to use Typescript, Route handling, Redux, and Saga. Once these dependencies were added, I restructured the app architecture by moving components to a shared location. The contact card has it own component, so we can reuse this, same with the edit form, which is in charge of the edition and creation behavior. The base theme is Material UI and I wrapped Material UI components with our own components. Http services are on the services folder, which holds all http interactions. Model folder contains all model definitions that are used on the app. Pages folder is intended to hold all different page definitions when needed and is loaded in lazy mode to improve the size of the app; using the lazy mode allows us to load it dynamically and reduce the initial load size. For Sagas I handled store item states that let us know the state of the operations, and we can react to these states by checking if the operation is in progress or not.

## Whate can be improved
We can add test suites for the components and redux store as tech debt. Also, create a Material UI Theme so we can easily plug the brand UI without rewriting the UI on the components. Add Cypress testing for E2E testing. Improve linting on the project.

## Final Thoughts
The main pattern followed in this solution stands on code splitting and reusability. All components have their own responsibilities and handle their own states independently. Using external packages allows me to focus on what needs to be done and on the strategy to split the code and responsibilities. The main challenge is to define the right approach and strategy to restructure the app.
