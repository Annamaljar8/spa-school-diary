<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Language;
use App\Models\Role;
use Illuminate\Support\Facades\Auth;
use Validator;

class UserController extends BaseController
{
    public function users(Request $request)
    {
        $user = Auth::user();
        $users = User::where('maker_id', $user->id)->get();
        foreach ($users as $userAr) {
            $success['users'][] = (object) array(
                'id' => $userAr->id,
                'name' => $userAr->name,
                'active' => $this->toBool($userAr->active),
                'avatar' => ($userAr->avatar != '') ? $userAr->avatar : 'data:image/jpeg;base64,'.env('USER_AVATAR', ''),
            );
        }

        return $this->sendResponse($success, 'Users get successfully.');
    }
}
