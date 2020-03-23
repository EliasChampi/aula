import uuid from 'uuid/v1';

export default [
  {
    id: uuid(),
    name: 'Kwak Seong-Min',
    address: {
      country: 'USA',
      state: 'Michigan',
      city: 'Detroit',
      street: '3934  Wildrose Lane'
    },
    email: 'kwak.seong.min@devias.io',
    avatarUrl: '/images/avatars/avatar_9.png',
    phone: '313-812-8947'
  },
  {
    id: uuid(),
    name: 'Merrile Burgett',
    address: {
      country: 'USA',
      state: 'Utah',
      city: 'Salt Lake City',
      street: '368 Lamberts Branch Road'
    },
    email: 'merrile.burgett@devias.io',
    phone: '801-301-7894',
    avatarUrl: '/images/avatars/avatar_10.png',
    createdAt: 1522702800000
  }
];
