<?php

namespace App\Exceptions;

use Exception;

class UserStatusNotFoundException extends Exception
{
    /**
     * UserStatusNotFoundException constructor.
     * @param string $message
     */
    public function __construct()
    {
        $message = __('exception.user_status_not_found');
        parent::__construct($message);
    }
}
