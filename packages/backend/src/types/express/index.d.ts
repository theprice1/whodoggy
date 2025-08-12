import 'express';
import { admin } from '../../services/firebase.js.js';

declare global {
  namespace Express {
    interface Request {
      user?: admin.auth.DecodedIdToken;
    }
  }
}
