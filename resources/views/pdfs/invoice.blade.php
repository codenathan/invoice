<!doctype html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Invoice</title>
    <style>
        h4 {
            margin: 0;
        }
        .w-full {
            width: 100%;
        }
        .w-half {
            width: 50%;
        }
        .margin-top {
            margin-top: 1.25rem;
        }
        .footer {
            font-size: 0.875rem;
            padding: 1rem;
            background-color: rgb(241 245 249);
        }
        table {
            width: 100%;
            border-spacing: 0;
        }
        table.products {
            font-size: 0.875rem;
        }
        table.products tr {
            background-color: rgb(96 165 250);
        }
        table.products th {
            color: #ffffff;
            padding: 0.5rem;
        }
        table tr.items {
            background-color: rgb(241 245 249);
        }
        table tr.items td {
            padding: 0.5rem;
        }
        .total {
            text-align: right;
            margin-top: 1rem;
            font-size: 0.875rem;
        }

    </style>
</head>
<body>

<table class="w-full">
    <tr>

        <td class="w-half">
            @if($businessSetting->logo)
                <img src="{{ storage_path('app/public/'.$businessSetting->logo) }}" alt="{{ $businessSetting->name }}" width="100" />
            @endif
        </td>
        <td class="w-half">
            <h2>Invoice ID: {{ $invoice->id }}</h2>
        </td>
    </tr>
</table>

<div class="margin-top">
    <table class="w-full">
        <tr>
            <td class="w-half">
                <div><h4>To:</h4></div>
                <div>{{ $client->name }}</div>
                <div>{!! str_replace(',', ',<br>', $client->address) !!}</div>
            </td>
            <td class="w-half">
                <div><h4>From:</h4></div>
                <div>{{ $businessSetting->name }}</div>
                <div>{!! str_replace(',', ',<br>', $businessSetting->address) !!}</div>
            </td>
        </tr>
    </table>
</div>

<div class="margin-top">
    <table class="products">
        <tr>
            <th>Description</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Price</th>
        </tr>

            @foreach($invoice->items as $item)
            <tr class="items">
                <td>
                    {{ $item['description'] }}
                </td>
                <td align="center">
                    {{ $item['quantity'] }}
                </td>

                <td align="right">
                    {{ $item['rate'] }}
                </td>

                <td align="right">
                    {{ $item['amount'] }}
                </td>
            </tr>
            @endforeach

    </table>
</div>

<div class="total">
    Total: {{ number_format($invoice->total_amount,2) }}
</div>

<div class="invoice-note">
    {{ $businessSetting->invoice_footer }}
</div>

<div class="footer margin-top">
    <div>Thank you</div>
    <div>{{ $businessSetting->name }}</div>
</div>
</body>
</html>
