# 🤖 Wheatley

> Your friendly Antistatique assistant

## 👨‍💻 Contribute

### 📥 Install

```bash
$ cd path/to/wheatley
$ yarn
$ touch .env
```

And fill your `.env` with [Heroku Config Vars](https://dashboard.heroku.com/apps/wheatley/settings)

### ⚙️ Run (in parallel)

```bash
$ yarn dev
$ yarn serve
```

⚠️ To test on Slack you'll need to follow those steps:
1. open your port `3000` with [ngrok](https://ngrok.com/) `$ ngrok http 3000`
2. On Slack [settings](https://api.slack.com/apps/A012FHCU6MV/interactive-messages?), update *Request URL* and *Options Load URL* with you ngrok new host.
3. Update also all the [slash commands](https://api.slack.com/apps/A012FHCU6MV/slash-commands?) you want to test.


### 🚀 Deploy

Automated, from Github Master to Heroku 😉
