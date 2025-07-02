import 'express';
import { admin } from '../../services/firebase';

declare global {
  namespace Express {
    interface Request {
      user?: admin.auth.DecodedIdToken;
    }
  }
}
