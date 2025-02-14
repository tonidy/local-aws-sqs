import { createSqsServer } from "local-aws-sqs";

const server = await createSqsServer({ port: 5450 });
