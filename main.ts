import dotenv from "dotenv";
dotenv.config();
import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";


// inputs
// --connection - required
// --api_key - required
// --action (gettools, prompt) - required
// --model (openai, anthropic) - required if action is prompt
// --message (prompt) - required if action is prompt

export async function main() {
    // Parse args
    const args = process.argv.slice(2);
    const argMap: Record<string, string> = {};
    for (let i = 0; i < args.length; i++) {
        if (args[i].startsWith("--")) {
            const key = args[i].replace(/^--/, "");
            const value = args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : "true";
            argMap[key] = value;
            if (value !== "true") i++;
        }
    }

    // Required args
    const connection = argMap["connection"];
    const action = argMap["action"];
    const model = argMap["model"];
    const message = argMap["message"];
    const dc = argMap["dc"] || "local";

    if (!connection) {
        console.error("Missing required argument: --connection");
        process.exit(1);
    }
    if (!action) {
        console.error("Missing required argument: --action");
        process.exit(1);
    }

    if (action === "prompt" && !message) {
        console.error("Missing required argument: --message (required for prompt action)");
        process.exit(1);
    }

    if (action === "gettools") {
        // Placeholder for gettools logic
        await getTools(connection, process.env.UNIFIED_API_KEY || "", dc);
        process.exit(0);
    }

    if (action === "prompt") {
        if (model === "anthropic") {
            await testAnthropic(connection, message, dc);
        } else if (model === "openai") {
            await testOpenAI(connection, message, dc);
        } else {
            await testOpenAI(connection, message, dc);
            process.exit(1);
        }
    }
}

async function getTools(connection: string, api_key: string, dc: string) {
    const params = new URLSearchParams({
        token: api_key,
        connection,
        dc,
    });

    const tools = await fetch(`${process.env.UNIFIED_MCP_URL || 'https://mcp-api.unified.to'}/tools?${params.toString()}`);
    const toolsJson = await tools.json();
    console.log(JSON.stringify(toolsJson, null, 2));
}



async function testOpenAI(connection: string, message: string, dc: string) {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY || "",
    });
    const params = new URLSearchParams({
        token: process.env.UNIFIED_API_KEY || "",
        type: "openai",
        dc,
        connection,
    });


    const serverUrl = `${process.env.UNIFIED_MCP_URL || 'https://mcp-api.unified.to'}/sse?${params.toString()}`;

    console.log("serverUrl", serverUrl);

    // get the latest model from open ai
    const models = await openai.models.list();
    const latestModel = models.data[0].id;

    const completion = await openai.responses.create({
        model: latestModel,
        tools: [
            {
                type: "mcp",
                server_label: "unifiedMCP",
                server_url: serverUrl, // change url as needed
                require_approval: "never",
            },
        ],
        instructions: `You are a helpful assistant my stuff[jc@unified.to]`,
        input: message,
    });

    for await (const chunk of completion.output) {
        console.log("chunk", chunk);
        console.log(JSON.stringify(chunk, null, 2));
    }
}

async function testAnthropic(connection: string, message: string, dc: string) {
    const params = new URLSearchParams({
        token: process.env.UNIFIED_API_KEY || "",
        connection,
        dc,
    });

    const anthropic = new Anthropic({
        apiKey:
            process.env.ANTHROPIC_API_KEY,
    });

    const serverUrl = `${process.env.UNIFIED_MCP_URL || 'https://mcp-api.unified.to'}/sse?${params.toString()}`;

    console.log("serverUrl", serverUrl);

    // get the latest model from anthropic
    const models = await anthropic.models.list();
    const latestModel = models.data[0].id;

    const completion = await anthropic.beta.messages.create({
        model: latestModel,
        max_tokens: 1024,
        messages: [
            {

                role: "user",
                content: message,
            },
        ],
        stream: false,
        mcp_servers: [
            {
                type: "url",
                url: `${process.env.UNIFIED_MCP_URL || 'https://mcp-api.unified.to'}/sse?${params.toString()}`, // change url as needed
                name: "unifiedMCP",
            },
        ],
        betas: ["mcp-client-2025-04-04"],
    });

    console.log(completion);
}

main();
