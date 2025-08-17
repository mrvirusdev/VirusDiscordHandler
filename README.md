# VirusBot Discord Handler

A modern, feature-rich Discord bot handler built with Discord.js v14, featuring both slash commands and prefix commands with a robust architecture designed for scalability and maintainability.

## 🚀 Features

- **Dual Command System**: Support for both slash commands and prefix commands
- **Modular Architecture**: Clean separation of concerns with dedicated handlers
- **Anti-Crash System**: Comprehensive error handling and monitoring
- **Event-Driven**: Fully event-driven architecture
- **ES6 Modules**: Modern JavaScript with ES6 module syntax
- **Environment Configuration**: Secure configuration management with dotenv

## 📁 Project Structure

```
bot_handler/
├── package.json                 # Project dependencies and scripts
├── README.md                    # Project documentation
├── Core/                        # Core utilities and webhooks
│   ├── commandUtils.js          # Utilities for handling commands
│   ├── emojis.js                # Centralized emoji definitions
│   ├── errorWebhook.js          # Error reporting via webhook
│   ├── joinGuildWebhook.js      # Webhook when the bot joins a guild
│   ├── leaveGuildWebhook.js     # Webhook when the bot leaves a guild
│   ├── prefixCommandWebhook.js  # Webhook logging for prefix commands
│   ├── readyWebhook.js          # Webhook logging for bot ready event
│   └── slashCommandWebhook.js   # Webhook logging for slash commands
│
├── Database/                    
│   └── mongo.js                 # MongoDB connection setup
│
├── Events/                      # Discord event handlers
│   ├── error.js                 # Global error event handler
│   ├── guildCreate.js           # Handler when bot joins a server
│   ├── guildDelete.js           # Handler when bot leaves a server
│   ├── interactionCreate.js     # Handles slash command interactions
│   ├── messageCreate.js         # Handles prefix commands
│   └── ready.js                 # Bot ready event
│
├── Handlers/                    # Handlers for modularity
│   ├── AntiCrash.js             # Crash prevention and error handling
│   ├── Commands.js              # Slash command loader/registration
│   ├── Events.js                # Event handler loader
│   ├── logger.js                # Logger for bot activity
│   ├── Models.js                # Models loader
│   └── Prefix.js                # Prefix command loader
│
├── Models/                      
│   ├── userModel.js             # Mongoose schema for user data
│   └── config.js                # Bot configuration model
│
├── Commands/                    
│   ├── Prefix/                  # Prefix commands
│   │   └── Public/              
│   │       └── ping.js          # Example prefix ping command
│   └── Slash/                   # Slash commands
│       └── Public/
│           └── ping.js          # Example slash ping command
│
└── index.js                     # Main bot entry point

```

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/mrvirusdev/VirusDiscordHandler.git
   cd NewDiscordHandler
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Open `config.json` file in the root directory with the following variables:

   ```Config
   # Discord Bot Configuration
    token = "Your Bot Token",
    clientId = "Your Bot Id",
    prefix = "Your Prefix",
    ownerIds = ["Owner Id 1", "Owner Id 2"],
    MONGODB_URI = "Your Mongo URL",
    errorWebhook = "Your Error Webhook",
    slashCommandWebhook = "Your SlashCommandLog Webhook",
    prefixCommandWebhook = "Your PrefixCommandLog Webhook",
    joinGuildWebhook = "Your BotJoinGulidLog Webhook",
    leaveGuildWebhook = "Your BotLeaveGulidLog Webhook",
    readyWebhook = "Your ReadyLog Webhook",
   ```

   ### How to Get These Values

   **TOKEN** (Required):
   - Go to [Discord Developer Portal](https://discord.com/developers/applications)
   - Create a new application or select existing one
   - Go to "Bot" section
   - Click "Reset Token" to get your bot token

   **CLIENT_ID** (Required):
   - In Discord Developer Portal, go to "General Information"
   - Copy the "Application ID"

   **OWNER_IDS** (Required):
   - Enable Developer Mode in Discord settings
   - Right-click your username and select "Copy ID"
   - Use comma-separated values for multiple owners

   **ERROR_WEBHOOK_URL** (Optional but Recommended):
   - Create a Discord webhook in your server
   - Go to Server Settings → Integrations → Webhooks
   - Create a new webhook and copy the URL

   ⚠️ **Security Note**: Never commit your `config.json` file to version control!

4. **Run the bot**

   ```bash
   # For normal operation
   npm start
   ```

## 📋 Dependencies

- **discord.js**: ^14.11.0 - Discord API wrapper
- **@discordjs/rest**: ^2.5.1 - REST API client
- **discord-api-types**: ^0.38.14 - TypeScript definitions
- **dotenv**: ^16.3.1 - Environment variable management
- **axios**: ^1.10.0 - HTTP client for webhooks
- **node-fetch**: ^3.3.2 - Fetch API for Node.js

## 🏗️ Architecture Overview

### Core Components

#### 1. **Main Bot Entry (`index.js`)**

- Initializes the Discord client with all intents and partials
- Loads all handlers in sequence
- Handles bot authentication

#### 2. **Command Handlers**

**Slash Commands (`Handlers/Commands.js`)**

- Automatically discovers and loads slash commands from the `Commands/Slash/` directory
- Registers commands with Discord's API
- Organizes commands by categories (folders)

**Prefix Commands (`Handlers/Prefix.js`)**

- Loads prefix commands from `Commands/Prefix/` directory
- Supports command aliases
- Uses `$` as the default prefix

#### 3. **Event Handler (`Handlers/Events.js`)**

- Dynamically loads all event files from the `Events/` directory
- Supports both `once` and `on` event listeners
- Automatically passes client instance to event handlers

#### 4. **Anti-Crash System (`Handlers/AntiCrash.js`)**

- Monitors for unhandled rejections and exceptions
- Sends error reports to Discord webhook
- Provides detailed error logging with timestamps
- Includes error type classification and status tracking

### Event System

#### **Ready Event (`Events/Ready.js`)**

- Sets bot presence and status
- Confirms successful bot login
- Configurable activity display

#### **Interaction Handler (`Events/interactionCreate.js`)**

- Processes slash command interactions
- Includes error handling with user-friendly messages
- Supports ephemeral responses

#### **Message Handler (`Events/messageCreate.js`)**

- Processes prefix commands
- Validates bot permissions
- Owner-only command support
- Automatic message cleanup for invalid usage


## 📝 Command Development

### Creating Slash Commands

Create new slash commands in `Commands/Slash/[category]/[command].js`:

```javascript
import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('commandname')
    .setDescription('Command description'),

  async execute(interaction) {
    // Command logic here
    await interaction.reply('Response');
  }
};
```

### Creating Prefix Commands

Create new prefix commands in `Commands/Prefix/[category]/[command].js`:

```javascript
export default {
  name: 'commandname',
  description: 'Command description',
  aliases: ['alias1', 'alias2'], // Optional
  execute(client, message, args) {
    // Command logic here
    message.reply('Response');
  }
};
```

## 🔒 Security Features

- **Environment Variables**: Sensitive data stored in `config.json` file
- **Permission Validation**: Bot checks for required permissions
- **Owner Verification**: Support for multiple bot owners
- **Error Isolation**: Comprehensive error handling prevents crashes

## 📊 Monitoring and Logging

- **Console Logging**: Color-coded system messages
- **Error Webhooks**: Real-time error reporting to Discord
- **Client Health Checks**: Periodic status monitoring

## 🛠️ Customization

### Configuration Options

- **Presence**: Modify bot status in `Ready.js`
- **Permissions**: Adjust required permissions in event handlers
- **Logging**: Customize log formats and colors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull

## 📦 Update v1.1.0

1. 😁 Detect and resolve all errors.
2. ✅ Added automatic MongoDB connection using `MONGO_URI`
3. 🛠️ Collections are created automatically if not found
4. 🚫 Improved error handling for missing or invalid DB connections

## 🔄 Updates

Stay updated with the latest Discord.js features and security patches by regularly updating dependencies:

```bash
npm update
```

## 🆘 Support

If you need help setting up or using the bot, feel free to reach out:

- 📩 **Communication via email**: [contact@mmostafa.com](mailto:contact@mmostafa.com)
- 📧 **Contact the developer**: [8yy2](https://discord.com/users/1205927004835291187)

---

**ViruBot Discord Handler** - A modern, scalable Discord bot framework built for the future.
