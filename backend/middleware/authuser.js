// Import the 'jsonwebtoken' library for working with JWT tokens
import jwt from "jsonwebtoken";

// Middleware function to check authorization using a JWT token
const authuser = async (req, res, next) => {
  // Get the token from request headers
  const { token } = req.headers;

  // If token is not provided, send an unauthorized response
  if (!token) {
    return res.json({ success: false, message: 'Not Authorized! Login Again' });
  }

  try {
    // Verify the token using the secret and decode the payload (when user will be login or register token contain user if go to backedn c0de and check)
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // Put the user id from token into request body for further use
    req.body.userId = token_decode.id; //  Here we get user._id as userId


    // Call the next middleware function in the stack
    next();
  } catch (error) {
    // If token is invalid or verification fails, log error and send error response
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// Export the middleware function as default export
export default authuser;