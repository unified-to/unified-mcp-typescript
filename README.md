# JS Experiment - Unified MCP Integration

This repository contains experimental JavaScript/TypeScript code for testing Unified MCP (Model Context Protocol) integrations with OpenAI and Anthropic APIs.

## Overview

The project demonstrates how to integrate Unified MCP servers with different AI providers to access external tools and services. It includes examples for both OpenAI and Anthropic Claude models.

## Features

- **OpenAI Integration**: Uses OpenAI's response mode with MCP tools
- **Anthropic Integration**: Uses Claude with MCP server support
- **Unified MCP**: Connects to Unified's MCP server for email and calendar operations

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- API keys for:
  - OpenAI API
  - Anthropic API
  - Unified API

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-folder>
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your API keys:
```env
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
UNIFIED_API_KEY=your_unified_api_key_here
UNIFIED_MCP_URL=https://mcp-api.unified.to
```

## Usage

### Running the OpenAI Example

```bash
npm start
# or
npm run dev
```

This will run the OpenAI integration by default, which:
- Creates an email message using Unified MCP
- Demonstrates response mode streaming
- Uses the connection ID configured in the code

### Running the Anthropic Example

```bash
npm start anthropic
```

This will run the Anthropic integration, which:
- Creates a Google Calendar event using Unified MCP
- Demonstrates MCP server integration with Claude

## Configuration

### Environment Variables

The following environment variables need to be configured in your `.env` file:

#### API Keys
- **`OPENAI_API_KEY`**: Your OpenAI API key for accessing GPT models and response mode features
  - Get this from [OpenAI Platform](https://platform.openai.com/api-keys)
  - Required for the OpenAI integration example

- **`ANTHROPIC_API_KEY`**: Your Anthropic API key for accessing Claude models
  - Get this from [Anthropic Console](https://console.anthropic.com/)
  - Required for the Anthropic integration example

- **`UNIFIED_API_KEY`**: Your Unified API key for accessing the MCP server
  - Get this from your [Unified Dashboard](https://app.unified.to/)
  - Required for both OpenAI and Anthropic integrations

#### MCP Server Configuration
- **`UNIFIED_MCP_URL`**: The URL of the Unified MCP server
  - Default: `https://mcp-api.unified.to`
  - Optional: Only set if you need to use a different MCP server endpoint
  - Used by both integration examples

### Connection ID

The `connectionId` variable in `main.ts` needs to be updated with your active Unified workspace connection ID. You can find this in your Unified dashboard.

## Project Structure

```
mcp-test-script/
├── main.ts              # Main application logic
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── tsconfig.build.json  # Build-specific TypeScript config
└── README.md           # This file
```

## Examples

### OpenAI Response Mode

The OpenAI example demonstrates:
- Creating email messages through Unified MCP
- Streaming responses with response mode
- Tool integration for external service access

### Anthropic MCP Integration

The Anthropic example demonstrates:
- Creating calendar events through Unified MCP
- MCP server configuration
- Non-streaming message completion

## Dependencies

- `openai`: OpenAI API client
- `@anthropic-ai/sdk`: Anthropic Claude API client
- `dotenv`: Environment variable management
- `typescript`: TypeScript support

## Notes

- The connection ID in the code is hardcoded and should be updated for your specific workspace
- The examples use specific prompts and may need modification for your use case
- Ensure your Unified API key has the necessary permissions for the operations you're testing
