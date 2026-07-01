<?php
namespace App\Services;

use Rakit\Validation\Validator;

class ValidationService {
    
    /**
     * Validate data against rules
     * @param array $data
     * @param array $rules
     * @return array|null Returns array of errors if validation fails, null if passes
     */
    public static function validate(array $data, array $rules): ?array {
        if (!class_exists(Validator::class)) {
            // Fallback if composer install wasn't run
            return self::basicFallbackValidation($data, $rules);
        }

        $validator = new Validator();
        $validation = $validator->make($data, $rules);
        $validation->validate();

        if ($validation->fails()) {
            return $validation->errors()->toArray();
        }

        return null;
    }

    /**
     * Fallback just in case Rakit is not installed yet
     */
    private static function basicFallbackValidation(array $data, array $rules): ?array {
        $errors = [];
        foreach ($rules as $field => $ruleStr) {
            $ruleList = explode('|', $ruleStr);
            if (in_array('required', $ruleList) && empty($data[$field])) {
                $errors[$field] = ucfirst($field) . " is required.";
            }
            if (in_array('email', $ruleList) && !empty($data[$field]) && !filter_var($data[$field], FILTER_VALIDATE_EMAIL)) {
                $errors[$field] = ucfirst($field) . " must be a valid email address.";
            }
        }
        return empty($errors) ? null : $errors;
    }
}
