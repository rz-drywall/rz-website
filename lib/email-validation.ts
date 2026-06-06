export function isValidCompanyEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false
  
  // Basic format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return false
  
  const domain = email.split('@')[1]?.toLowerCase()
  if (!domain) return false

  // Block common bot typo domains
  const typoDomains = [
    'gmail.c', 'gmail.co', 'gmail.con', 'gamil.com', 
    'yahoo.c', 'yahoo.co', 'yahoo.con',
    'hotmail.c', 'hotmail.co', 'hotmail.con',
    'outlook.c', 'outlook.co', 'outlook.con'
  ]

  if (typoDomains.includes(domain)) return false

  // Block personal domains to enforce company email at the API level
  const personalEmailDomains = [
    'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com',
    'icloud.com', 'mail.com', 'protonmail.com', 'zoho.com', 'yandex.com',
    'gmx.com', 'live.com', 'msn.com', 'me.com', 'mac.com',
    'inbox.com', 'fastmail.com', 'tutanota.com', 'hey.com', 'pm.me',
    'yahoo.co.uk', 'hotmail.co.uk', 'live.co.uk', 'googlemail.com'
  ]

  if (personalEmailDomains.includes(domain)) return false

  return true
}
