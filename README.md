# Hotel Booling DDD

[![Build Status](https://travis-ci.org/FongX777/hotel-booking-ddd.svg?branch=master)](https://travis-ci.org/FongX777/hotel-booking-ddd)

A hotel room booking app which is implemented under the principle of Domain-Driven Design.
Also we used some tools such as user story mapping, specification by example, and event storming to help us model the domain.

## Tools

Use case exploration:

- User Story Mapping: build a big picture and general use cases
  - online collabroation tool: [miro project](https://miro.com/welcomeonboard/6nhDe0xGUiPcO5XvJEC3J1mKv7pQmThxBQ36dgRw1LvuWkwSQdzycJisGCJ2zfSe)
- Specification by Example: for each user story, specification by example helps elaborate business logic
  - online collabroation tool: [miro project](https://miro.com/welcomeonboard/6nhDe0xGUiPcO5XvJEC3J1mKv7pQmThxBQ36dgRw1LvuWkwSQdzycJisGCJ2zfSe)
  - [cucumber-js](https://github.com/cucumber/cucumber-js)
- Event Stroming:

Development Methodology:

- Test-Driven Design
- Behavior-Driven Design
- Domain-Driven Design

Development Framework and tools:

- ExpressJS: nodeJS http framework
- TypeScript: a typed superset of JavaScript that compiles to plain JavaScript
- Jest: testing framework
- CircleCI
- ESlint

## Methodology

### Entity Pattern Rules

1. all private properties
2. public getters & private setters
3. behavior-driven

(o) a.updateInfo(name, ..,,.., ...);
(x) a.setXXX();

Why used `props` ?

it is just a simple way to avoid tons of `this` assignment

## Reference

- eslint setup: https://mhartington.io/post/typescript-eslint-setup/
