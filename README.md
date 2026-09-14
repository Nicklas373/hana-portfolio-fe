<p align="center">
  <img src="public/logo.svg" width="300" />
</p>

# HANA Portfolio [Frontend Services]

A modern and responsive my personal portfolio built with Next.js, TypeScript, HeroUI and Tailwind CSS.

[![HANA Portfolio [PROD]](https://github.com/Nicklas373/hana-portfolio-fe/actions/workflows/docker-prod.yml/badge.svg)](https://github.com/Nicklas373/hana-portfolio-fe/actions/workflows/docker-prod.yml)
[![HANA Portfolio [SIT]](https://github.com/Nicklas373/hana-portfolio-fe/actions/workflows/docker-sit.yml/badge.svg)](https://github.com/Nicklas373/hana-portfolio-fe/actions/workflows/docker-sit.yml)

### Live Preview -> [HANA Portfolio](https://portfolio.hana-ci.com/dickyherlambang)

## Features

- API-driven content
- Contact form integration
- Dark themed interface
- Dynamic experience and projects section
- Responsive modern UI
- Smooth animations and transitions

## Tech Stack

- Next.js
- Tailwind CSS
- HeroUI / NextUI
- TypeScript
- Jest
- REST API
- PostgreSQL
- Cloudflare Turnstile

## How to run (Docker)

- Clone the repository:

-- Frontend package (Next JS)

```bash
git clone https://github.com/Nicklas373/hana-portfolio.git hana-portfolio-fe
```

-- Backend package (Express JS)

```bash
git clone https://github.com/Nicklas373/hana-portfolio-be.git hana-portfolio-be
```

- Move into the project directory:

-- Frontend Backend

```bash
cd hana-portfolio-fe
```

-- Backend Backend

```bash
cd hana-portfolio-be
```

- Initiate docker compose (Make sure on root directory from this project):
  -- Applicable for frontend and backend

- Set credentials
  (On Linux)

```bash
  echo "mySecretApi" | sudo docker secret create hana_portfolio_api_key -
  echo "MySecurePassword" | sudo docker secret create hana_portfolio_db_password -
  echo "MySecurePassword" | sudo docker secret create hana_portfolio_redis_password -
  echo "1x0000000000000000000000000000000AA" | sudo docker secret create hana_portfolio_turnstile_secret -
```

(On Windows)

```bash
  # Initiate from powershell
  [System.IO.File]::WriteAllBytes("$env:TEMP\secretApi",[System.Text.Encoding]::UTF8.GetBytes("mySecretApi"))
  [System.IO.File]::WriteAllBytes("$env:TEMP\redis-password",[System.Text.Encoding]::UTF8.GetBytes("MySecurePassword"))
  [System.IO.File]::WriteAllBytes("$env:TEMP\db-password",[System.Text.Encoding]::UTF8.GetBytes("MySecurePassword"))
  [System.IO.File]::WriteAllBytes("$env:TEMP\turnstile-password",[System.Text.Encoding]::UTF8.GetBytes("1x0000000000000000000000000000000AA"))

  # Import secret to docker
  cmd /c "set /p =mySecretApi<nul" | docker secret create hana_portfolio_api_key -
  cmd /c "set /p =MySecurePassword<nul" | docker secret create hana_portfolio_db_password -
  cmd /c "set /p =MySecurePassword<nul" | docker secret create hana_portfolio_redis_password -
  cmd /c "set /p =1x0000000000000000000000000000000AA<nul" | docker secret create hana_portfolio_turnstile_secret -
```

With docker compose

```bash
  docker compose up -d
```

With docker swarm

```bash
  docker swarm init
  docker network create --driver=overlay --attachable hana-network
  docker stack deploy -c docker-swarm.yaml hana_portfolio
```

- Make sure to create Cloudflare Turnstile Widget first -> Look here for [documentation](https://developers.cloudflare.com/turnstile/)
- Check on http://portfolio-sit.localhost

## Project Structure

```bash
src/
 ├── app/
 ├── components/
 ├── hook/
 ├── lib/
 └── variables/
```

## Deployment

This project can be deployed using:

- Vercel
- Docker
- Nginx Reverse Proxy
- Traefik

## Contact

Feel free to connect with me:

- [LinkedIn](https://linkedin.com/in/dicky-herlambang-b8247813a)
- [GitHub](https://github.com/Nicklas373)
- [Email](mailto:herlambangdicky5@gmail.com)

---

# HANA-CI Build Project 2016 - 2026
