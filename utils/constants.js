export const ENVIRONMENT = process.env.ENVIRONMENT;
export const API_KEY =
  ENVIRONMENT == "test"
    ? process.env.TEST_SECRET_KEY
    : process.env.LIVE_SECRET_KEY;
export const PAYMENT_URL = process.env.PAYMENT_INITIATION_URL;
export const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING
export const DB_NAME = process.env.DB_NAME;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const GOOGLE_REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
export const REDIRECT_URI = process.env.REDIRECT_URI;
export const GMAIL = process.env.GMAIL;
export const HOW_TO_USE_URL = "google.com"
export const PORT = parseInt(process.env.PORT)


const data = {
  event: 'charge.success',
  data: {
    id: 6410077622,
    domain: 'test',
    status: 'success',
    reference: 'xlhnk0xh2l',
    amount: 1030000,
    message: null,
    gateway_response: 'Successful',
    gateway_response_code: 'approved',
    response_code: '00',
    paid_at: '2026-07-31T09:36:42.000Z',
    created_at: '2026-07-31T09:36:35.000Z',
    channel: 'card',
    currency: 'NGN',
    ip_address: '102.93.10.247',
    metadata: { referrer: 'http://localhost:3000/' },
    fees_breakdown: null,
    log: null,
    fees: 25450,
    fees_split: null,
    authorization: {
      authorization_code: 'AUTH_btbo1tb97c',
      bin: '408408',
      last4: '4081',
      exp_month: '12',
      exp_year: '2030',
      channel: 'card',
      card_type: 'visa ',
      bank: 'TEST BANK',
      country_code: 'NG',
      brand: 'visa',
      reusable: true,
      signature: 'SIG_OucPKWIQvoccnAmCi3RV',
      account_name: null,
      receiver_bank_account_number: null,
      receiver_bank: null
    },
    customer: {
      id: 386689631,
      first_name: null,
      last_name: null,
      email: 'ajuwonos1@gmail.com',
      customer_code: 'CUS_jzsvzhxjnbitq0c',
      phone: null,
      metadata: null,
      risk_action: 'default',
      international_format_phone: null
    },
    plan: {},
    subaccount: {},
    split: {},
    order_id: null,
    paidAt: '2026-07-31T09:36:42.000Z',
    requested_amount: 1030000,
    pos_transaction_data: null,
    source: {
      type: 'api',
      source: 'merchant_api',
      entry_point: 'transaction_initialize',
      identifier: null
    }
  }
}