<?php

namespace App\Http\Controllers\API;
   
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\User;
use App\Models\Language;
use App\Models\Role;
use Illuminate\Support\Facades\Auth;
use Validator;
   
class RegisterController extends BaseController
{
    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'c_password' => 'required|same:password',
        ]);
   
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
   
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        if(Auth::user()->role()->name == 'admin'){
            $role = Role::where('name','teacher')->first();
            $input['role_id'] = $role->id;
        } else {
            if(Auth::user()->role()->name == 'teacher'){
                $role = Role::where('name','pupil')->first();
                $input['role_id'] = $role->id;
            } else {
                return $this->sendError('unauthorized action');
            }
        }
        $input['maker_id'] = Auth::user()->id;
        $user = User::create($input);
        //$success['token'] =  $user->createToken('SchoolDiary')->plainTextToken;
        //$success['name'] =  $user->name;
        $success = '';
   
        return $this->sendResponse($success, 'User register successfully.');
    }
   
    /**
     * Login api
     *
     * @return \Illuminate\Http\Response
     */

    public function login(Request $request)
    {
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){ 
            $user = Auth::user(); 
            $success['token'] =  $user->createToken('SchoolDiary')->plainTextToken; 
            $success['user'] =  [
                'type' => $user->role()->name,
                'name' => $user->name,
                'avatar' => ($user->avatar != '') ? $user->avatar : 'data:image/jpeg;base64,'.env('USER_AVATAR', ''),
                'language' => [
                    'preferlanguage' => $user->language()->language,
                    'lang' => $user->language()->lang,
                    'icon' => $user->language()->ico
                ]
            ];
            $languages = Language::all();
            foreach ($languages as $language) {
                $success['languages'][] = [
                    'name' => $language->language,
                    'lang' => $language->lang,
                    'icon' => $language->ico
                ];
            }
            
            return $this->sendResponse($success, 'User login successfully.');
        } 
        else{ 
            return $this->sendError('Unauthorised.', ['error'=>'Unauthorised']);
        } 
    }
    
    /**
     * Login api
     *
     * @return \Illuminate\Http\Response
     */

    public function logout(Request $request)
    {
        if($request->user()->tokens()->delete()){
            return $this->sendResponse('', 'User logout successfully.');
        } 
        else{ 
            return $this->sendError('Unauthorised.', ['error'=>'Unauthorised']);
        } 
    }
}
