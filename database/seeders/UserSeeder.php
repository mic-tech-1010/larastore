<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Enums\RolesEnum;
use App\Enums\VendorStatusEnum;
use App\Models\Vendor;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'User',
            'email' => 'user@example.com'
        ])->assignRole(RolesEnum::User->value);

        $vendorUser = User::factory()->create([
            'name' => 'Vendor',
            'email' => 'vendor@example.com'
        ]);
        $vendorUser->assignRole(RolesEnum::Vendor->value);
        Vendor::factory()->create([
            'user_id' => $vendorUser->id,
            'status' => VendorStatusEnum::Approved,
            'store_name' => 'Vendor store',
            'store_address' => fake()->address()
        ]);

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com'
        ])->assignRole(RolesEnum::Admin->value);
    }
}
