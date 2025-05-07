# Laravel 12 Invoice App

- This is a project demonstrating skills in Laravel/Inertia/React/Typescript /Tailwind

## Models
- Client 
- Invoice
- Invoice Item
- Payment

## Functionality
- Ability to create clients
- Ability to create invoices for clients
- Ability to add invoice items to invoices
- Ability to add payments to invoices
- Ability to mark invoices with different status - draft / sent / paid / cancelled

## Get Started
Standard Laravel Installation, you will need to copy `.env.example` to `.env` and setup your db however you like

```
composer install
npm run build
php artisan migrate:fresh --seed 
```
