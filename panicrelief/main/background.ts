import path from 'path'
import { app, ipcMain } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
const nodemailer = require('nodemailer');

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

// Configure your SMTP transporter
const transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  port: 587, // Common port for SMTP
  secure: false, // true for 465, false for other ports
  auth: {
    user: '',
    pass: '',
  },
});

// Function to send an email
const sendEmail = async ({ to, subject, text, html, attachments }) => {
  const mailOptions = {
    from: '', // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
    html, // HTML body content
    attachments: attachments || [],
  };

  console.log('Sending email:', mailOptions);

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
};


;(async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 850,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  if (isProd) {
    await mainWindow.loadURL('app://./form')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/form`)
    mainWindow.webContents.openDevTools()
  }
})()

app.on('window-all-closed', () => {
  app.quit()
})

ipcMain.on('message', async (event, arg) => {
  event.reply('message', `${arg} World!`)
})

ipcMain.on('form-submit', async (event, arg) => {
  console.log('Received form submission:', arg);
  event.reply('form-submit-reply', 'Form submitted!');
  let attachments = [];
  const fileRegex = /^files\[\d+\]$/;
  
  // Assuming `arg` is the object you've received
  attachments = Object.keys(arg)
    .filter(key => fileRegex.test(key)) // Filter keys that match the file pattern
    .map(key => ({
      filename: arg[key].name, // The name of the file
      path: arg[key].path, // The path to the file
    }));

  

  sendEmail({
    to: '',
    subject: `Severity: ${arg.severity} - ${arg.title}`,
    text: `Core Service: ${arg.coreService}\n\n${arg.description}`,
    html: `<p>${arg.description}</p><p>Core Service: ${arg.coreService}</p>`,
    attachments,
  }).then(result => {
    if(result.success) {
      console.log('Email sent successfully:', result.messageId);
      event.reply('form-submit-reply-email', 'Email sent successfully');
    } else {
      console.error('Failed to send email:', result.error);
    }
  });
});
