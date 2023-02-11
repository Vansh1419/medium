export interface Post {
  title: string;
  description: string;
  slug: {
    current: string;
  };
  _createdAt: string;
  _id: string;
  author: {
    name: string;
    image: string;
  };
  mainImage: {
    asset: {
      url: string;
    };
  };
  body: [object];
  comment: Comment[];
}

export interface Comment {
  name: string;
  email: string;
  comment: string;
  _createdAt: string;
  _id: string;
  post: {
    _ref: string;
    _type: string;
  };
  approved: boolean;
  _rev: string;
  _type: string;
  _updatedAt: string;
}
