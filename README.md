# @klasa/rest
This is a request handler for the discord api and is responsible for handling all ratelimits. This utilizes the latest headers for millisecond precision and hash bucket grouping. Because of that maximum throughput is possible without hard-coding any rates or limits. This library also features 100% unit test coverage.

Simple Example:
```typescript
import { REST, Routes } from '@klasa/rest';
import * as config from './config.json';

const rest = new REST();

rest.token = config.token;

rest.get(Routes.oauthApplication())
    .then(console.log);
```
