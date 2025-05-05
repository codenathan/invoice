<?php

namespace App\Http\Controllers;

use App\Models\BusinessSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BusinessSettingController extends Controller
{
    public function index()
    {
        $businessSetting = BusinessSetting::first();

        if (!$businessSetting) {
            $businessSetting = new BusinessSetting();
            $businessSetting->save();
        }

        return Inertia::render('business-setting/edit', ['businessSetting' => $businessSetting]);
    }

    public function update(Request $request)
    {
        dd($request->all(), $request->hasFile('logo'), $request->file('logo'));
        $data = $request->validate([
            'name' => 'required',
            'address_line_1' => 'string|nullable',
            'address_line_2' => 'string|nullable',
            'city' => 'string|nullable',
            'state' => 'string|nullable',
            'postal_code' => 'string|nullable',
            'invoice_footer' => 'string|nullable',
            'logo' => 'image|nullable'
        ]);


        if ($request->hasFile('logo')) {
            $data['logo']  = Storage::disk('public')->put('logo', $request->file('logo'));
        }

        $businessSetting = BusinessSetting::first();

        $businessSetting->update($data);

        return to_route('business-setting.index')
                ->with('success', 'Business Setting updated successfully.');
    }


}
