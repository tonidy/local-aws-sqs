import { $, type ShellOutput } from "bun";

const profile = process.env.AWS_PROFILE || "local";
const queues = process.env.QUEUE_NAMES ? process.env.QUEUE_NAMES.split(",") : [];

if (queues.length === 0) {
    console.error("❌ No queues specified. Set QUEUE_NAMES in .env");
    process.exit(1);
}

for (const queue of queues) {
    console.log(`🚀 Creating queue: ${queue}...`);
    let result: ShellOutput | undefined;

    try {
        result = await $`aws --profile ${profile} sqs create-queue --queue-name ${queue}`.quiet();

        // Parse AWS CLI response
        const output = result.stdout.toString().trim();
        console.log(`✅ Successfully created queue: ${queue}`);

        // Only print the output once
        if (output) console.log(output);

    } catch (error) {
        console.error(`❌ Failed to create queue: ${queue}`);
        if (error instanceof Error) {
            console.error(result?.stderr?.toString().trim() || error.message);
        } else {
            console.error(result?.stderr?.toString().trim() || String(error));
        }
    }
}