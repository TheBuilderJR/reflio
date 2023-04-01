import fetch from 'node-fetch';

export const getURL = () => {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  return url.includes('http') ? url : `https://${url}`;
};

export const postData = async ({ url, token, data = {} }) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin',
    body: JSON.stringify(data),
  });

  if (res.error) {
    throw error;
  }

  return res.json();
};

export const UTCtoString = (date) => new Date(date).toISOString().split('T')[0];

export const checkUTCDateExpired = (UTCDate) => {
  const dateTodayTimestamp = Date.now();
  const UTCDateConvertedTimestamp = new Date(UTCDate).getTime();

  return dateTodayTimestamp > UTCDateConvertedTimestamp;
};

export const capitalizeString = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const toDateTime = (secs) => {
  const t = new Date('1970-01-01T00:30:00Z'); // Unix epoch start.
  t.setSeconds(secs);
  return t;
};

export const timeSince = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  const intervals = [
    { unit: 'year', seconds: 31536000 },
    { unit: 'month', seconds: 2592000 },
    { unit: 'day', seconds: 86400 },
    { unit: 'hour', seconds: 3600 },
    { unit: 'minute', seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.unit}${count > 1 ? 's' : ''} ago`;
    }
  }

  return `${seconds} seconds ago`;
};

export const classNames = (...classes) => classes.filter(Boolean).join(' ');

export const checkValidUrl = (str) => {
  const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '(?:(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]|'+ // domain name
    '(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))'+ // OR ip (v4) address
    '(?::\\d+)?(?:\\/[-a-z0-9@:%_+~#=]+(?:\\.[a-z0-9@:%_+~#=]+)*|\\/|\\?|#|$)',
    'i');
  return !!pattern.test(str);
}

export const slugifyString = (text) => {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .substring(0, 64);
};

export const priceString = (price = 0, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(price);
};

export const priceStringDivided = (price, currency) => {
  if (price === null || !currency) return 'error';
  return priceString(price / 100, currency);
};

export const monthsBetweenDates = (dt2, dt1) => {
  const diff = (dt2.getTime() - dt1.getTime()) / 1000;
  const months = diff / (60 * 60 * 24 * 7 * 4);
  return Math.abs(Math.round(months));
};

export const generateInviteUrl = (activeCampaign, companyHandle, campaignId) => {
  return activeCampaign
    ? `${process.env.NEXT_PUBLIC_AFFILIATE_SITE_URL}/invite/${companyHandle}`
    : `${process.env.NEXT_PUBLIC_AFFILIATE_SITE_URL}/invite/${companyHandle}/${campaignId}`;
};

export const LogSnagPost = async (type, message) => {
  try {
    const token = process.env.NEXT_PUBLIC_LOGSNAG_TOKEN;
    if (token) {
      const myHeaders = new Headers({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      });

      const project = 'reflio';
      const fancyType = type.replace(/-/g, ' ').toUpperCase();

      const emojiMap = {
        'stripe-connected': '💳',
        'new-campaign': '📚',
        'invite-affiliate': '🧑',
        'referral-created': '🎉',
        'commission-created': '💵',
        'paddle-connected': '🏓',
      };

      const emojiType = emojiMap[type] || '🔥';

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
          project,
          channel: type,
          event: fancyType,
          description: message,
          icon: emojiType,
          notify: true,
        }),
        redirect: 'follow',
      };

      const response = await fetch('https://api.logsnag.com/v1/log', requestOptions);
      const result = await response.text();
      return result === 'success' ? 'success' : 'error';
    } else {
      return 'LogSnag token not found in .env file';
    }
  } catch (error) {
    console.warn(error);
    return 'error';
  }
};

export const prettyMonthStartAndEnd = () => {
  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return {
    firstDay,
    lastDay,
  };
};

export const urlImgChecker = (url) => {
  const regex = /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i;
  return regex.test(url);
};

export const createDaysArray = (start, end) => {
  const arr = [];
  for (let dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
    arr.push(new Date(dt));
  }
  return arr;
};
