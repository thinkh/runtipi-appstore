# OpenCloud

[OpenCloud](https://opencloud.eu) is a modern, self-hosted file sync and share platform. It started as a fork of ownCloud Infinite Scale and is written in Go. Files are stored directly on disk without a database. It includes a built-in identity provider, WebDAV, sharing, spaces, and desktop and mobile clients.

## How to reach it

OpenCloud signs users in with OpenID Connect, which requires **HTTPS** on the exact URL OpenCloud was started with. The app picks the right setup automatically:

- **Default (no domain):** OpenCloud serves HTTPS itself with a self-signed certificate at `https://<runtipi-ip>:9200`. Note the `https://`. Accept the browser's certificate warning once. The *Open* button in Runtipi links to `http://`, so change it to `https://` by hand.
- **Local network domain:** enable *Expose on local network* and leave *open port* unchecked. OpenCloud is served at `https://<subdomain>.tipi.local` through Traefik.
- **Public domain:** enable *Expose app* with a domain that points to your Runtipi host. Traefik gets a Let's Encrypt certificate, and you can turn **Skip TLS certificate checks** off.

Use only the URL that matches the mode you picked. Browser logins on other URLs fail.

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
