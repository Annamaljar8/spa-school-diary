<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LanguagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('languages')->insert([
            [
                'language' => 'English',
                'lang' => 'en',
                'famaly' => 'Indo-European',
                'ico' => 'cif-gb',
                'active' => 1
            ],
            [
                'language' => 'Ukrainian',
                'lang' => 'ua',
                'famaly' => 'Indo-European',
                'ico' => 'cif-ua',
                'active' => 1
            ],
            [
                'language' => 'Russian',
                'lang' => 'ru',
                'famaly' => 'Indo-European',
                'ico' => 'cif-ru',
                'active' => 1
            ]
        ]);
    }
}
