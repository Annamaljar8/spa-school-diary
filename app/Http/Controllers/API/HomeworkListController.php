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
        $listWorks = Homework::where('user_id',$user->id)->get();
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
        return $this->sendResponse(['success' => true], 'Homework create successfully.');
    }
}
