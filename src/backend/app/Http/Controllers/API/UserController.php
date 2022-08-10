<?php

namespace App\Http\Controllers\API;

use Exception;
use Illuminate\Http\Request;
use App\Services\API\UserService;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Http\Resources\NewUserResource;
use App\Http\Requests\API\Users\BulkDeleteRequest;
use App\Http\Requests\API\Users\CreateUserRequest;
use App\Http\Requests\API\Users\SearchUserRequest;
use App\Http\Requests\API\Users\UpdateUserRequest;
use App\Http\Requests\API\Users\RegisterUserRequest;
use App\Http\Requests\API\Users\ActivateAccountRequest;

/**
 * @group User Management
 */
class UserController extends Controller
{
    /** @var App\Services\API\UserService */
    protected $userService;

    /**
     * UserController constructor.
     *
     * @param App\Services\API\UserService $userService
     */
    public function __construct(UserService $userService)
    {
        parent::__construct();

        $this->userService = $userService;

        // enable api middleware
        $this->middleware(['auth:api'], ['except' => ['register', 'activate']]);
    }

    /**
     * Retrieves the List of Users
     *
     * @param App\Http\Requests\SearchUserRequest $request
     * @return \Illuminate\Http\Response
     */
    public function index(SearchUserRequest $request)
    {
        $request->validated();

        try {
            $conditions = [
                'keyword' => $request->getKeyword(),
                'page' => $request->getPage(),
                'limit' => $request->getLimit(),
                'order' => $request->getOrder(),
                'sort' => $request->getSort(),
            ];

            $results = $this->userService->search($conditions);
            $this->response = array_merge($results, $this->response);
        } catch (Exception $e) { // @codeCoverageIgnoreStart
            $this->response = [
                'error' => $e->getMessage(),
                'code' => 500,
            ];
        } // @codeCoverageIgnoreEnd

        return response()->json($this->response, $this->response['code']);
    }

    /**
     * Creates a new user.
     * @authenticated
     *
     * @param App\Http\Requests\CreateUserRequest $request
     * @return \Illuminate\Http\Response
     */
    public function create(CreateUserRequest $request)
    {
        $request->validated();

        try {
            $formData = [
                'first_name' => $request->getFirstName(),
                'last_name' => $request->getLastName(),
                'email' => $request->getEmail(),
                'password' => null, // setup password on account activation
            ];
            $user = $this->userService->create($formData);
            $this->response['data'] = new UserResource($user);
        } catch (Exception $e) { // @codeCoverageIgnoreStart
            $this->response = [
                'error' => $e->getMessage(),
                'code' => 500,
            ];
        } // @codeCoverageIgnoreEnd

        return response()->json($this->response, $this->response['code']);
    }

    /**
     * Retrieves user information
     *
     * @param string $id
     * @return \Illuminate\Http\Response
     */
    public function read($id)
    {
        try {
            $user = $this->userService->findById((int) $id);
            $this->response['data'] = new UserResource($user);
        } catch (Exception $e) {
            $this->response = [
                'error' => $e->getMessage(),
                'code' => 500,
            ];
        }

        return response()->json($this->response, $this->response['code']);
    }

    /**
     * Updates user information
     *
     * @param App\Http\Requests\CreateUserRequest $request
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request)
    {
        $request->validated();

        try {
            $formData = [
                'id' => $request->getId(),
                'first_name' => $request->getFirstName(),
                'last_name' => $request->getLastName(),
                'email' => $request->getEmail(),
                'password' => $request->getPassword(),
                'avatar' => $request->getAvatar(),
            ];

            $user = $this->userService->update($formData);
            $this->response['data'] = new UserResource($user);
        } catch (Exception $e) { // @codeCoverageIgnoreStart
            $this->response = [
                'error' => $e->getMessage(),
                'code' => 500,
            ];
        } // @codeCoverageIgnoreEnd

        return response()->json($this->response, $this->response['code']);
    }

    /**
     * Delete user.
     *
     * @param string $id
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        try {
            // perform user delete
            $this->response['deleted'] = $this->userService->delete((int) $id);
        } catch (Exception $e) {
            $this->response = [
                'error' => $e->getMessage(),
                'code' => 500,
            ];
        }

        return response()->json($this->response, $this->response['code']);
    }

    /**
     * Bulk Delete users.
     *
     * @param App\Http\Requests\API\Users\BulkDeleteRequest $request
     * @return \Illuminate\Http\Response
     */
    public function bulkDelete(BulkDeleteRequest $request)
    {
        try {
            $ids = $request->getIds();
            // perform bulk user delete
            $this->response['deleted'] = $this->userService->bulkDelete($ids);
        } catch (Exception $e) { // @codeCoverageIgnoreStart
            $this->response = [
                'error' => $e->getMessage(),
                'code' => 500,
            ];
        } // @codeCoverageIgnoreEnd

        return response()->json($this->response, $this->response['code']);
    }

    /**
     * Creates user from Signup/Register Form.
     *
     * @param App\Http\Requests\API\Users\RegisterUserRequest $request
     * @return \Illuminate\Http\Response
     */
    public function register(RegisterUserRequest $request)
    {
        $request->validated();

        try {
            $formData = [
                'first_name' => $request->getFirstName(),
                'last_name' => $request->getLastName(),
                'email' => $request->getEmail(),
                'password' => null, // setup password on account activation
                'type' => 'signup',
            ];
            $user = $this->userService->create($formData);
            $this->response['data'] = new NewUserResource($user);
        } catch (Exception $e) { // @codeCoverageIgnoreStart
            $this->response = [
                'error' => $e->getMessage(),
                'code' => 500,
            ];
        } // @codeCoverageIgnoreEnd

        return response()->json($this->response, $this->response['code']);
    }

    /**
     *  Activate user account.
     *
     *  @param Illuminate\Http\Request $request
     *  @return \Illuminate\Http\Response
     */
    public function activate(ActivateAccountRequest $request)
    {
        try {
            $formData = [
                'token' => $request->getToken(),
                'password' => $request->getPassword(),
            ];

            $user = $this->userService->activate($formData);
            $this->response['data'] = new NewUserResource($user);
        } catch (Exception $e) {
            $this->response = [
                'error' => $e->getMessage(),
                'code' => 500,
            ];
        }

        return response()->json($this->response, $this->response['code']);
    }
}
