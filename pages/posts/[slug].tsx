import { GetStaticProps } from "next";
import React, { useState } from "react";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typing";
import { useForm, SubmitHandler } from "react-hook-form";
import PortableText from "react-portable-text";
interface Props {
  post: Post;
}
interface IformInput {
  name: string;
  email: string;
  comment: string;
  _id: string;
}
const Post = ({ post }: Props) => {
  console.log(post.comment);
  const [submit, setSubmit] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IformInput>();
  const onSubmit: SubmitHandler<IformInput> = async (data) => {
    await fetch("../api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data);
        setSubmit(true);
      })
      .catch((err) => {
        console.log(err);
        setSubmit(false);
      });
  };
  return (
    <main>
      <Header />
      <img
        className="w-full h-40 object-cover"
        src={urlFor(post.mainImage).url()}
        alt=""
      />
      <article className="max-w-3xl mx-auto p-5 ">
        <h1 className="mt-10 mb-3 text-3xl">{post.title}</h1>
        <h2 className="text-xl font-light mb-2 text-gray-500">
          {post.description}
        </h2>
        <div className="flex items-center space-x-2">
          <img
            src={urlFor(post.author.image).url()}
            alt=""
            className="h-10 w-10 rounded-full"
          />
          <p className="font-extralight text-sm">
            Blog post by{" "}
            <span className="text-green-600">{post?.author?.name}</span> -
            Published At {post._createdAt}
          </p>
        </div>
        <div className="mt-10">
          <PortableText
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            content={post.body}
            serializers={{
              h1: (props: any) => (
                <h1 className="text-2xl my-5 font-bold">{...props}</h1>
              ),
              h2: (props: any) => (
                <h2 className="text-xl my-5 font-bold">{...props}</h2>
              ),
              li: ({ children }: any) => (
                <li className="ml-4 list-disc">{children}</li>
              ),
              link: ({ href, children }: any) => (
                <a href={href} className="text-blue-500 hover:underline">
                  {children}
                </a>
              ),
            }}
          />
        </div>
      </article>
      <hr className="max-w-lg my-5 mx-auto border border-yellow-500" />
      {submit ? (
        <div className="flex flex-col p-10 my-10 bg-yellow-500 text-white max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold">
            Thank you for submitting your comment!
          </h3>
          <p className="">Once approved it will we shown under.</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col p-5 max-w-2xl mx-auto mb-10"
        >
          <h3 className="text-sm text-yellow-500">Enjoyed this article?</h3>
          <h4 className="text-3xl font-bold">Leave a comment below!</h4>
          <hr className="py-4 mt-2 " />
          <input
            type="hidden"
            {...register("_id")}
            name="_id"
            value={post._id}
          />

          <label className="block mb-5 ">
            <span className="text-gray-700">Name</span>
            <input
              className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring"
              type="text"
              // name=""
              // id=""
              {...register("name", { required: true })}
              placeholder="Name"
            />
          </label>
          <label className="block mb-5 ">
            <span className="text-gray-700">Email</span>
            <input
              className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring"
              type="email"
              {...register("email", { required: true })}
              placeholder="Email"
            />
          </label>
          <label className="block mb-5 ">
            <span className="text-gray-700">Comment</span>
            <textarea
              {...register("comment", { required: true })}
              className="shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 outline-none focus:ring"
              rows={8}
              placeholder="Comment"
            />
          </label>
          <div className="flex flex-col p-5">
            {errors.name && <p className="text-red-500">- Name is required</p>}
            {errors.email && (
              <p className="text-red-500">- Email is required</p>
            )}
            {errors.comment && (
              <p className="text-red-500">- Comment is required</p>
            )}
          </div>
          <input
            type="submit"
            className="bg-yellow-500 shadow hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          />
        </form>
      )}
      {/* Comments */}
      <div className="flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-yellow-500 space-y-2 shadow rounded-xl">
        <h3 className="text-4xl">Comments</h3>
        <hr className="max-w-lg my-5 mx-auto border border-yellow-500" />
        {post.comment.map((com) => {
          return (
            <div key={com._id} className="flex flex-col p-2">
              <p className="text-sm">
                <span className="text-yellow-500 font-bold">{com.name} </span>
                {com.comment}
              </p>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Post;

export const getStaticPaths = async () => {
  const query = `*[_type== "post"]{
        _id,
        slug
    }`;
  const posts = await sanityClient.fetch(query);
  const paths = posts.map((post: Post) => {
    return {
      params: {
        slug: post.slug.current,
      },
    };
  });
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type== "post" && slug.current == $slug][0]{
            _id,
            _createdAt,
            title,
            author ->{
                name,
                image
            },
            mainImage,
            body,
            description,
            slug,
            "comment":*[
              _type=="comment" &&
              approved==true &&
              post._ref==^._id
            ]
        }`;
  const post = await sanityClient.fetch(query, { slug: params?.slug });
  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
    revalidate: 60, // 60 seconds
  };
};
