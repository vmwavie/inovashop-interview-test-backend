const USER_ERRORS = {
  USER_NOT_FOUND: "user_not_found", // user not found
  INVALID_ID: "invalid_id", // invalid id
  NULL_AUTH_TOKEN: "null_auth_token", // please provide the auth token
  NULL_FIELD_ID: "null_field_id", // please provide the id
  NULL_FIELD_EMAIL: "null_field_email", // please provide the email
  NULL_FIELD_PASSWORD: "null_field_password", // please provide the password
  NULL_FIELD_DATA_OR_ID: "null_field_data_or_id", // please provide the data or id
  NULL_FIELD_EMAIL_OR_ID: "null_field_email_or_id", // please provide the email or id
  NULL_FIELD_EMAIL_OR_PASSWORD: "null_field_email_or_password", // please provide the email and password
  NULL_FIELD_ID_OR_OTP: "null_field_id_or_otp", // please provide the id or otp
  NULL_FIELD_SECRET: "null_field_secret", // please provide the secret
  EMAIL_IN_USE: "email_in_use", // email already in use
  FIELD_DOES_NOT_MATCH: "field_does_not_match", // fields do not match
  EMAIL_DONT_EXIST: "email_does_not_exist", // email does not exist
  OTP_CODE_INCORRECT: "otp_code_incorrect", // otp code is incorrect
  FAILED_TO_RESET: "failed_to_reset", // failed to reset
  FAILED_TO_UPDATE: "failed_to_update", // failed to update
  UNAUTHORIZED_ACCESS: "user_unauthorized_access", // unauthorized access
};

const USER_SUCCESS = {
  UPDATED: "updated", // user updated successfully
  CREATED: "created", // user created successfully
  LOGIN_SUCCESSFULLY: "login_successfully", // user logged in successfully
  PASSWORD_RESETED: "password_reset", // password reset
  SECRET_UPDATED: "secret_updated", // secret updated successfully
};

export { USER_ERRORS, USER_SUCCESS };
