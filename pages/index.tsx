import Head from "next/head";
import Header from "../components/Header";
import { sanityClient, urlFor } from "../sanity";
import HomeBanner from "../components/HomeBanner";
import { Post } from "../typing";
import Link from "next/link";
interface Props {
  posts: [Post];
}
const Home = ({ posts }: Props) => {
  console.log("hello", posts);
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <HomeBanner />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
        {posts.map((post) => (
          <Link href={`/posts/${post.slug.current}`} key={post._id}>
            <div className="group border rounded-lg overflow-hidden">
              <img
                className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                src={urlFor(post.mainImage).url()!}
                alt=""
              />
              <div className="flex justify-between p-5 bg-white-50">
                <div className="">
                  <p className="text-lg font-bold">{post.title}</p>
                  <p className="text-sm ">
                    {post.description} by {post.author.name}
                  </p>
                </div>
                <img
                  className="h-12 w-12 rounded-full"
                  src={urlFor(post.author.image).url()!}
                  alt=""
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const query = `*[_type== "post"]{
    _id,
    title,
    slug,
    author ->{
      name,
      image
    },
      description,
      mainImage,
}`;
  const posts = await sanityClient.fetch(query);
  return {
    props: {
      posts,
    },
  };
};
