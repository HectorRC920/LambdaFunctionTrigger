const dotenv = require('dotenv');
// config() will read your .env file, parse the contents, assign it to process.env.
dotenv.config();
const { AWS_S3_USER_KEY, AWS_S3_USER_SECRET } = process.env;
const { LambdaClient,  ListFunctionsCommand,InvokeCommand} = require("@aws-sdk/client-lambda");
async function init(params) {
  const { functionName } = params
  const client = new LambdaClient({ region: "us-east-1", accessKeyId: AWS_S3_USER_KEY, secretAccessKey: AWS_S3_USER_SECRET  });
  const command = new InvokeCommand({FunctionName: functionName, Payload: JSON.stringify( {url:'https://www.youtube.com/'})});
  const { Payload, LogResult } = await client.send(command);
  const result = Buffer.from(Payload).toString();
  console.log(result);
}
//name of functions stored in aws
init('funcName')