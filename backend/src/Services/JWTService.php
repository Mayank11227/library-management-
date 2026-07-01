<?php
namespace App\Services;

class JWTService {
    private static function base64UrlEncode($data) {
        $b64 = base64_encode($data);
        if ($b64 === false) {
            return false;
        }
        $url = strtr($b64, '+/', '-_');
        return rtrim($url, '=');
    }

    private static function base64UrlDecode($data) {
        $b64 = strtr($data, '-_', '+/');
        $padding = strlen($b64) % 4;
        if ($padding !== 0) {
            $b64 .= str_repeat('=', 4 - $padding);
        }
        return base64_decode($b64);
    }

    public static function encode(array $payload): string {
        $secret = getenv('JWT_SECRET') ?: 'default_secret_key_change_me';
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
        $payloadJson = json_encode($payload);

        $base64UrlHeader = self::base64UrlEncode($header);
        $base64UrlPayload = self::base64UrlEncode($payloadJson);

        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $secret, true);
        $base64UrlSignature = self::base64UrlEncode($signature);

        return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    }

    public static function decode(string $jwt): ?object {
        $secret = getenv('JWT_SECRET') ?: 'default_secret_key_change_me';
        $parts = explode('.', $jwt);
        
        if (count($parts) !== 3) {
            return null; // Invalid token format
        }

        list($header64, $payload64, $signature64) = $parts;

        $header = json_decode(self::base64UrlDecode($header64));
        $payload = json_decode(self::base64UrlDecode($payload64));

        if (!isset($header->alg) || $header->alg !== 'HS256') {
            return null; // Enforce secure algorithm
        }

        $validSignature = hash_hmac('sha256', $header64 . "." . $payload64, $secret, true);
        $validSignature64 = self::base64UrlEncode($validSignature);

        if (hash_equals($validSignature64, $signature64)) {
            // Check expiration if exists
            if (isset($payload->exp) && $payload->exp < time()) {
                return null; // Expired
            }
            return $payload;
        }

        return null; // Invalid signature
    }
}
