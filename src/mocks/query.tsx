import { firestore } from '@lib/firebase';

// type Category = {
//   Type: 'link';
//   createdAt: Date;
//   updatedAt: Date;
//   deletedAt: Date;
//   hasChild: Boolean;
//   level: Number;
//   order: Number;
//   parentId: String;
//   pathway: {};
//   version: 1;
//   title: String;
// };

const DaejeonIcons = [
  {
    actionType: 'newWindowLink',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/onna-intro.appspot.com/o/icon%2Ficon_dcc.png?alt=media&token=2c5dee32-f306-44d2-89e4-7a84bf174905',
    label: '대전컨벤션센터(1,2전시장 통합)',
    linkUrl: 'https://www.dcckorea.or.kr/',
    radius: 0.6,
    size: 0.5,
    x: 0,
    y: 0,
    z: 0,
  },
  {
    actionType: 'newWindowLink',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/onna-intro.appspot.com/o/icon%2Ficon_hotel.png?alt=media&token=77534c49-52ff-4cc7-a5f2-ba09ab1ef4d5',
    label: '호텔 ICC',
    linkUrl: 'http://hotel.hotelicc.com/',
    radius: 0.6,
    size: 0.5,
    x: 0,
    y: 0,
    z: 0,
  },
  {
    actionType: 'newWindowLink',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/onna-intro.appspot.com/o/icon%2Ficon_hotel.png?alt=media&token=77534c49-52ff-4cc7-a5f2-ba09ab1ef4d5',
    label: '롯데시티호텔대전',
    linkUrl: 'https://www.lottehotel.com/daejeon-city/ko.html',
    radius: 0.6,
    size: 0.5,
    x: 0,
    y: 0,
    z: 0,
  },
  {
    actionType: 'newWindowLink',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/onna-intro.appspot.com/o/icon%2Ficon_hotel.png?alt=media&token=77534c49-52ff-4cc7-a5f2-ba09ab1ef4d5',
    label: '호텔 오노마',
    linkUrl: 'https://www.marriott.com/ko/hotels/cjjak-hotel-onoma-daejeon-autograph-collection/overview/',
    radius: 0.6,
    size: 0.5,
    x: 0,
    y: 0,
    z: 0,
  },
  {
    actionType: 'newWindowLink',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/onna-intro.appspot.com/o/icon%2Ficon_shopping.png?alt=media&token=1c70be16-0295-46d5-82a4-6e6de6aea285',
    label: '대전신세계',
    linkUrl: 'https://www.shinsegae.com/store/main.do?storeCd=SC00060',
    radius: 0.6,
    size: 0.5,
    x: 0,
    y: 0,
    z: 0,
  },
  {
    actionType: 'newWindowLink',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/onna-intro.appspot.com/o/icon%2Ficon_concert.png?alt=media&token=9d05d904-6275-4094-b22b-75c118e7e88b',
    label: '예술의 전당',
    linkUrl: 'https://www.daejeon.go.kr/djac/index.do',
    radius: 0.6,
    size: 0.5,
    x: 0,
    y: 0,
    z: 0,
  },
  {
    actionType: 'newWindowLink',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/onna-intro.appspot.com/o/icon%2Ficon_concert.png?alt=media&token=9d05d904-6275-4094-b22b-75c118e7e88b',
    label: '시립연정국악원',
    linkUrl: 'https://www.daejeon.go.kr/kmusic/',
    radius: 0.6,
    size: 0.5,
    x: 0,
    y: 0,
    z: 0,
  },
  {
    actionType: 'newWindowLink',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/onna-intro.appspot.com/o/icon%2Ficon_daejeon_museumofart.png?alt=media&token=029ec70b-7355-46d9-911b-f5c61c01e258',
    label: '시립미술관',
    linkUrl: 'https://www.daejeon.go.kr/dma/index.do',
    radius: 0.6,
    size: 0.5,
    x: 0,
    y: 0,
    z: 0,
  },
  {
    actionType: 'newWindowLink',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/onna-intro.appspot.com/o/icon%2Ficon_concert.png?alt=media&token=9d05d904-6275-4094-b22b-75c118e7e88b',
    label: '평송청소년문화센터',
    linkUrl: 'https://pyoungsong.com/',
    radius: 0.6,
    size: 0.5,
    x: 0,
    y: 0,
    z: 0,
  },
  {
    actionType: 'newWindowLink',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/onna-intro.appspot.com/o/icon%2Ficon_nature.png?alt=media&token=164f04f7-b54f-4e63-bbd9-f94339b380e6',
    label: '한밭수목원',
    linkUrl: 'https://www.daejeon.go.kr/gar/index.do',
    radius: 0.6,
    size: 0.5,
    x: 0,
    y: 0,
    z: 0,
  },
  {
    actionType: 'newWindowLink',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/onna-intro.appspot.com/o/icon%2Ficon_art.png?alt=media&token=ef6a02f6-ad24-447d-b94e-81204921efa9',
    label: '이응노 미술관',
    linkUrl: 'https://www.leeungnomuseum.or.kr/',
    radius: 0.6,
    size: 0.5,
    x: 0,
    y: 0,
    z: 0,
  },
  {
    actionType: 'newWindowLink',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/onna-intro.appspot.com/o/icon%2Ficon_hanbittop.png?alt=media&token=adb4a017-ac7f-4a7b-808f-be46749bc4e6',
    label: '한빛탑',
    linkUrl: 'http://www.djto.kr/kor/page.do?menuIdx=652',
    radius: 0.6,
    size: 0.5,
    x: 0,
    y: 0,
    z: 0,
  },
  {
    actionType: 'newWindowLink',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/onna-intro.appspot.com/o/icon%2Ficon_landmark_fam.png?alt=media&token=c7136e1d-4808-4400-a466-1178d292f411',
    label: '엑스포 다리',
    linkUrl: 'https://me2.do/F1eLBPFP',
    radius: 0.6,
    size: 0.5,
    x: 0,
    y: 0,
    z: 0,
  },
  {
    actionType: 'newWindowLink',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/onna-intro.appspot.com/o/icon%2Ficon_museum.png?alt=media&token=5ec96d0b-2cc8-4891-a87b-0b1506a0b106',
    label: '대전국립중앙과학관',
    linkUrl: 'https://www.science.go.kr/',
    radius: 0.6,
    size: 0.5,
    x: 0,
    y: 0,
    z: 0,
  },
  {
    actionType: 'newWindowLink',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/onna-intro.appspot.com/o/icon%2Ficon_restaurant.png?alt=media&token=459b4adf-126a-421c-acbf-2a60f01ef5c3',
    label: '식당가',
    linkUrl:
      'https://www.google.co.kr/maps/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/data=!4m8!2m7!3m5!2z64yA7KCE7JiI7Iig7J2Y7KCE64u5!3s0x3565497e314a6159:0x74d254ce6fe303e1!4m2!1d127.383661!2d36.3664537!6e5?hl=ko&entry=ttu',
    radius: 0.6,
    size: 0.5,
    x: 0,
    y: 0,
    z: 0,
  },
  {
    actionType: 'sideModal',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/onna-intro.appspot.com/o/icon%2Ficon_dcc.png?alt=media&token=2c5dee32-f306-44d2-89e4-7a84bf174905',
    label: '대전컨벤션센터(1,2전시장 통합)',
    linkUrl: 'https://www.dcckorea.or.kr/',
    radius: 0.6,
    size: 0.5,
    x: 0,
    y: 0,
    z: 0,
  },
  {
    actionType: 'sideModal',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/onna-intro.appspot.com/o/icon%2Ficon_hotel.png?alt=media&token=77534c49-52ff-4cc7-a5f2-ba09ab1ef4d5',
    label: '호텔 ICC',
    linkUrl: 'http://hotel.hotelicc.com/',
    radius: 0.6,
    size: 0.5,
    x: 0,
    y: 0,
    z: 0,
  },
  {
    actionType: 'sideModal',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/onna-intro.appspot.com/o/icon%2Ficon_hotel.png?alt=media&token=77534c49-52ff-4cc7-a5f2-ba09ab1ef4d5',
    label: '롯데시티호텔대전',
    linkUrl: 'https://www.lottehotel.com/daejeon-city/ko.html',
    radius: 0.6,
    size: 0.5,
    x: 0,
    y: 0,
    z: 0,
  },
  {
    actionType: 'sideModal',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/onna-intro.appspot.com/o/icon%2Ficon_hotel.png?alt=media&token=77534c49-52ff-4cc7-a5f2-ba09ab1ef4d5',
    label: '호텔 오노마',
    linkUrl: 'https://www.marriott.com/ko/hotels/cjjak-hotel-onoma-daejeon-autograph-collection/overview/',
    radius: 0.6,
    size: 0.5,
    x: 0,
    y: 0,
    z: 0,
  },
  {
    actionType: 'sideModal',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/onna-intro.appspot.com/o/icon%2Ficon_shopping.png?alt=media&token=1c70be16-0295-46d5-82a4-6e6de6aea285',
    label: '대전신세계',
    linkUrl: 'https://www.shinsegae.com/store/main.do?storeCd=SC00060',
    radius: 0.6,
    size: 0.5,
    x: 0,
    y: 0,
    z: 0,
  },
  {
    actionType: 'sideModal',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/onna-intro.appspot.com/o/icon%2Ficon_concert.png?alt=media&token=9d05d904-6275-4094-b22b-75c118e7e88b',
    label: '예술의 전당',
    linkUrl: 'https://www.daejeon.go.kr/djac/index.do',
    radius: 0.6,
    size: 0.5,
    x: 0,
    y: 0,
    z: 0,
  },
  {
    actionType: 'sideModal',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/onna-intro.appspot.com/o/icon%2Ficon_concert.png?alt=media&token=9d05d904-6275-4094-b22b-75c118e7e88b',
    label: '시립연정국악원',
    linkUrl: 'https://www.daejeon.go.kr/kmusic/',
    radius: 0.6,
    size: 0.5,
    x: 0,
    y: 0,
    z: 0,
  },
  {
    actionType: 'sideModal',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/onna-intro.appspot.com/o/icon%2Ficon_daejeon_museumofart.png?alt=media&token=029ec70b-7355-46d9-911b-f5c61c01e258',
    label: '시립미술관',
    linkUrl: 'https://www.daejeon.go.kr/dma/index.do',
    radius: 0.6,
    size: 0.5,
    x: 0,
    y: 0,
    z: 0,
  },
  {
    actionType: 'sideModal',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/onna-intro.appspot.com/o/icon%2Ficon_concert.png?alt=media&token=9d05d904-6275-4094-b22b-75c118e7e88b',
    label: '평송청소년문화센터',
    linkUrl: 'https://pyoungsong.com/',
    radius: 0.6,
    size: 0.5,
    x: 0,
    y: 0,
    z: 0,
  },
  {
    actionType: 'sideModal',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/onna-intro.appspot.com/o/icon%2Ficon_nature.png?alt=media&token=164f04f7-b54f-4e63-bbd9-f94339b380e6',
    label: '한밭수목원',
    linkUrl: 'https://www.daejeon.go.kr/gar/index.do',
    radius: 0.6,
    size: 0.5,
    x: 0,
    y: 0,
    z: 0,
  },
  {
    actionType: 'sideModal',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/onna-intro.appspot.com/o/icon%2Ficon_art.png?alt=media&token=ef6a02f6-ad24-447d-b94e-81204921efa9',
    label: '이응노 미술관',
    linkUrl: 'https://www.leeungnomuseum.or.kr/',
    radius: 0.6,
    size: 0.5,
    x: 0,
    y: 0,
    z: 0,
  },
  {
    actionType: 'sideModal',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/onna-intro.appspot.com/o/icon%2Ficon_hanbittop.png?alt=media&token=adb4a017-ac7f-4a7b-808f-be46749bc4e6',
    label: '한빛탑',
    linkUrl: 'http://www.djto.kr/kor/page.do?menuIdx=652',
    radius: 0.6,
    size: 0.5,
    x: 0,
    y: 0,
    z: 0,
  },
  {
    actionType: 'sideModal',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/onna-intro.appspot.com/o/icon%2Ficon_landmark_fam.png?alt=media&token=c7136e1d-4808-4400-a466-1178d292f411',
    label: '엑스포 다리',
    linkUrl: 'https://me2.do/F1eLBPFP',
    radius: 0.6,
    size: 0.5,
    x: 0,
    y: 0,
    z: 0,
  },
  {
    actionType: 'sideModal',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/onna-intro.appspot.com/o/icon%2Ficon_museum.png?alt=media&token=5ec96d0b-2cc8-4891-a87b-0b1506a0b106',
    label: '대전국립중앙과학관',
    linkUrl: 'https://www.science.go.kr/',
    radius: 0.6,
    size: 0.5,
    x: 0,
    y: 0,
    z: 0,
  },
  {
    actionType: 'sideModal',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/onna-intro.appspot.com/o/icon%2Ficon_restaurant.png?alt=media&token=459b4adf-126a-421c-acbf-2a60f01ef5c3',
    label: '식당가',
    linkUrl:
      'https://www.google.co.kr/maps/search/%EC%9D%8C%EC%8B%9D%EC%A0%90/data=!4m8!2m7!3m5!2z64yA7KCE7JiI7Iig7J2Y7KCE64u5!3s0x3565497e314a6159:0x74d254ce6fe303e1!4m2!1d127.383661!2d36.3664537!6e5?hl=ko&entry=ttu',
    radius: 0.6,
    size: 0.5,
    x: 0,
    y: 0,
    z: 0,
  },
];

// const CategoryTitle = [
//   {
//     Type: 'NONE',
//     createdAt: Date.now(),
//     updatedAt: Date.now(),
//     deletedAt: Date.now(),
//     hasChild: true,
//     level: 1,
//     order: 0,
//     parentId: '',
//     pathway: {},
//     version: 1,
//     title: 'A',
//   },
//   {
//     Type: 'NONE',
//     createdAt: Date.now(),
//     updatedAt: Date.now(),
//     deletedAt: Date.now(),
//     hasChild: true,
//     level: 1,
//     order: 0,
//     parentId: '',
//     pathway: {},
//     version: 1,
//     title: 'B',
//   },
//   {
//     Type: 'NONE',
//     createdAt: Date.now(),
//     updatedAt: Date.now(),
//     deletedAt: Date.now(),
//     hasChild: true,
//     level: 1,
//     order: 0,
//     parentId: '',
//     pathway: {},
//     version: 1,
//     title: 'C',
//   },
//   {
//     Type: 'NONE',
//     createdAt: Date.now(),
//     updatedAt: Date.now(),
//     deletedAt: Date.now(),
//     hasChild: true,
//     level: 1,
//     order: 0,
//     parentId: '',
//     pathway: {},
//     version: 1,
//     title: 'D',
//   },
// ];
//
// const CategoryData = [
//   {
//     Type: 'link',
//     createdAt: Date.now(),
//     updatedAt: Date.now(),
//     deletedAt: Date.now(),
//     hasChild: false,
//     level: 1,
//     order: 0,
//     parentId: '',
//     pathway: {},
//     version: 1,
//     title: 'Fe01',
//   },
//   {
//     Type: 'link',
//     createdAt: Date.now(),
//     updatedAt: Date.now(),
//     deletedAt: Date.now(),
//     hasChild: false,
//     level: 1,
//     order: 0,
//     parentId: '',
//     pathway: {},
//     version: 1,
//     title: '장생포문화창고',
//   },
//   {
//     Type: 'link',
//     createdAt: Date.now(),
//     updatedAt: Date.now(),
//     deletedAt: Date.now(),
//     hasChild: false,
//     level: 1,
//     order: 0,
//     parentId: '',
//     pathway: {},
//     version: 1,
//     title: '롯데호텔울산',
//   },
//   {
//     Type: 'link',
//     createdAt: Date.now(),
//     updatedAt: Date.now(),
//     deletedAt: Date.now(),
//     hasChild: false,
//     level: 1,
//     order: 0,
//     parentId: '',
//     pathway: {},
//     version: 1,
//     title: 'Ueco',
//   },
//   {
//     Type: 'link',
//     createdAt: Date.now(),
//     updatedAt: Date.now(),
//     deletedAt: Date.now(),
//     hasChild: false,
//     level: 1,
//     order: 0,
//     parentId: '',
//     pathway: {},
//     version: 1,
//     title: '울산공항',
//   },
//   {
//     Type: 'link',
//     createdAt: Date.now(),
//     updatedAt: Date.now(),
//     deletedAt: Date.now(),
//     hasChild: false,
//     level: 1,
//     order: 0,
//     parentId: '',
//     pathway: {},
//     version: 1,
//     title: '현대자동차 울산공장',
//   },
//   {
//     Type: 'link',
//     createdAt: Date.now(),
//     updatedAt: Date.now(),
//     deletedAt: Date.now(),
//     hasChild: false,
//     level: 1,
//     order: 0,
//     parentId: '',
//     pathway: {},
//     version: 1,
//     title: '조선해양(현대중공업&미포조선)',
//   },
//   {
//     Type: 'link',
//     createdAt: Date.now(),
//     updatedAt: Date.now(),
//     deletedAt: Date.now(),
//     hasChild: false,
//     level: 1,
//     order: 0,
//     parentId: '',
//     pathway: {},
//     version: 1,
//     title: '석유화학',
//   },
//   {
//     Type: 'link',
//     createdAt: Date.now(),
//     updatedAt: Date.now(),
//     deletedAt: Date.now(),
//     hasChild: false,
//     level: 1,
//     order: 0,
//     parentId: '',
//     pathway: {},
//     version: 1,
//     title: '대왕암공원',
//   },
//   {
//     Type: 'link',
//     createdAt: Date.now(),
//     updatedAt: Date.now(),
//     deletedAt: Date.now(),
//     hasChild: false,
//     level: 1,
//     order: 0,
//     parentId: '',
//     pathway: {},
//     version: 1,
//     title: '반구대암각화',
//   },
//   {
//     Type: 'link',
//     createdAt: Date.now(),
//     updatedAt: Date.now(),
//     deletedAt: Date.now(),
//     hasChild: false,
//     level: 1,
//     order: 0,
//     parentId: '',
//     pathway: {},
//     version: 1,
//     title: '태화강국가정원',
//   },
//   {
//     Type: 'link',
//     createdAt: Date.now(),
//     updatedAt: Date.now(),
//     deletedAt: Date.now(),
//     hasChild: false,
//     level: 1,
//     order: 0,
//     parentId: '',
//     pathway: {},
//     version: 1,
//     title: '영남알프스',
//   },
// ];

export async function InsertIcon() {
  const daejeonPath = "intro_3d/Jp6RYo6saJ7aiVpKXcEs";
  // const ulsanPath : "intro_3d/24MNk1rIJ6KMb669P9yD"

  for (const v of DaejeonIcons) {
    await firestore()
      .collection(daejeonPath + '/icons')
      .doc()
      .set(v);
  }
}

// export async function insertCategory() {
//   const path = ""
//   for (const v of CategoryTitle) {
//     await firestore()
//       .collection(path + '/category')
//       .doc()
//       .set(v);
//   }
// }
