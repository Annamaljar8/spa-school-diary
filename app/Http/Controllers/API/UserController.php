<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Language;
use App\Models\Role;
use App\Models\Profile;
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
        //$user = User::find(Auth::user()->id);
        //$language = Language::find($user->language_id);
        \App::setLocale('en');//$language->lang);
    }
    
    public function users(Request $request)
    {
        $user = Auth::user();
        $users = User::where('maker_id', $user->id)->get();
        foreach ($users as $userAr) {
            $profile = $userAr->profile();
            $success['users'][] = (object) array(
                'id' => $userAr->id,
                'name' => $userAr->name,
                'active' => $userAr->active ? Lang::get('app.active') : Lang::get('app.not_active'),//$this->toBool($userAr->active),
                'avatar' => ($userAr->avatar != '') ? $userAr->avatar : 'data:image/jpeg;base64,'.env('USER_AVATAR', ''),
                'motherEmail' => $profile?$profile->motherEmail:'',
                'fatherEmail' => $profile?$profile->fatherEmail:'',
            );
        }

        return $this->sendResponse($success, 'Users get successfully.');
    }
    
    public function user(User $user, Request $request)
    {
        return $this->sendResponse($this->getUserProfile($user), 'User get successfully.');
    }
    
    public function updateUser(User $user, Request $request)
    {
        $profile = Profile::where('user_id',$user->id)->first();
        if(!$profile){
            $profile = new Profile();
            $profile->user_id = $user->id;
        }
        $profile->motherName = $request->motherName;
        $profile->fatherName = $request->fatherName;
        $profile->motherPhone = $request->motherPhone;
        $profile->fatherPhone = $request->fatherPhone;
        $profile->motherEmail = $request->motherEmail;
        $profile->fatherEmail = $request->fatherEmail;
        $profile->address = $request->address;
        $profile->description = $request->description;
        $profile->save();
        //$user->profile()->updateOrCreate($data);
        return $this->sendResponse($this->getUserProfile($user), 'User get successfully.');
    }
    
    public function deleteUser(User $user)
    {
        $user->delete();//!!!
        return $this->sendResponse(['success' => true], 'User get successfully.');
    }


    private function getUserProfile($user)
    {
        $profile = $user->profile();
        $success = (object) array(
            'id' => $user->id,
            'name' => $user->name,
            'motherName' => $profile?$profile->motherName:'',
            'fatherName' => $profile?$profile->fatherName:'',
            'motherPhone' => $profile?$profile->motherPhone:'',
            'fatherPhone' => $profile?$profile->fatherPhone:'',
            'motherEmail' => $profile?$profile->motherEmail:'',
            'fatherEmail' => $profile?$profile->fatherEmail:'',
            'address' => $profile?$profile->address:'',
            'description' => $profile?$profile->description:''
        );
        return $success;
    }
}
