import { track } from '@vercel/analytics'

export function trackOutbound(label: string) {
  track('outbound_click', {
    destination: 'zeppelin-adventure.com',
    label,
  })
}
