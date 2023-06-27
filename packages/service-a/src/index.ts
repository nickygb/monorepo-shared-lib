import { getEnvVariableOrFail } from '@project/lib/env'

const env = getEnvVariableOrFail('MY_ENV');

console.log(env);


