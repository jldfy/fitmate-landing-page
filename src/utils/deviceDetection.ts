export type DeviceType = 'ios' | 'android' | 'desktop';

export function detectDevice(): DeviceType {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  const isTablet = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent);

  if (isTablet) {
    return 'desktop';
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
    return 'ios';
  }

  if (/android/i.test(userAgent)) {
    return 'android';
  }

  return 'desktop';
}

export function getDownloadLink(deviceType: DeviceType): string {
  switch (deviceType) {
    case 'ios':
      return 'https://apps.apple.com/fr/app/fitmates-sports-social/id6756283890';
    case 'android':
      return 'https://play.google.com/store/apps/details?id=com.dlahlou.fitmate';
    case 'desktop':
    default:
      return 'https://app.fitmates.net';
  }
}

export function getButtonText(deviceType: DeviceType): string {
  return deviceType === 'desktop' ? 'Rejoindre' : 'Télécharger';
}
