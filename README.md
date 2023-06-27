# monorepo-shared-lib

Suppose we have some shared functionalities we want to share accros our services and we want to
create a yarn workspace (called `lib`) that contains all those functions. As the shared functions start to grow, it is important to have them organized.

Supose for example we have some functions for managing environment variables and others for time functions. And we want to have them organized with the following structure

```
  lib 
    | env  // submodule for env variable functions
      | index.ts
    | time  // submodule for time functions
      | index.ts
    ...
```

And we want to consume them as following:

``` ts
// service-a

// NOTE that environement variables functions are exported in the env submodule of lib workspace.
import { getEnvVariableOrFail } from '@project/lib/env';
import { getCurrentTime } from '@project/lib/time'
...

```

# How to export submodules from lib

1. We need to add `declarations: true` in the `tsconfig.json` file from `lib` workspace, so the build process generates the `.d.ts` files of our code.

```
{
  "compilerOptions": {
    ...
    "declaration": true,
  },
  ...
}
```

2. In `lib` workspace we need to add `exports` and `typesVersions` in the `package.json`, so we can export each submodule independently and be able to find the types from each submodule.

``` package.json
{
  ...
  "exports": {
    "./env": "./dist/src/env/index.js",
    "./time": "./dist/src/time/index.js"
  },
  "typesVersions": {
    "*": {
      "env": ["dist/src/env/index.d.ts"],
      "time": ["dist/src/time/index.d.ts"]
   }
  }
}
```

3. Install the `lib` workspace on `service-a` as dependency.

```
  yarn workspace @project/service-a add @project/lib@1.0.0
```

4. Then we can import the submoudles in `service-a` as following:

``` ts
// service-a src/index.ts
import { getEnvVariableOrFail } from '@project/lib/env'
...
```















