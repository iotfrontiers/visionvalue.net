import { createTransport } from 'nodemailer'

let _transporter: ReturnType<typeof createTransport> = null

const createTransporter = () => {
  const { email } = useRuntimeConfig()

  if (!_transporter) {
    _transporter = createTransport({
      sender: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: decryptString(email.googleSmtpUser),
        pass: decryptString(email.googleSmtpPassword),
      },
    })
  }

  return _transporter
}

export const sendEmail = async (subject: string, content: string) => {
  const { email } = useRuntimeConfig()
  const receivers = email.emailReceivers

  if (!receivers) {
    return
  }

  const transper = createTransporter()
  for (const receiver of receivers.split(',')) {
    if (!receiver) {
      continue
    }

    await transper.sendMail({
      from: `"Frontier" <${decryptString(email.googleSmtpUser)}>`,
      to: receiver.trim(),
      subject,
      html: content.replace(/\n/gi, '<br />'),
    })

    console.log(`sent email : ${receiver}, ${subject}`)
  }
}
