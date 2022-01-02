<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Language;
use App\Models\Role;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\Lang;

class UserController extends BaseController
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $user = Auth::user();
        \App::setLocale($user->language()->lang);
    }
    
    public function users(Request $request)
    {
        $user = Auth::user();
        $users = User::where('maker_id', $user->id)->get();
        foreach ($users as $userAr) {
            $success['users'][] = (object) array(
                'id' => $userAr->id,
                'name' => $userAr->name,
                'active' => $userAr->active ? Lang::get('app.active') : Lang::get('app.not_active'),//$this->toBool($userAr->active),
                'avatar' => ($userAr->avatar != '') ? $userAr->avatar : 'data:image/jpeg;base64,'.env('USER_AVATAR', ''),
            );
        }

        return $this->sendResponse($success, 'Users get successfully.');
    }
    
    public function user(Request $request)
    {
        
    }
}
