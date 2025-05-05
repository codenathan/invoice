<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $name
 * @property string $address_line_1
 * @property string $address_line_2
 * @property string $city
 * @property string $state
 * @property string $postal_code
 * @property string $invoice_footer
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 */
class BusinessSetting extends Model
{
    //
}
