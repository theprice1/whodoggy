// debug-firebase.js
import dotenv from 'dotenv';
dotenv.config();

console.log('=== Firebase Credentials Debug ===');

const credentialsJson = process.env.FIREBASE_ADMIN_CREDENTIALS_JSON;

if (!credentialsJson) {
  console.error('❌ FIREBASE_ADMIN_CREDENTIALS_JSON not found');
  process.exit(1);
}

console.log('✅ Credentials JSON found');
console.log('📏 JSON length:', credentialsJson.length);

try {
  const credentials = JSON.parse(credentialsJson);
  console.log('✅ JSON parsed successfully');
  console.log('🔑 Project ID:', credentials.project_id);
  console.log('📧 Client Email:', credentials.client_email);

  if (credentials.private_key) {
    console.log('🔐 Private key found');
    console.log('📏 Private key length:', credentials.private_key.length);
    console.log('🚀 Starts with:', credentials.private_key.substring(0, 30));
    console.log('🏁 Ends with:', credentials.private_key.slice(-30));

    // Check for common formatting issues
    const hasProperStart = credentials.private_key.includes('-----BEGIN PRIVATE KEY-----');
    const hasProperEnd = credentials.private_key.includes('-----END PRIVATE KEY-----');
    const hasNewlines = credentials.private_key.includes('\n');

    console.log('✅ Has proper start:', hasProperStart);
    console.log('✅ Has proper end:', hasProperEnd);
    console.log('✅ Has newlines:', hasNewlines);

    if (!hasProperStart || !hasProperEnd) {
      console.error('❌ Private key formatting issue detected');
    }

    if (!hasNewlines) {
      console.log('ℹ️  Private key appears to be on one line (this might be the issue)');
    }
  } else {
    console.error('❌ Private key missing from credentials');
  }

} catch (error) {
  console.error('❌ JSON parsing failed:', error.message);
  console.log('🔍 First 100 chars of JSON:');
  console.log(credentialsJson.substring(0, 100));
}

console.log('=== End Debug ===');
