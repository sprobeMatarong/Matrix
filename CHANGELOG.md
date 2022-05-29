# Sprobe Laravel ReactJS Boilerplate

## [Unreleased]

## [2.0.0] - 2021-01-20
### Added
- CHANGELOG.md file

### Changed
- Added Composer to PHP Container
- Updated Nginx Config for all environments.
- New API Base URL. Before `api.DOMAIN.com/v1`. Now API Route `DOMAIN.com/api/v1/`. Removed API subdomain.
- Optional SSL Support. Can enable/disable via `.env` file `GENERATE_SELF_SIGNED_SSL=0 or 1`. Set value to `0` to disable SSL or `1` to enable SSL.

### Removed
- Composer Docker Container
- Removed subdomain nginx config for Backend API.

### Updates
- Updated PHPCS (Php Coding Standard) Fixer container to support PHP 8.1
- Updated Rules to adhere PSR12 and PHPCSFixer standards.
