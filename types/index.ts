export type Design = {
  _id: string;
  name: string;
  images: string[];
  year: number;
  category: string;
  designer: string;
};

export type Designer = {
  _id: string;
  name: string;
  surname: string;
  nationality: string;
  image: string;
};

export type DesignExtended = Omit<Design, "designer"> & {
  designer: Designer;
};

// {
//   "_id": "650b3f52e07f39fb4f13fdae",
//   "name": "Silla Barcelona",
//   "images": [
//     "https://res.cloudinary.com/dx8j6h1rb/image/upload/v1695235921/Images-MERN7/qp3uqrc8iwhs0qu2ixgr.jpg",
//     "https://res.cloudinary.com/dx8j6h1rb/image/upload/v1695235922/Images-MERN7/cpddgcaujdhgzxvctf9y.jpg"
//   ],
//   "year": 1929,
//   "category": "Silla",
//   "createdAt": "2023-09-20T18:52:02.654Z",
//   "updatedAt": "2023-09-20T18:56:13.400Z",
//   "__v": 0,
//   "designer": {
//     "_id": "650b3d31a571327ebf080a09",
//     "name": "Ludwig",
//     "surname": "Mies van der Rohe",
//     "nationality": "Alemán",
//     "image": "https://res.cloudinary.com/dx8j6h1rb/image/upload/v1695235377/Images-MERN7/mb7okbhm9qcgfpnh1xof.jpg"
//   }
// }

// {
//     "_id": "650b3f52e07f39fb4f13fdae",
//     "name": "Silla Barcelona",
//     "images": [
//       "https://res.cloudinary.com/dx8j6h1rb/image/upload/v1695235921/Images-MERN7/qp3uqrc8iwhs0qu2ixgr.jpg",
//       "https://res.cloudinary.com/dx8j6h1rb/image/upload/v1695235922/Images-MERN7/cpddgcaujdhgzxvctf9y.jpg"
//     ],
//     "year": 1929,
//     "category": "Silla",
//     "createdAt": "2023-09-20T18:52:02.654Z",
//     "updatedAt": "2023-09-20T18:56:13.400Z",
//     "__v": 0,
//     "designer": "650b3d31a571327ebf080a09"
//   },