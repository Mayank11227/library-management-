<?php
namespace App\Services;

use Monolog\Logger;
use Monolog\Handler\StreamHandler;

class LoggerService {
    
    private static $loggers = [];

    /**
     * Get a logger instance by channel name
     */
    public static function getLogger(string $channel = 'app'): Logger {
        if (!isset(self::$loggers[$channel])) {
            $logger = new Logger($channel);
            $logDir = __DIR__ . '/../../logs/';
            
            if (!is_dir($logDir)) {
                mkdir($logDir, 0777, true);
            }
            
            if (class_exists(StreamHandler::class)) {
                $logger->pushHandler(new StreamHandler($logDir . $channel . '.log', Logger::DEBUG));
            }
            // If Monolog isn't installed yet, it won't have a handler, but it won't crash if it's just logging arrays?
            // Actually, if class Logger doesn't exist, this will crash.
            
            self::$loggers[$channel] = $logger;
        }

        return self::$loggers[$channel];
    }

    /**
     * Safe log method that falls back to error_log if Monolog isn't installed
     */
    public static function log(string $level, string $message, array $context = [], string $channel = 'app') {
        if (class_exists(Logger::class)) {
            $logger = self::getLogger($channel);
            switch (strtolower($level)) {
                case 'info': $logger->info($message, $context); break;
                case 'error': $logger->error($message, $context); break;
                case 'warning': $logger->warning($message, $context); break;
                case 'debug': $logger->debug($message, $context); break;
                default: $logger->info($message, $context); break;
            }
        } else {
            // Fallback
            $logLine = strtoupper($level) . " [$channel]: " . $message . " " . json_encode($context);
            error_log($logLine);
        }
    }
}
