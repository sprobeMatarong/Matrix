# Merge/Pull Request Guidelines
Please check the following guidelines below before `Submitting/Reviewing` a `Merge/Pull Request` in the repository. 

## For Developers
1. Have a clear understanding of the **Task** and set the expectations on what it should do and how before you start to code.  
- [ ] Is there anything you are not sure about? Just ask.

2. Ask the team lead/project manager for the source/starting branch or tag `e.g master or develop` where you will branchout `git checkout -b NEW_BRANCH` for your new task.  
- [ ] Ask for the branch name convention e.g `feature-####`, `bug-fix-####`

3. Does the system have existing automated testing?
- [ ] If `YES`, run the whole test suite `FIRST` and make sure there are no `ERRORS/FAILURES` in any of the tests.
- [ ] If there are any errors, inform the **Team Lead or Project Manager** regarding the errors before proceeding in implementing your code.

4. Implement the Feature. Begin writing your Code.

5. Self Review your Code (Common)
- [ ] Are there any Typo?
- [ ] Did you remove everything that is not supposed to be there?
    - [ ] Debug prints/logs?
    - [ ] Unnecessary trailing spaces or extra empty lines?
- [ ] Does it do what it is supposed to do?
- [ ] Did you Check all the possible edge cases and have a solution for them?
- [ ] Is the code easy to read and understand? Did you choose the best names and organise things as cleanly as possible?
- [ ] Isn't the functionality you've added already implemented somewhere else? If it's duplicated, reconsider the design.
- [ ] Isn't there any conceivable way this could break other parts of the system?
- [ ] Aren't there any possible security threats?

6. Self review your code (Frontend)
- [ ] Make sure to `ASK` for the `Adobe XD/Figma Design` or any `Mockup` Available for your task
- [ ] Did you use any existing UI components?
- [ ] Is UI visually consistent? (font size, line height, margin, padding)
- [ ] Did you perform any Error Validation?
- [ ] Does it look OK on phone/mobile/tablet?
- [ ] How is the text content? Are sentences well-formed and clear? Any spelling error or typos?
- [ ] Can your code handle the scenario when the request to the backend API fails?
- [ ] Did you make any changes to any existing component in the UI? If so, make sure to Check if all usages of the component still work as expected.
- [ ] Check if there is no error in the developer console.
- [ ] Make sure there are NO WARN/ERR in ESLint. **AVOID** pushing code with **Errors and Warnings** in ESLint

7. Self review your code (Backend)
- [ ] Did you perform any Error Validation?
- [ ] Does your code follows the PSR12 Coding Standards?
- [ ] Run `./fixer` in your local to apply Fix/Format your PHP Code to follow the PSR12 Standards.

8. Write Unit tests (or write unit tests first). Make sure you write happy path and exception tests.
- [ ] Run your Unit Tests for the feature and make sure all the cases are PASSING
- [ ] Run the Whole Test Suite and make sure there are no FAILING tests from other tests files.
- [ ] If any other tests FAILS, check if the logic has been affected by your recent file changes.

9. Commit your changes if all tests(Automated Unit Testing and Selenium) are PASSING. 

10. Perform fetch from the source branch defined above by team lead/Project Manager e.g `git fetch develop` or `git fetch master`. Please **AVOID** using `git pull`

11. Rebase your current branch with the changes from source branch e.g `git rebase origin/develop` or `git rebase origin/master`
- [ ] If there are conflicts, Fix it.
- [ ] After fixing conflicts, Run the Whole Test Suite Again [Automated Unit Test & Selenium] and make sure everything is PASSING.
- [ ] Manual UI Checking for your current implementation

12. Submit/Create the Pull Request/ Merge Request. Make sure to provide the following information:
- [ ] Descriptive Pull/Merge Request Title
- [ ] Reference for UI [Mockup/Adobe XD/Figma Design] of your Task
- [ ] Include detailed Test Plan, Steps to Execute, and Acceptance Criteria

---

## For Reviewers

1. Code Review
- [ ] Check the reference for UI **Mockup/XD/Figma Design** . Be Strict in reviewing the design e.g alignment, color, formatting (pixel perfect if necessary).
- [ ] Visual Checking by following the **Test Plan** and make sure the **Tasks Acceptance Criteria** is fulfilled.
- [ ] Run the whole Test Suite, both **Automated Unit Test and Selenium** if available.
    - [ ] If there are errors, `NOTIFY` the developer and `DON'T` proceed to code review unless all Test Suites are `PASSING`.
- [ ] Don't hesitate to submit `Request Changes` to the developer if you found something after reviewing like any and not limited to the following:
    - [ ] Errors in Browser's console.
    - [ ] ESLint Warning and Error Mesages
    - [ ] Did not follow the Design Pattern Standards (Error/Exception Handling, Coding Structure etc)
    - [ ] Did not met the Feature Acceptance Criteria.

2. `Accept` Pull/Merge Request.
