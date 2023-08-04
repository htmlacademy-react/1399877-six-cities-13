import { Review } from '../../types/reviews';

export const Reviews: Review[] = [
  {
    id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62a',
    date: '2019-05-08T14:13:56.569Z',
    user: {
      name: 'Oliver Conner',
      avatarUrl: '../../img/avatar-angelina.jpg',
      isPro: false,
    },
    comment:
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 4,
  },
  {
    id: '4dd41d31-cc23-4c38-b4be-d098673c41cc',
    date: '2020-07-11T10:10:06.569Z',
    user: {
      name: 'Till Lindermann',
      avatarUrl: '../../img/avatar-max.jpg',
      isPro: true,
    },
    comment:
      'Id exercitation irure anim ad magna. Dolor sint irure consequat tempor quis elit sit. Sunt qui deserunt veniam anim aliqua in sunt mollit consequat dolor. Laboris esse dolor magna eiusmod commodo. Ad amet mollit reprehenderit nisi cillum fugiat esse. Velit deserunt est ipsum aute cillum adipisicing.',
    rating: 2,
  },
];
