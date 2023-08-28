<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Homework;

class HomeworkListController extends BaseController
{
    public function homeworklist(User $user, Request $request) {
        $listWorks = Homework::where('user_id',$user->id)->where('active',1)->get();
        $success['homework'] = [];
        foreach ($listWorks as $listWork) {
            $success['homework'][] = (object) array(
                'id' => $listWork->id,
                'deadline' => $listWork->deadline,
                'description' => $listWork->description
            );
        }
        return $this->sendResponse($success, 'Homework List get successfully.');
    }
    
    public function create(User $user, Request $request)
    {
        $teacher = Auth::user();
        $homework = new Homework();
        $homework->deadline = $request->deadline;
        $homework->user_id = $user->id;
        $homework->teacher_id = $teacher->id;
        $homework->description = $request->description?$request->description:'';
        $homework->save();
        return $this->sendResponse(['success' => true, 'id' => $homework->id], 'Homework create successfully.');
    }
    
    public function update(Homework $homework, Request $request)
    {
        $user = Auth::user();
        if($homework->teacher_id == $user->id){
            $homework->active = 0;
            $homework->save();
        }
        return $this->sendResponse(['success' => true], 'Homework go to archive successfully.');
    }
    
    public function delete(Homework $homework, Request $request) 
    {
        $user = Auth::user();
        if($homework->teacher_id == $user->id){
            $homework->delete();
        }
        return $this->sendResponse(['success' => true], 'Homework event delete successfully.');
    }
}
