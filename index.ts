import { createSqsServer } from "local-aws-sqs";

const port = 5450;
const server = await createSqsServer({ port });

console.log(`SQS Server running at http://localhost:${port} with PID: ${process.pid}`);
