<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $sharedPassword = 'Viatges1234!';

        $users = [
            [
                'name' => 'Anna Garcia',
                'email' => 'anna.garcia@example.com',
                'telefon' => '+34600111222',
                'is_admin' => true,
                'password' => $sharedPassword,
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Marc López',
                'email' => 'marc.lopez@example.com',
                'telefon' => '+34600333444',
                'is_admin' => false,
                'password' => $sharedPassword,
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Laura Martínez',
                'email' => 'laura.martinez@example.com',
                'telefon' => '+34600555666',
                'is_admin' => false,
                'password' => $sharedPassword,
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Jordi Puig',
                'email' => 'jordi.puig@example.com',
                'telefon' => '+34600777888',
                'is_admin' => false,
                'password' => $sharedPassword,
                'email_verified_at' => null,
            ],
            [
                'name' => 'Marta Soler',
                'email' => 'marta.soler@example.com',
                'telefon' => '+34600999000',
                'is_admin' => true,
                'password' => $sharedPassword,
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Pau Roca',
                'email' => 'pau.roca@example.com',
                'telefon' => '+34611000101',
                'is_admin' => false,
                'password' => $sharedPassword,
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Núria Vidal',
                'email' => 'nuria.vidal@example.com',
                'telefon' => '+34611000102',
                'is_admin' => false,
                'password' => $sharedPassword,
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Oriol Serra',
                'email' => 'oriol.serra@example.com',
                'telefon' => '+34611000103',
                'is_admin' => false,
                'password' => $sharedPassword,
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Clàudia Ferrer',
                'email' => 'claudia.ferrer@example.com',
                'telefon' => '+34611000104',
                'is_admin' => false,
                'password' => $sharedPassword,
                'email_verified_at' => now(),
            ],
            [
                'name' => 'David Castells',
                'email' => 'david.castells@example.com',
                'telefon' => '+34611000105',
                'is_admin' => false,
                'password' => $sharedPassword,
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Aina Casas',
                'email' => 'aina.casas@example.com',
                'telefon' => '+34611000106',
                'is_admin' => false,
                'password' => $sharedPassword,
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Roger Batlle',
                'email' => 'roger.batlle@example.com',
                'telefon' => '+34611000107',
                'is_admin' => false,
                'password' => $sharedPassword,
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Helena Pons',
                'email' => 'helena.pons@example.com',
                'telefon' => '+34611000108',
                'is_admin' => false,
                'password' => $sharedPassword,
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Sergi Miró',
                'email' => 'sergi.miro@example.com',
                'telefon' => '+34611000109',
                'is_admin' => false,
                'password' => $sharedPassword,
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Noa Prats',
                'email' => 'noa.prats@example.com',
                'telefon' => '+34611000110',
                'is_admin' => false,
                'password' => $sharedPassword,
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Xavi Costa',
                'email' => 'xavi.costa@example.com',
                'telefon' => '+34611000111',
                'is_admin' => false,
                'password' => $sharedPassword,
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Ivet Solé',
                'email' => 'ivet.sole@example.com',
                'telefon' => '+34611000112',
                'is_admin' => false,
                'password' => $sharedPassword,
                'email_verified_at' => null,
            ],
        ];

        foreach ($users as $userData) {
            User::updateOrCreate(
                ['email' => $userData['email']],
                $userData
            );
        }
    }
}
