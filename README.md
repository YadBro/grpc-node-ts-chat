# Introduction

This is a grpc chat resource, or this is a biderectional streaming implentaion.

## How to use

Case: You make 2 or more users in 1 chat room.

1. Clone this repository
2. Run this command:

```sh
yarn install
```

3. Make 3 sessions terminal and split it
4. In session 1 run this command (this command to run the server):

```
yarn start
```

5. In session 2 and others you make a user, run this command (Replace "<username>" like "Yadi"):

```sh
yarn client <username>

// example
yarn client Yadi
```

6. In session 3 and others you make a user, run this command (Replace "<username>" like "Budi"):

```sh
yarn client <username>

// example
yarn client Budi
```

It's done, start your case. Chat user to other user 😄.

