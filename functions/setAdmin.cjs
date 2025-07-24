import admin from 'firebase-admin';

import serviceAccount from './service-account.json' assert { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const uid = 'USER_UID_TO_PROMOTE';

(async () => {
  try {
    await admin.auth().setCustomUserClaims(uid, { admin: true });
    console.log('✅ Admin privileges granted for UID:', uid);
  } catch (err) {
    console.error('❌ Error setting admin claim:', err);
  }
})();
