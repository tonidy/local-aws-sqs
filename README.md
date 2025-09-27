# local-aws-sqs

To install dependencies:

```bash
bun install
```

## Environment Setup

- Copy the example env file and customize values:

```bash
cp .env.example .env
```

- Variables in `.env`:
  - `AWS_PROFILE`: AWS CLI profile to use (default `local`).
  - `QUEUE_NAMES`: Comma-separated SQS queue names to create (e.g. `user-queue,payment-queue`).

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.2. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
