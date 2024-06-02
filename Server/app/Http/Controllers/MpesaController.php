<?php

namespace App\Http\Controllers;

use App\Models\Mpesa;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Throwable;

class MpesaController extends Controller
{
    public function getAccessToken()
    {
        $consumerKey = 'LhGH4PCPimpXc66pjZerRijeJPfHx2IesBx3G7JucuyArrSJ'; 
        $consumerSecret = 'R88cVacJMJ98Oh9P09Dz3Ak5aBRAOO6GqNSurqGsMiVNmw2cwRGRYz0Ww7Ox1KzO';
        $url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';

        $response = Http::withBasicAuth($consumerKey, $consumerSecret)->get($url);

        return $response['access_token'];
    }
    public function stkPush(Request $request)
    {
        $accessToken = $this->getAccessToken();
        $url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
        $passKey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';
        $BusinessShortCode = '174379';
        $timeStamp = Carbon::now()->format('YmdHis');
        $password = base64_encode($BusinessShortCode.$passKey.$timeStamp);
        $TransactionType = 'CustomerPayBillOnline';
        $Amount = $request->amount;
        $PartyA = $request->phoneNumber;
        $PartyB = '174379';
        $PhoneNumber = $request->phoneNumber;
        $CallbackUrl = "https://hot-rivers-roll.loca.lt/api/mpesa/stkcallback";
        $AcountReference = 'Baby Store';
        $TransactionDesc = 'payment for goods';


        try{
            $response = Http::withToken($accessToken)->post($url, [
                'BusinessShortCode' => $BusinessShortCode,
                'Password' => $password,
                'Timestamp' => $timeStamp,
                'TransactionType' => $TransactionType,
                'Amount' => $Amount,
                'PartyA' => $PartyA,
                'PartyB' => $PartyB,
                'PhoneNumber' => $PhoneNumber,
                'CallBackURL' => $CallbackUrl,
                'AccountReference' =>$AcountReference,
                'TransactionDesc' => $TransactionDesc
            ]);
        }catch(Throwable $e){
            return $e->getMessage();
        }

        //return response
        $res = json_decode($response);

        $responseCode = $res->ResponseCode;



        if ($responseCode == 0){
            $MerchantRequestID = $res->MerchantRequestID;
            $CheckoutRequestID = $res->CheckoutRequestID;
            $CustomerMessage = $res->CustomerMessage;


            //save response to database

            $payment = new Mpesa();

            $payment->phone = $PhoneNumber;
            $payment->amount = $Amount;
            $payment->reference = $AcountReference;
            $payment->description = $TransactionDesc;
            $payment->MerchantRequestID = $MerchantRequestID;
            $payment->checkoutRequestID = $CheckoutRequestID;
            $payment->status = 'Requested';

            $payment->save();

            return $CheckoutRequestID;
        }
    }
    
    

    public function stkCallback()
    {
        //Log::alert("here");
        
        $data = file_get_contents('php://input');


        $response = json_decode($data);

        $ResultCode = $response->Body->stkCallback->ResultCode;

        if($ResultCode == 0){
            $MerchantRequestID = $response->Body->stkCallback->MerchantRequestID;
            $CheckoutRequestID = $response->Body->stkCallback->CheckoutRequestID;
            $ResultDesc = $response->Body->stkCallback->ResultDesc;
            $Amount = $response->Body->stkCallback->CallbackMetadata->Item[0]->Value;
            $MpesaReceiptNumber = $response->Body->stkCallback->CallbackMetadata->Item[1]->Value;
            //$Balance = $request->Body->stkCallback->CallbackMetadata->Item[2]->value;
            $TransactionDate = $response->Body->stkCallback->CallbackMetadata->Item[3]->Value;
            $PhoneNumber = $response->Body->stkCallback->CallbackMetadata->Item[3]->Value;

            $payment = Mpesa::where('checkoutRequestID', $CheckoutRequestID)->first();

            $payment->status = 'Paid';
            $payment->TransactionDate = $TransactionDate;
            $payment->MpesaReceiptNumber = $MpesaReceiptNumber;
            $payment->ResultDesc = $ResultDesc;

            $payment->save();

            return response("Paid");
        }else{

            $CheckoutRequestID = $response->Body->stkCallback->CheckoutRequestID;
            $ResultDesc = $response->Body->stkCallback->ResultDesc;
            $payment = Mpesa::where('checkoutRequestID', $CheckoutRequestID)->first();

            $payment->ResultDesc = $ResultDesc;
            $payment->status = 'Failed';

            $payment->save();

            return response("failed");
        }

    }

    public function getPaymentStatus($checkoutRequestID)
    {

        $payment = Mpesa::where('checkoutRequestID', $checkoutRequestID)->first();

        if($payment)
        {
            return response()->json([
                'status' => $payment->status,
                'TransactionDate' => $payment->TransactionDate,
                'MpesaReceiptNumber' => $payment->MpesaReceiptNumber
            ]);
        }
        else
        {
            return response()->json([
                'status' => 'Not paid'
            ], 404);
        }
    }
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Mpesa $mpesa)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Mpesa $mpesa)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Mpesa $mpesa)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Mpesa $mpesa)
    {
        //
    }
}
