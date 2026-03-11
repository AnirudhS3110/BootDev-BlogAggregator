# Gator - A Blog Aggregator CLI

A command-line blog aggregator written in TypeScript that allows you to follow RSS feeds, aggregate their content, and browse posts from multiple sources in one place.

## Features

- **User Management**: Register and login to manage your own feed subscriptions
- **RSS Feed Aggregation**: Add and manage RSS feeds from various sources
- **Feed Following**: Follow/unfollow feeds you're interested in
- **Post Browsing**: Browse recent posts from feeds you follow
- **Scheduled Feed Fetching**: Automatically fetch feeds at specified intervals

## Prerequisites

Before you get started, make sure you have the following installed:

- **Node.js** (v16 or higher) and **npm**
- **PostgreSQL** database (running and accessible)
- **Git** (for version control)

## Installation

1. **Clone the repository** (if applicable):
    md
   ```bash
   git clone https://github.com/AnirudhS3110/BootDev-BlogAggregator.git
   cd blog-aggregator
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up the database**:
   First, create a PostgreSQL database for the application:
   ```bash
   createdb blog_aggregator
   ```

   Then run the migrations:
   ```bash
   npm run migrate
   ```

4. **Create configuration file**:
   Create a `.gatorconfig.json` file in your home directory (`~/.gatorconfig.json`):
   ```json
   {
     "db_url": "postgres://username:password@localhost:5432/blog_aggregator"
   }
   ```

   Replace `username`, `password`, and database name if different. This file stores:
   - `db_url`: Your PostgreSQL connection string
   - `currentUserName`: The currently logged-in user (auto-managed by the CLI)

## Running the Program

The CLI uses the format: `npm start <command> [arguments]`

### User Management Commands

**Register a new user**:
```bash
npm start register <username>
```
Creates a new user account and automatically logs you in.

**Login as an existing user**:
```bash
npm start login <username>
```
Switches to a different user account.

**List all users**:
```bash
npm start users
```
Displays all registered users, with the current user marked with an asterisk (*).

**Reset the database** (⚠️ Deletes all users):
```bash
npm start reset
```
Warning: This clears all users from the database. Use with caution.

### Feed Management Commands

**Add a new feed**:
```bash
npm start addfeed <feed-name> <feed-url>
```
Adds an RSS feed and automatically follows it.
```bash
npm start addfeed "TechNews" "https://example.com/feed.xml"
```

**List all available feeds**:
```bash
npm start feeds
```
Shows all feeds in the system with format: `username feedname url`

**Follow a feed**:
```bash
npm start follow <feed-url>
```
Subscribe to a feed so its posts appear in your browse results.
```bash
npm start follow "https://example.com/feed.xml"
```

**Unfollow a feed**:
```bash
npm start unfollow <feed-url>
```
Removes a feed from your subscriptions.

**List your following**:
```bash
npm start following
```
Shows all feeds you're currently subscribed to.

### Feed Aggregation & Browsing

**Aggregate feeds** (fetch new posts):
```bash
npm start agg <interval>
```
Runs a background process that fetches all feeds at the specified interval.

Interval format: `<number><unit>` where unit is:
- `ms` - milliseconds
- `s` - seconds
- `m` - minutes
- `h` - hours

Examples:
```bash
npm start agg 30s          # Fetch every 30 seconds
npm start agg 5m           # Fetch every 5 minutes
npm start agg 1h           # Fetch every hour
npm start agg 500ms        # Fetch every 500 milliseconds
```

Stop the aggregator anytime by pressing `Ctrl+C` in your terminal.

**Browse recent posts**:
```bash
npm start browse [limit]
```
Displays the most recent posts from all feeds you follow.

Examples:
```bash
npm start browse           # Show 2 most recent posts (default)
npm start browse 10        # Show 10 most recent posts
npm start browse 5         # Show 5 most recent posts
```

## Example Workflow

Here's a typical workflow for using the Blog Aggregator:

```bash
# 1. Register a new user
npm start register alice

# 2. Add some feeds
npm start addfeed "HackerNews" "https://news.ycombinator.com/rss"
npm start addfeed "TechCrunch" "https://techcrunch.com/feed/"

# 3. View feeds you're following
npm start following

# 4. Start aggregating feeds (fetch posts every 10 minutes)
npm start agg 10m

# 5. In another terminal, browse recent posts while aggregator runs
npm start browse 5

# 6. Switch to another user
npm start login bob

# 7. Bob adds his own feeds
npm start addfeed "Golang Blog" "https://go.dev/blog/feed.atom"

# 8. Unfollow a feed
npm start unfollow "https://example.com/feed.xml"

# 9. View all feeds in the system
npm start feeds
```

## Project Structure

```
blog-aggregator/
├── src/
│   ├── handler/              # Command handlers
│   │   ├── loginHandler.ts        # User login logic
│   │   ├── registerHandler.ts      # User registration
│   │   ├── usersHandler.ts         # List users
│   │   ├── resetHandler.ts         # Reset database
│   │   ├── aggHandler.ts           # Feed aggregation
│   │   ├── browseHandler.ts        # Browse posts
│   │   ├── feedHandlers/
│   │   │   ├── addfeedHandler.ts   # Add feeds
│   │   │   └── feedHandler.ts      # List feeds
│   │   └── followHandlers/
│   │       ├── followHandler.ts    # Follow a feed
│   │       ├── unfollowHandler.ts  # Unfollow a feed
│   │       └── followingHandler.ts # List followed feeds
│   ├── lib/
│   │   └── db/
│   │       ├── schema.ts           # Database schema
│   │       ├── queries/            # Database queries
│   │       └── migrations/         # Database migrations
│   ├── middleware/           # Authentication middleware
│   ├── index.ts              # CLI entry point
│   ├── config.ts             # Configuration management
│   ├── state.ts              # Application state
│   ├── types.d.ts            # TypeScript type definitions
│   └── utils.ts              # Utility functions
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── drizzle.config.ts         # Database ORM configuration
└── README.md                 # This file
```

## Database

This project uses **Drizzle ORM** with PostgreSQL. The database includes tables for:
- **users**: Registered user accounts
- **feeds**: RSS feed sources
- **feed_follows**: User-feed relationships (subscriptions)
- **posts**: Aggregated blog posts from feeds

### Database Commands

Generate new migrations after schema changes:
```bash
npm run generate
```

Apply pending migrations:
```bash
npm run migrate
```

## Technologies Used

- **TypeScript**: Type-safe JavaScript
- **Drizzle ORM**: Database management
- **PostgreSQL**: Data storage
- **fast-xml-parser**: RSS feed parsing
- **html-to-text**: Convert HTML content to plain text
- **tsx**: Run TypeScript directly without compilation

## Troubleshooting

**"Cannot find config file" error**:
- Ensure `~/.gatorconfig.json` exists with valid PostgreSQL connection string
- Check PostgreSQL database credentials

**"User not found" when logging in**:
- Register the user first with `npm start register <username>`

**"No recent posts" when browsing**:
- Make sure you've followed at least one feed with `npm start follow <url>`
- Run the aggregator to fetch posts: `npm start agg 5m`

**Database connection errors**:
- Verify PostgreSQL is running
- Check `db_url` in `~/.gatorconfig.json` is correct
- Ensure the database exists and migrations have been run

## Development

To modify the code:

1. Install TypeScript dependencies: `npm install --save-dev typescript @types/node tsx`
2. Run in development: `npm start <command>`
3. Generate database migrations: `npm run generate`

