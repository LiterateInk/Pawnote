# Pawnote - A purrfect API wrapper for Pronote

A simple wrapper around Index-Education's Pronote internal API.

## Versions supported

> Note about versions before 2022 : This package wasn't tested concerning those, so not sure if it works but it should since not a lot of breaking changes were made.

- [x] 2022
- [x] Latest, 2023

## Supported features

### Sessions

- [x] Encrypted
- [x] Compressed

### Account types

- [x] `élève`
- [ ] `parent`

### Authentication

- [x] By `username` and `token`
- [x] By `username` and `password` without any ENT
- [x] By `username` and `password` with ENT

## Note when using demonstration servers

Credentials authentication works, but **token authentication won't work**.
This is because demo servers doesn't save next-time tokens, even if it's able to generate them.

You can know if a server is a demo or not by getting the `isDemo` property on a `Pronote` instance. It returns a boolean that is `true` when the server is a demo.
