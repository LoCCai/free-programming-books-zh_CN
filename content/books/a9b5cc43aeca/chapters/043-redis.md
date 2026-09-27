```
const redis = require('@dwing/redis');

const client = redis({
  host: '127.0.0.1',
  port: 6379,
  db: 0
});

(async () => {
  // 推荐
  await client.set('trial:127.0.0.1', 1, 900);

  // 或

  // 需要注意，如果该`key`之前已存在，且ttl已设置，重新set之后，ttl会变成-1（永久）；
  await client.set('trial:127.0.0.1', 1);
  // TTL: 900s
  await client.expire('trial:127.0.0.1', 900);
})();
```
