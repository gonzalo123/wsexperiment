<?php

include __DIR__ . '/../../vendor/autoload.php';

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

$app = new Application(['debug' => true]);
$app->register(new G\Io\EmitterServiceProvider());

$app->get('/request', function (Application $app, Request $request) {

    $params = [
        'item'     => $request->get('item'),
        'newValue' => strtoupper($request->get('newValue')),
        'oldValue' => $request->get('oldValue'),
    ];

    try {
        $app['io.emit']($params);
        $params['status'] = true;
    } catch (\Exception $e) {
        $params['status'] = false;
    }

    return $app->json($params);
});

$app->run();