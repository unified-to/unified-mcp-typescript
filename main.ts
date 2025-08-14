import dotenv from "dotenv";
dotenv.config();
import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";

export async function main() {
    // get args
    const args = process.argv.slice(2);
    const input = args[0];

    if (input === "anthropic") {
        await testAnthropic();
    } else {
        await testOpenAI();
    }
}

const connectionId = ""; // this is the connection id I found active in your workspace
const token = process.env.UNIFIED_API_KEY || "";

async function testOpenAI() {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const params = new URLSearchParams({
        token,
        type: "openai",
        dc: "local",
        connection: connectionId,
    });

    // // Uncomment this for response mode
    const now = new Date();
    const todayDate =
        now.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        }) +
        ` at ${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")} UTC`;

    const systemPrompt = `Today is ${todayDate} ${now.getFullYear()}`;

    const serverUrl = `${process.env.UNIFIED_MCP_URL || 'https://mcp-api.unified.to'}/sse?${params.toString()}`;

    console.log("serverUrl", serverUrl);

    const completion = await openai.responses.create({
        model: "gpt-4o-mini",
        tools: [
            {
                type: "mcp",
                server_label: "unifiedMCP",
                server_url: serverUrl, // change url as needed
                require_approval: "never",
            },
        ],
        instructions: `You are a helpful assistant that can use the following tools to get information about the user's email, and ${systemPrompt}. My timezone is America/Regina`,
        input: `Create a message to  {recipient} with subject "Test Email 2 - August 14 UnifiedMCP" and body "This is a test email from UnifiedMCP" fromm sender '{sender}' to the unread emails`,
    });

    for await (const chunk of completion.output) {
        console.log("chunk", chunk);
        console.log(JSON.stringify(chunk, null, 2));
    }
}

async function testAnthropic() {
    const params = new URLSearchParams({
        token,
        connection: connectionId,
        dc: "local",
    });

    const anthropic = new Anthropic({
        apiKey:
            process.env.ANTHROPIC_API_KEY,
    });

    const serverUrl = `${process.env.UNIFIED_MCP_URL || 'https://mcp-api.unified.to'}/sse?${params.toString()}`;

    console.log("serverUrl", serverUrl);

    const completion = await anthropic.beta.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        messages: [
            {
                role: "user",
                content: `Create a message to  {recipient} with subject "Test Email 2 - August 14 UnifiedMCP" and body "This is a test email from UnifiedMCP" fromm sender '{sender}' to the unread emails`,
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
