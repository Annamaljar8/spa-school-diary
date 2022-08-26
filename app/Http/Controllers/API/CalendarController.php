<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Calendar;
use Illuminate\Support\Facades\Auth;

class CalendarController extends BaseController
{
    public function events()
    {
        $user = Auth::user();
        $events = Calendar::where('user_id',$user->id)->get();
        $success['calendarEvents'] = [];
        foreach ($events as $event) {
            $success['calendarEvents'][] = (object) array(
                'id' => $event->id,
                'name' => $event->name,
                'color' => $event->color,
                'start' => $event->start,
                'end' => $event->end,
                'details' => $event->details,
                'timed' => $this->toBool($event->timed),
                'dialog' => $this->toBool($event->dialog)

            );
        }
        return $this->sendResponse($success, 'Calendar events get successfully.');
    }
    
    public function create(Request $request)
    {
        $user = Auth::user();
        $start = new \DateTime();
        $start->setTimezone(new \DateTimeZone(env('APP_TZ')));
        $start->setTimestamp($request->start / 1000);
        
        $end = new \DateTime();
        $end->setTimezone(new \DateTimeZone(env('APP_TZ')));
        $end->setTimestamp($request->end / 1000);
        //$end->modify( '+30 minute' );
        
        $event = new Calendar();
        $event->user_id = $user->id;
        $event->name = $request->name;
        $event->color = $request->color;
        $event->start = $start->format('Y-m-d H:i:s');
        $event->end = $end->format('Y-m-d H:i:s');
        $event->details = $request->details?$request->details:'';
        $event->timed = $request->timed;
        $event->dialog = $request->dialog?$request->dialog:0;
        $event->save();
        return $this->sendResponse(['success' => true], 'Calendar event create successfully.');
    }
    
    public function update(Calendar $event, Request $request)
    {
        $user = Auth::user();
        if($event->user_id == $user->id){
            $event->name = $request->name;
            $event->color = $request->color;
            $event->start = $request->start;
            $event->end = $request->end;
            $event->details = $request->details;
            $event->timed = $request->timed;
            $event->dialog = $request->dialog;
            $event->save();
        }
        return $this->sendResponse(['success' => true], 'Calendar event update successfully.');
    }
    
    public function delete(Calendar $event, Request $request) 
    {
        $user = Auth::user();
        if($event->user_id == $user->id){
            $event->delete();
        }
        return $this->sendResponse(['success' => true], 'Calendar event delete successfully.');
    }
}
