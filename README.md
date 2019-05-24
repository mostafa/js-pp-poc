# Prototype Pollution Attack on Node.js Redis Drivers

Simply clone the project, install the dependencies with NPM/YARN and run the test:

```bash
$ npm install
$ npm run test
```

A byproduct of this exploit is that you can execute almost anything inside the `toString` function.

[//]: # "This exploits the following lines, but I am not sure about the second one:"
[//]: # "- https://github.com/NodeRedis/node_redis/blob/a60261da0461d4bb114b1533fada87e97fa985c8/index.js#L916"
[//]: # "- https://github.com/luin/ioredis/blob/b9c47938bb3914d8dae5db17eef7ffdab0dd0399/lib/utils/index.ts#L52"
