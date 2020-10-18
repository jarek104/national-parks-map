import { Place } from 'src/app/models/place';

export const PLACES: Place[] =
  [{
    id: '1',
    longitude: -74,
    lattitude: 43,
    photoIds: ['1', '2'],
    coverPhoto: {
      id: '1',
      longitude: -74,
      lattitude: 43,
      blob: 'https://www.discovernorthamerica.co.uk/wp-content/uploads/2018/10/monument-valley-1081996_960_720.jpg',
      title: 'The Making of South Park',
      description: 'Donec diam neque, vestibulum eget, vulputate ut,Integer ac nequem. Morbi non quam nec dui luctus rutrum. Nulla tellus.',
      authorId: '98',
      favorites: 79,
      date: '11/6/2018',
      placeId: 28,
      cameraType: 'Daltfresh',
      tags: [1, 2, 3]
    }
  },
  {
    id: '2',
    longitude: 121.507229,
    lattitude: 31.823845,
    photoIds: ['1', '2'],
    coverPhoto: {
      id: '2',
      longitude: 121.507229,
      lattitude: 31.823845,
      blob: 'https://i.stack.imgur.com/2OrtT.jpg',
      title: 'Kill Bill: Vol. 2',
      description: 'Quisque id justo sit amet sapien dignissim vestibulum. Vestilicitudin ut, suscipit a, feugiat et, eros.',
      authorId: '46',
      favorites: 95,
      date: '2/12/2018',
      placeId: 99,
      cameraType: 'Stronghold',
      tags: [2, 3, 4, 5]
    }
  },
  {
    id: '3',
    longitude: -87.6531805,
    lattitude: 41.9403795,
    photoIds: ['1', '2'],
    coverPhoto: {
      id: '3',
      longitude: -87.6531805,
      lattitude: 41.9403795,
      blob: 'https://cdn.pixabay.com/photo/2016/11/13/14/11/arches-national-park-1821072__340.jpg',
      title: 'Cloak and Dagger',
      description: 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
      authorId: '75',
      favorites: 18,
      date: '5/31/2018',
      placeId: 26,
      cameraType: 'Biodex',
      tags: [1, 3, 5, 7]
    }
  },
  {
    id: '4',
    longitude: 120.4674034,
    lattitude: 15.9769657,
    photoIds: ['1', '2'],
    coverPhoto: {
      id: '4',
      longitude: 120.4674034,
      lattitude: 15.9769657,
      blob: 'http://www.teachutah.org/wp-content/uploads/2015/08/Glen-Canyon-Utah.jpg',
      title: 'Destiny (Al-massir)',
      description: 'In hac habitasse turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
      authorId: '82',
      favorites: 31,
      date: '2/18/2018',
      placeId: 45,
      cameraType: 'Tres-Zap',
      tags: [4, 5, 7]
    }
  },
  {
    id: '5',
    longitude: 53.8103933,
    lattitude: 57.652547,
    photoIds: ['1', '2'],
    coverPhoto: {
      id: '5',
      longitude: 53.8103933,
      lattitude: 57.652547,
      // blob: 'https://images.earthtouchnews.com/media/1378/2013-09-09-facts-you-should-know-about-americas-most-endangered-river-01.jpg?mode=crop&width=1060&height=707',
      blob: 'https://cdn57.androidauthority.net/wp-content/uploads/2018/02/google-pixel-2-portrait-mode-with-face-retouching.jpg',
      title: 'Devil Commands, The',
      description: 'In hac habitasntum neque sapieisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
      authorId: '70',
      favorites: 76,
      date: '9/1/2018',
      placeId: 10,
      cameraType: 'Stim',
      tags: [3, 4],
    }
  }
  ];


