const Store = require('electron-store');
const crypto = require('crypto');
require('dotenv').config();

class secretStore extends Store {
  constructor() {
    super({
      name: "AppSecConfig",
      schema: {
        encryptionKey: {
          type: 'string',
          default: ''
        },
      }
    });
  }

  getEncryptionKey() {
    return this.get('encryptionKey');
  }

  setEncryptionKey(key) {
    this.set('encryptionKey', key);
  }
}

const secretstore = new secretStore();

const defaultKey = crypto.randomBytes(32).toString('hex');

// Key and IV generation for demonstration; in real applications, store securely and reuse them
const secretKey = secretstore.getEncryptionKey() || defaultKey;
secretstore.setEncryptionKey(secretKey);
const algorithm = 'aes-256-cbc';

const encrypt = (plainText) => {
  const iv = crypto.randomBytes(16); // Generate a random initialization vector
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey, 'hex'), iv);
  let encrypted = cipher.update(plainText, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted; // Include the IV with the ciphertext
};

const decrypt = (encrypted) => {
  const textParts = encrypted.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = textParts.join(':');
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey, 'hex'), iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

// Combined schema definition
const schema = {
  email: {
    type: 'string',
    default: '',
  },
  password: {
    type: 'string',
    default: encrypt(''),
  },
  server_host: {
    type: 'string',
    default: 'outlook.office365.com',
  },
  server_port: {
    type: 'number',
    default: 993,
  },
  emailRecipients: {
    type: 'string',
    default: '',
  },
  smsRecipients: {
    type: 'string',
    default: '',
  },
  encryptionKey: {
    type: 'string',
    default: ''
  },
  twilio_account_sid: {
    type: 'string',
    default: '',
  },
  twilio_auth_token: {
    type: 'string',
    default: '',
  },
};

class ConfigStore extends Store {
  constructor() {
    super({
      name: "AppConfig",
      schema,
    });
  }

  getStore() {
    return this.store;
  }

  getStorePath() {
    return this.path;
  }

  getAllSettings() {
    return this.store;
  }

  getSetting(key) {
    if (key === 'password') {
      const password = this.get(key);
      return decrypt(password);
    }
    return this.get(key);
  }

  setSetting(key, value) {
    if (key === 'email') {
      value = value.toLowerCase();
    }
    if (key === 'password') {
      value = encrypt(value);
    }
    this.set(key, value);
  }

  // Example getter and setter for email
  getEmail() {
    return this.get('email');
  }

  getPassword() {
    const password = this.get('password');
    return decrypt(password);
  }

  setPassword(password) {
    this.set('password', encrypt(password));
  }

  setEmail(email) {
    this.set('email', email);
  }

  // Additional getters and setters as needed
}

// Create a singleton instance
const configStore = new ConfigStore();


// Export the singleton instance
export default configStore;
