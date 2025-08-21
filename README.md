# Unified MCP Typescript Example

This repository contains experimental JavaScript/TypeScript code for testing Unified MCP (Model Context Protocol) integrations with OpenAI and Anthropic APIs.

## Overview

The project demonstrates how to integrate Unified MCP servers with different AI providers to access external tools and services. It includes examples for both OpenAI and Anthropic Claude models.

## Features

- **OpenAI Integration**: Uses OpenAI's response mode with MCP tools and automatically selects the latest available model
- **Anthropic Integration**: Uses Claude with MCP server support and automatically selects the latest available model
- **Cohere Integration**: Uses Cohere's Command models with MCP tool integration and manual tool call execution
- **Gemini Integration**: Uses Google's Gemini models with native MCP client support and streaming responses
- **Unified MCP**: Connects to Unified's MCP server for email and calendar operations
- **Dynamic Model Selection**: Automatically fetches and uses the latest models from OpenAI and Anthropic APIs

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- API keys for:
  - OpenAI API
  - Anthropic API
  - Cohere API
  - Google Gemini API
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
COHERE_API_KEY=your_cohere_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
UNIFIED_API_KEY=your_unified_api_key_here
UNIFIED_MCP_URL=https://mcp-api.unified.to
```

## Usage

The application now uses command-line arguments for configuration. All examples require building the TypeScript first:

```bash
npm run build
```

### Command-Line Arguments

- `--connection` (required): Your Unified workspace connection ID
- `--action` (required): Action to perform (`gettools` or `prompt`)
- `--model` (required for prompt action): AI model to use (`openai`, `anthropic`, `cohere`, or `gemini`)
- `--message` (required for prompt action): The message/prompt to send

### Running Examples

#### Get Available Tools

```bash
node run start -- --connection YOUR_CONNECTION_ID --action gettools
```

#### OpenAI Prompt Example

```bash
node run start -- --connection YOUR_CONNECTION_ID --action prompt --model openai --message "Create an email draft"
```

#### Anthropic Prompt Example

```bash
node run start -- --connection YOUR_CONNECTION_ID --action prompt --model anthropic --message "Create a calendar event for tomorrow at 2pm"
```

#### Cohere Prompt Example

```bash
node run start -- --connection YOUR_CONNECTION_ID --action prompt --model cohere --message "Draft an email to the team about our upcoming project milestone"
```

#### Gemini Prompt Example

```bash
node run start -- --connection YOUR_CONNECTION_ID --action prompt --model gemini --message "Schedule a client meeting and send a follow-up email"
```

## Configuration

### Environment Variables

The following environment variables must be configured in your `.env` file:

#### API Keys
- **`OPENAI_API_KEY`**: Your OpenAI API key for accessing GPT models
  - Get this from [OpenAI Platform](https://platform.openai.com/api-keys)
  - Required when using `--model openai`

- **`ANTHROPIC_API_KEY`**: Your Anthropic API key for accessing Claude models
  - Get this from [Anthropic Console](https://console.anthropic.com/)
  - Required when using `--model anthropic`

- **`COHERE_API_KEY`**: Your Cohere API key for accessing Command models
  - Get this from [Cohere Dashboard](https://dashboard.cohere.com/)
  - Required when using `--model cohere`

- **`GEMINI_API_KEY`**: Your Google Gemini API key for accessing Gemini models
  - Get this from [Google AI Studio](https://aistudio.google.com/)
  - Required when using `--model gemini`

- **`UNIFIED_API_KEY`**: Your Unified API key for accessing the MCP server
  - Get this from your [Unified Dashboard](https://app.unified.to/)
  - Required for all operations

#### MCP Server Configuration
- **`UNIFIED_MCP_URL`**: The URL of the Unified MCP server
  - Default: `https://mcp-api.unified.to`
  - Optional: Only set if you need to use a different MCP server endpoint

### Required Command-Line Arguments

- **Connection ID**: Pass your active Unified workspace connection ID using `--connection`
  - Find this in your [Unified Dashboard](https://app.unified.to/)
  - Required for all operations

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

### Getting Available Tools

To see what tools are available through the Unified MCP server:

```bash
node dist/main.js --connection conn_12345 --action gettools
```

### OpenAI Integration

Create an email draft using OpenAI's response mode with streaming:

```bash
node dist/main.js \
  --connection conn_12345 \
  --action prompt \
  --model openai \
  --message "Create an email to john@example.com about the quarterly report"
```

This demonstrates:
- Automatic selection of the latest OpenAI model available
- OpenAI's response mode with streaming output
- MCP tool integration for email operations
- Real-time tool execution

### Anthropic Integration

Create a calendar event using Claude:

```bash
node dist/main.js \
  --connection conn_12345 \
  --action prompt \
  --model anthropic \
  --message "Schedule a team meeting for next Friday at 3pm titled 'Project Review'"
```

This demonstrates:
- Automatic selection of the latest Anthropic model available
- Anthropic's MCP server integration
- Calendar operations through Unified MCP
- Non-streaming message completion

### Cohere Integration

Create and send an email using Cohere's Command model:

```bash
node dist/main.js \
  --connection conn_12345 \
  --action prompt \
  --model cohere \
  --message "Compose and send an email to the marketing team about our new product launch timeline"
```

This demonstrates:
- Cohere's Command-A model (command-a-03-2025)
- Manual MCP tool integration with explicit tool call handling
- Email operations through Unified MCP
- Tool execution with response processing

### Gemini Integration

Manage multiple tasks using Google's Gemini model:

```bash
node dist/main.js \
  --connection conn_12345 \
  --action prompt \
  --model gemini \
  --message "Check my calendar for conflicts and schedule a client presentation for next week"
```

This demonstrates:
- Google's Gemini 2.0 Flash model
- Native MCP client integration using the MCP SDK
- Direct client connection to Unified MCP server
- Advanced tool integration with streaming content support

## Dependencies

- `openai`: OpenAI API client
- `@anthropic-ai/sdk`: Anthropic Claude API client
- `cohere-ai`: Cohere API client
- `@google/genai`: Google Gemini API client
- `@modelcontextprotocol/sdk`: MCP SDK for direct client connections
- `dotenv`: Environment variable management
- `typescript`: TypeScript support

## Notes

- **Latest Model Selection**: The script automatically fetches and uses the latest available models from both OpenAI and Anthropic APIs, ensuring you're always using the most up-to-date capabilities
- Connection ID is passed as a command-line argument for flexibility
- All API keys are configured via environment variables for security
- The `gettools` action is not yet implemented but the command structure is in place
- Ensure your Unified API key has the necessary permissions for the operations you're testing
- Build the TypeScript code with `npm run build` before running the examples
- Model selection is dynamic - no need to specify exact model names as the script will use whatever is the latest available
