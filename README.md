# Reproduction case for `NoriginMedia/Norigin-Spatial-Navigation#25`

https://github.com/NoriginMedia/Norigin-Spatial-Navigation/issues/25

When navigating to `/auto-back-immediate`, navigation effect happens before
focus is handled, leading to focusing on the element that left the DOM

`/auto-back-timeout` is demo of a seemingly-working workaround

## Setup

```sh
npm i
npm start
```
