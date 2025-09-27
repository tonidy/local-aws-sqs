import { $ } from "bun";

const profile = process.env.AWS_PROFILE || "local";
const queues = process.env.QUEUE_NAMES ? process.env.QUEUE_NAMES.split(",") : [];

if (queues.length === 0) {
    console.error("❌ No queues specified. Set QUEUE_NAMES in .env");
    process.exit(1);
}

for (const queue of queues) {
    console.log(`🚀 Creating queue: ${queue}...`);
    const result = await $`aws --profile ${profile} sqs create-queue --queue-name ${queue}`
        .quiet()
        .nothrow();

    const stdout = result.stdout?.toString().trim();
    const stderr = result.stderr?.toString().trim();

    if (result.exitCode === 0) {
        console.log(`✅ Successfully created queue: ${queue}`);
        if (stdout) console.log(stdout);
    } else {
        console.error(`❌ Failed to create queue: ${queue}`);
        if (stderr) console.error(stderr);
    }
}
