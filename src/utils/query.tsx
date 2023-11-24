import { firestore } from '@lib/firebase';

// type Category = {
//   Type: 'newWindowLink';
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

const CategoryTitle = [
  {
    Type: 'NONE',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    deletedAt: Date.now(),
    hasChild: true,
    level: 1,
    order: 0,
    parentId: '',
    pathway: {},
    version: 1,
    title: 'A',
  },
  {
    Type: 'NONE',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    deletedAt: Date.now(),
    hasChild: true,
    level: 1,
    order: 0,
    parentId: '',
    pathway: {},
    version: 1,
    title: 'B',
  },
  {
    Type: 'NONE',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    deletedAt: Date.now(),
    hasChild: true,
    level: 1,
    order: 0,
    parentId: '',
    pathway: {},
    version: 1,
    title: 'C',
  },
  {
    Type: 'NONE',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    deletedAt: Date.now(),
    hasChild: true,
    level: 1,
    order: 0,
    parentId: '',
    pathway: {},
    version: 1,
    title: 'D',
  },
]

const CategoryData = [
  {
    Type: 'newWindowLink',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    deletedAt: Date.now(),
    hasChild: false,
    level: 1,
    order: 0,
    parentId: '',
    pathway: {},
    version: 1,
    title: 'Fe01',
  },
  {
    Type: 'newWindowLink',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    deletedAt: Date.now(),
    hasChild: false,
    level: 1,
    order: 0,
    parentId: '',
    pathway: {},
    version: 1,
    title: '장생포문화창고',
  },
  {
    Type: 'newWindowLink',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    deletedAt: Date.now(),
    hasChild: false,
    level: 1,
    order: 0,
    parentId: '',
    pathway: {},
    version: 1,
    title: '롯데호텔울산',
  },
  {
    Type: 'newWindowLink',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    deletedAt: Date.now(),
    hasChild: false,
    level: 1,
    order: 0,
    parentId: '',
    pathway: {},
    version: 1,
    title: 'Ueco',
  },
  {
    Type: 'newWindowLink',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    deletedAt: Date.now(),
    hasChild: false,
    level: 1,
    order: 0,
    parentId: '',
    pathway: {},
    version: 1,
    title: '울산공항',
  },
  {
    Type: 'newWindowLink',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    deletedAt: Date.now(),
    hasChild: false,
    level: 1,
    order: 0,
    parentId: '',
    pathway: {},
    version: 1,
    title: '현대자동차 울산공장',
  },
  {
    Type: 'newWindowLink',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    deletedAt: Date.now(),
    hasChild: false,
    level: 1,
    order: 0,
    parentId: '',
    pathway: {},
    version: 1,
    title: '조선해양(현대중공업&미포조선)',
  },
  {
    Type: 'newWindowLink',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    deletedAt: Date.now(),
    hasChild: false,
    level: 1,
    order: 0,
    parentId: '',
    pathway: {},
    version: 1,
    title: '석유화학',
  },
  {
    Type: 'newWindowLink',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    deletedAt: Date.now(),
    hasChild: false,
    level: 1,
    order: 0,
    parentId: '',
    pathway: {},
    version: 1,
    title: '대왕암공원',
  },
  {
    Type: 'newWindowLink',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    deletedAt: Date.now(),
    hasChild: false,
    level: 1,
    order: 0,
    parentId: '',
    pathway: {},
    version: 1,
    title: '반구대암각화',
  },
  {
    Type: 'newWindowLink',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    deletedAt: Date.now(),
    hasChild: false,
    level: 1,
    order: 0,
    parentId: '',
    pathway: {},
    version: 1,
    title: '태화강국가정원',
  },
  {
    Type: 'newWindowLink',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    deletedAt: Date.now(),
    hasChild: false,
    level: 1,
    order: 0,
    parentId: '',
    pathway: {},
    version: 1,
    title: '영남알프스',
  },
];


// A : c9J4WcIquRE4nLv6b4q5 micevenue
// B : MuCVD3PzGy6MQPBfQhrR traffic
// C : x7pMRwxHW8H9PI8OSLzp industry
// D : UESBCWUuu0S5hOdXYZzL landmark
export async function insertCategory(path: String) {

  for (const v of CategoryTitle) {
    await firestore()
      .collection(path + '/category')
      .doc()
      .set(v);
  }
}


