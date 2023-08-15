export const City: { [x: string]: 'Moscow' | 'SaintPetersburg' | 'Vladivostok'} = {
  Moscow: 'Moscow',
  SaintPetersburg: 'SaintPetersburg',
  Vladivostok: 'Vladivostok'
}

export type City = typeof City[keyof typeof City]
