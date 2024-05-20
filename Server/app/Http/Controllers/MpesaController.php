<?php

namespace App\Http\Controllers;

use App\Models\Mpesa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Exception;

class MpesaController extends Controller
{
    public function getAccessToken()
    {
        try
        {
            $consumerKey = env('MPESA_CONSUMER_KEY');
            $consumerSecret = env('MPESA_CONSUMER_SECRET');

            $authUrl = env('MPESA_AUTH_ENDPOINT');

            $encodedCredentials = base64_encode($consumerKey.':'.$consumerSecret);

            $headers = [
                'Authorization' => 'Basic '. $encodedCredentials,
                'Content-Type' => 'application/json'
            ];

            $response = Http::withHeaders($headers)->get($authUrl);

            if ($response->failed())
            {
                return response()->json([
                    'error' => 'Failed to get access token: ' . $response->body()
                ]);
            }

            $responseData = $response->json();

            if (isset($responseData['access_token'])) {

                return response()->json([
                    'access_token' => $responseData['access_token']
                ]);

            } else {
                return response()->json([
                    'error' => 'Failed to get access token:' . $responseData['error_description']
                ]);
            }
        } catch (Exception $error) {

            return response()->json([
                'error' => $error->getMessage()
            ], 500);
        }
    }
    public function stkPush(Request $request)
    {
        try {
            $accessTokenResponse = $this->getAccessToken();

            if ($accessTokenResponse->getStatusCode() === 200)
            {
                $accessToken = $accessTokenResponse->getData()->access_token;

                $timestamp = now()->format('YmdHis');

                $shortCode = env('MPESA_SHORT_CODE');
                $passkey = env('MPESA_PASSKEY');

                $stkUrl = env('MPESA_STK_ENDPOINT');

                $mpesaDescription = env('MPESA_DESCRIPTION');
                $accountReference = env('MPESA_ACCOUNT_REFERENCE');

                $stkPassword = base64_encode($shortCode.$passkey.$timestamp);

                $headers = [
                    'Authorization' => 'Bearer '.$accessToken,
                    'Content-Type' => 'application/json'
                ];

                $requestBody = [
                    'BusinessShortCode' => $shortCode,
                    'Password' => $stkPassword,
                    'Timestamp' => $timestamp,
                    'TransactionType' => 'CustomerPayBillOnline',
                    'Amount' => $request->amount,
                    'PartyA' => $request->phone_number,
                    'PartyB' => $shortCode,
                    'PhoneNumber' => $request->phone_number,
                    'CallBackURL' => env('MPESA_CALLBACK_URL'),
                    'AccountReference' => $accountReference,
                    'TransactionDesc' => $mpesaDescription
                ];

                $response = Http::withHeaders($headers)->post($stkUrl, $requestBody);

                return $response;
            } else {
                return response()->json([
                    'error' => 'Failed to get access token'
                ]);
            }
        } catch (Exception $error) {
            return response()->json([
                'error' => $error->getMessage()
            ], 500);
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
