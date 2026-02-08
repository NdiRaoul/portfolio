import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

// Interface to match the service account JSON structure
interface ServiceAccountJson {
  project_id: string;
  private_key: string;
  client_email: string;
  [key: string]: any;
}

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  let serviceAccountJson: ServiceAccountJson | undefined;
  
  // First, try to load from environment variable
  if (process.env.FIREBASE_ADMIN_SDK_KEY) {
    try {
      const rawKey = process.env.FIREBASE_ADMIN_SDK_KEY.trim();
      serviceAccountJson = JSON.parse(rawKey);
      
      if (serviceAccountJson && serviceAccountJson.private_key) {
        serviceAccountJson.private_key = serviceAccountJson.private_key.replace(/\\n/g, '\n');
      }
      console.log('[Firebase Admin] Loaded credentials from FIREBASE_ADMIN_SDK_KEY env var');
    } catch (error) {
      console.error('[Firebase Admin] Failed to parse FIREBASE_ADMIN_SDK_KEY:', error);
    }
  }
  
  // If no env var, try to load from ServiceAccountKey.json file
  if (!serviceAccountJson) {
    try {
      const serviceAccountPath = path.join(process.cwd(), 'ServiceAccountKey.json');
      if (fs.existsSync(serviceAccountPath)) {
        const fileContent = fs.readFileSync(serviceAccountPath, 'utf-8');
        serviceAccountJson = JSON.parse(fileContent);
        console.log('[Firebase Admin] Loaded credentials from ServiceAccountKey.json file');
      }
    } catch (error) {
      console.error('[Firebase Admin] Failed to load ServiceAccountKey.json:', error);
    }
  }

  // Initialize with credentials or fail
  if (serviceAccountJson) {
    const serviceAccount: admin.ServiceAccount = {
      projectId: serviceAccountJson.project_id,
      clientEmail: serviceAccountJson.client_email,
      privateKey: serviceAccountJson.private_key,
    };
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
    console.log('[Firebase Admin] Initialized successfully');
  } else {
    console.error('[Firebase Admin] No credentials found. Please set FIREBASE_ADMIN_SDK_KEY env var or ensure ServiceAccountKey.json exists.');
    throw new Error('Firebase Admin SDK credentials not found');
  }
}

export const db = admin.firestore();
export const auth = admin.auth();

export default admin;

