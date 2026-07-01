<?php
namespace App\Core;

class Router {
    private array $routes = [];

    public function get(string $path, callable|array $handler): void {
        $this->addRoute('GET', $path, $handler);
    }

    public function post(string $path, callable|array $handler): void {
        $this->addRoute('POST', $path, $handler);
    }

    public function put(string $path, callable|array $handler): void {
        $this->addRoute('PUT', $path, $handler);
    }

    public function delete(string $path, callable|array $handler): void {
        $this->addRoute('DELETE', $path, $handler);
    }

    private function addRoute(string $method, string $path, callable|array $handler): void {
        // Convert path parameters like {id} into regex groups
        $pattern = preg_replace('/\{([a-zA-Z0-9_]+)\}/', '(?P<\1>[a-zA-Z0-9_-]+)', $path);
        $pattern = "#^" . $pattern . "$#";
        $this->routes[] = [
            'method' => $method,
            'pattern' => $pattern,
            'handler' => $handler
        ];
    }

    public function dispatch(string $method, string $uri): void {
        $uri = parse_url($uri, PHP_URL_PATH);
        // Remove trailing slash if it's not the root
        if ($uri !== '/' && rtrim($uri, '/') !== $uri) {
            $uri = rtrim($uri, '/');
        }

        foreach ($this->routes as $route) {
            if ($route['method'] === $method && preg_match($route['pattern'], $uri, $matches)) {
                $params = array_filter($matches, 'is_string', ARRAY_FILTER_USE_KEY);
                
                if (is_array($route['handler']) && count($route['handler']) === 2) {
                    $controllerName = $route['handler'][0];
                    $action = $route['handler'][1];
                    $controller = new $controllerName();
                    call_user_func_array([$controller, $action], $params);
                } else {
                    call_user_func_array($route['handler'], $params);
                }
                return;
            }
        }

        http_response_code(404);
        echo json_encode(['status' => 'error', 'message' => 'Not Found']);
    }
}
