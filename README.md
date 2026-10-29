# UIMS — University of Ibadan Model of Style

UIMS is a web-based service that provides access to the University of Ibadan citation style for use with reference management software that supports Citation Style Language (CSL), including Mendeley.

The application allows users to purchase access keys, receive them by email, and retrieve the UIMS citation style through an API.

## Features

- **Custom citation style:** Provides the University of Ibadan citation style in CSL XML format.
- **API-key authentication:** Restricts access to the citation-style endpoint using access keys.
- **Key purchase and delivery:** Integrates Paystack for payment processing and email delivery for distributing generated access keys.
- **Usage limits:** Tracks key usage and expiration status.
- **Transaction records:** Stores payment details, transaction status, and the number of keys purchased.
- **Mendeley integration:** Makes the citation style available through a URL that can be added to compatible citation-style tools.
- **Automated email delivery:** Sends transactional emails, including access keys and related instructions.

## How It Works

1. A user provides their details and selects the number of access keys to purchase.
2. The application initiates payment through Paystack.
3. Following successful payment processing, the transaction is recorded and access keys are generated.
4. The access keys are delivered to the user by email.
5. The user supplies an access key to the UIMS API to retrieve the citation style.
6. The API validates the key and checks its usage and expiration status before granting access.

## Technology Stack

- **Runtime:** Node.js
- **Backend:** Express.js
- **Database:** MySQL/MariaDB
- **Payment processing:** Paystack
- **Email delivery:** Resend
- **Citation format:** Citation Style Language (CSL XML)
- **Deployment:** Linux-based hosting

## API Usage

The application exposes an endpoint for retrieving the UIMS citation style. An API key is required for access.

General request format:

```http
GET /v1/send_uims?apikey=YOUR_API_KEY
```

Replace `YOUR_API_KEY` with a valid access key.

The endpoint returns the CSL style document when the key is accepted. The response is intended for use with compatible citation-style applications.

### Example

```bash
curl "https://YOUR_DOMAIN/v1/send_uims?apikey=YOUR_API_KEY"
```

Replace the example domain and key with your deployment details.

**Security note:** API keys are sensitive credentials. Avoid sharing them publicly or committing real keys to source control. For production use, consider passing credentials through an authorization header instead of a URL query parameter, since URLs can be recorded in logs.

## Database

The application maintains records for access keys and payment transactions.

### Access keys

The key records track:

- Access key
- Associated email address
- Number of uses
- Expiration status

### Transactions

Transaction records track:

- Transaction identifier
- Customer email and full name
- Number of keys purchased
- Transaction cost
- Payment success status
- Transaction creation time
- Payment time

## Environment Configuration

Configure the application's environment variables in a `.env` file or through your hosting provider's environment settings.

Typical configuration values include:

```env
PORT=3000

DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=

PAYSTACK_SECRET_KEY=

RESEND_API_KEY=
```

Use the actual variable names expected by the application. The list above is illustrative; your implementation may use a database connection string or different variable names.

Never commit `.env` files or production secrets to GitHub.

## Installation

### Prerequisites

- Node.js and npm
- A MySQL-compatible database
- Paystack credentials
- Resend API credentials
- A configured environment file

### Setup

1. Clone the repository:

   ```bash
   git clone YOUR_REPOSITORY_URL
   cd YOUR_PROJECT_DIRECTORY
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the environment variables.

4. Ensure the database exists and the configured database user has the required privileges.

5. Start the application using the script defined in `package.json`:

   ```bash
   npm start
   ```

The exact startup command may differ depending on the deployment environment.

## Citation Style

The UIMS citation style is distributed as a CSL XML file. A publicly accessible `.csl` file URL can be used with compatible citation-management software that supports custom styles.

The style file should contain valid CSL XML and conform to the CSL specification.

## Security Considerations

- Store API keys and payment credentials in environment variables.
- Validate access keys before returning the citation style.
- Verify payment status server-side before issuing keys.
- Use parameterized SQL queries for database operations.
- Apply usage limits and expiration checks consistently.
- Use HTTPS in production.
- Avoid exposing access keys in application logs or public URLs.
- Handle email and payment failures without issuing duplicate keys.

## Contributing

Contributions, bug reports, and suggestions are welcome. Before submitting changes, ensure that the application runs correctly and that database, payment, access-key, and email workflows have been tested.

## License

Add the project's chosen license here before distributing or reusing the source code.

---

**UIMS — University of Ibadan Model of Style**

A convenient way to access the University of Ibadan citation style through a web-based service.