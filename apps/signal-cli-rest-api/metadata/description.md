# Signal REST API

A dockerized REST API wrapper around [signal-cli](https://github.com/AsamK/signal-cli) that lets you interact with the [Signal](https://signal.org) messenger programmatically.

## Features

- Register or link a Signal number
- Send messages (with attachments) to individual recipients or groups
- Receive messages
- Create, list, and remove groups
- Manage contacts and profiles
- List, serve, and delete attachments
- Update your Signal profile

See the full [API documentation](https://bbernhard.github.io/signal-cli-rest-api/) for all available endpoints.

## Usage

After starting the container, you need to register or link a Signal number:

### Link as secondary device (recommended)

Open `http://<your-server>:<port>/v1/qrcodelink?device_name=signal-api` in your browser, then in the Signal app on your phone go to **Settings → Linked devices** and scan the QR code.

### Send a test message

```bash
curl -X POST -H "Content-Type: application/json" \
  'http://<your-server>:<port>/v2/send' \
  -d '{"message": "Hello from Signal REST API!", "number": "+1234567890", "recipients": ["+0987654321"]}'
```

## Execution Modes

The `MODE` environment variable controls how signal-cli is invoked:

| Mode | Speed | Memory |
|------|-------|--------|
| `normal` | ✔️ | normal |
| `native` | ✔️✔️ | normal |
| `json-rpc` | ✔️✔️✔️ | increased |
| `json-rpc-native` | ✔️✔️✔️✔️ | normal |

The default mode is `native`, which provides a good balance of speed and memory usage.

## Data Persistence

Signal account data is stored in the `signal-cli` directory inside the app data folder, so your registration is preserved across container restarts and updates.
