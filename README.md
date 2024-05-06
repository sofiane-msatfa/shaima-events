# shaima-events

## Initialisation

Copier les variables d'environnement:
```
 cp apps/api/.env.example apps/api/.env
```

Lancer l'instance mongo sur docker:
```
docker compose up -d
```

Seed les données:
```
pnpm --filter api db:seed
```

Par défaut, on crée 2 utilisateurs et 500 events. 

On peut se connecter aux utilisateurs avec la combinaison:
- email: user-{NUMERO}@test.com (exemple: user-1@test.com)
- mot de passe: secretpassword

Lancer les services:
```
pnpm run dev
```