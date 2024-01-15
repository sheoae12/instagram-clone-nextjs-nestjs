export default () => ({
    app: {
        host: process.env.APP_HOST || 'localhost',
        port: parseInt(process.env.APP_PORT as string, 10) || 8080
    },
    db: {
        host: process.env.DB_HOST || '127.0.0.1',
        port: parseInt(process.env.DB_PORT as string, 10) || 5432,
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    },
    redis: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: parseInt(process.env.REDIS_PORT as string, 10) || 6379,
        ttl: process.env.REDIS_DEFAULT_TTL || 3600
    },
    jwt: {
        secret: process.env.JWT_SECRET
    },
    firebase: {
        projectId: process.env.FIREBASE_PROJECT_ID,

        // app
        appId: process.env.FIREBASE_APP_ID,
        apiKey: process.env.FIREBASE_API_KEY,
        apiId: process.env.FIREBASE_API_ID,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        senderId: process.env.FIREBASE_SENDER_ID,

        // admin
        type: process.env.FIREBASE_TYPE || 'service_account',
        clientId: process.env.FIREBASE_CLIENT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
        authUri: process.env.FIREBASE_AUTH_URI,
        tokenUri: process.env.FIREBASE_TOKEN_URI,
        authCertUrl: process.env.FIREBASE_AUTH_CERT_URL,
        clientCertUrl: process.env.FIREBASE_CLIENT_CERT_URL,
        universeDomain: process.env.FIREBASE_UNIVERSE_DOMAIN
    }
});
