<?php

namespace G\Io;

use Pimple\Container;
use Pimple\ServiceProviderInterface;

class EmitterServiceProvider implements ServiceProviderInterface
{
    public function register(Container $app)
    {
        $app['io.emit'] = $app->protect(function ($params) use ($app) {
            $s = curl_init();
            curl_setopt($s, CURLOPT_URL, "http://localhost:3001/emit/?" . http_build_query($params));
            curl_setopt($s, CURLOPT_RETURNTRANSFER, true);
            $content = curl_exec($s);
            $status  = curl_getinfo($s, CURLINFO_HTTP_CODE);
            curl_close($s);

            if ($status != 200) throw new \Exception();

            return $content;
        });
    }
}