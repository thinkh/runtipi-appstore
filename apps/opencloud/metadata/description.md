# OpenCloud

[OpenCloud](https://opencloud.eu) is a modern, self-hosted file sync and share platform. It started as a fork of ownCloud Infinite Scale and is written in Go. Files are stored directly on disk without a database. It includes a built-in identity provider, WebDAV, sharing, spaces, and desktop and mobile clients.

## Before you install

OpenCloud signs users in with OpenID Connect. The browser only allows that over **HTTPS**, and only on the exact URL OpenCloud was configured with. Plain `http://<ip>:9200` does **not** work. Pick one of these options in the install dialog:

- **Local network:** enable *Expose on local network* and leave *open port* unchecked. OpenCloud is then served at `https://opencloud-<store>.tipi.local` (or your custom local subdomain) with a self-signed certificate. Keep **Skip TLS certificate checks** enabled.
- **Internet:** enable *Expose app* with a domain that points to your Runtipi host. Traefik gets a Let's Encrypt certificate. You can turn **Skip TLS certificate checks** off.

The URL is baked into OpenCloud's configuration on the first start. If you change the domain later, you need to reinstall the app (or edit `opencloud.yaml` by hand).

## First login

- **User:** `admin`
- **Password:** the admin password you entered during installation

The admin password is only read on the very first start. Change it later in OpenCloud itself.

## Raspberry Pi

This app follows the [OpenCloud Raspberry Pi guide](https://docs.opencloud.eu/docs/admin/getting-started/other/raspberry-pi/): you need a Raspberry Pi 4 or 5 with at least 4 GB RAM and a **64-bit** OS. For storage, prefer an SSD or external disk over the SD card.

## Data

- `app-data/.../opencloud/data/config`: `opencloud.yaml` with generated secrets. Back this up together with the data.
- `app-data/.../opencloud/data/data`: users, files and search index.

Both directories are owned by UID/GID `1000`.
