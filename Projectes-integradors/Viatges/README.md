# Viatges

Integrants: Hary Alexandru Potlog Potlog, Unai Escobar Aguilar i Xavier Ruiz Boix

## Descripció del projecte

Aquest projecte és una pàgina de viatges creada a la classe DAW2 - 25/26. Busca crear una plataforma d'experiències per usuaris.

## Instal·lació del projecte

Clonar el repositori:

```bash
git clone https://github.com/Alex-Potlog/Viatges.git
cd ./Viatges/Viatges
```

Instal·lar dependències:

```bash
composer install
npm install
php artisan key:generate
```

Copiar .env:

```bash
cp .env.example .env
```

Alterar credencials a .env:

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=viatges
DB_USERNAME=tad # Usuari alterat a producció, només per testing local
DB_PASSWORD='Tad1234!'

CLOUDINARY_URL=cloudinary://public_key:private_key@cloud_name

VITE_GOOGLE_MAPS_API_KEY=
VITE_GOOGLE_MAP_ID=DEMO_MAP_ID
VITE_ENABLE_MAPS=false

# La clau NO ha de ser restringida
GOOGLE_PLACES_API_KEY=
```

Córrer:

```bash
php artisan migrate:fresh --seed
composer run dev
```
