<?php

namespace App\Exceptions;

use Exception;

class RoleNotFoundException extends Exception
{
    /** @var string */
    public $errorType = 'role_not_found';

    /**
     * RoleNotFoundException constructor.
     * @param string $message
     */
    public function __construct()
    {
        $message = __('exception.role_not_found');
        parent::__construct($message);
    }
}
