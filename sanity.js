import {
  createClient,
  // createImageUrlBuilder,
  // createCurrentUserHook,
} from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";
// import createCurrentUserHook from "@sanity/current-user/hook";


const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2021-03-25",
  useCdn: process.env.NODE_ENV === "production",
};
export const sanityClient = createClient(config);

export const urlFor = (source) => createImageUrlBuilder(config).image(source);

// export const useCurrentUser = createCurrentUserHook(config);
