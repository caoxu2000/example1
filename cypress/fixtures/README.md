## Fixtures
The `cypress/fixtures` files are used for data configurations throughout the page objects and test files.\
The strategy will change so please update this file as implementations morph. 

# Design
- Json (`.json`): The most standard approach, maximizing portability and interoperability but lacking programmability which many will argue is a design feature.   
- Javascript (`.js`): Using javascript for configuration files affords us the most flexible implementation as it offers access to all features of the programming language. That said, since these are config files we ideally want to keep them lightweight without much processing logic and easy to consume.
- Typescript (`.ts`): See `cypress/fixtures/procedure.ts` as an example of a strongly typed, auto-generated config.