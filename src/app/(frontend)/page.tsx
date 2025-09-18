import { Metadata } from "next";
import { processMetadata } from "@/lib/utils";
import { sanityFetch } from "@/sanity/lib/live";
import Container from "@/components/global/container";
import { PageBySlugQueryResult } from "../../../sanity.types";
import { generalSettingsQuery } from "@/sanity/lib/queries/singletons/settings";
import Heading from "@/components/shared/heading";
import { allPostsQuery } from "@/sanity/lib/queries/documents/post";
import InfinitePosts from "./blog/_components/infinite-scroll";

export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await sanityFetch({
    query: generalSettingsQuery,
    stega: false,
  });

  const page = settings?.homePage;

  if (!page) { return {} };

  return processMetadata({ data: page as PageBySlugQueryResult });
}

export default async function Home() {

  const { data: settings } = await sanityFetch({
    query: generalSettingsQuery,
  });

  if (settings?.homePage === null) return (
    <Container className="py-16">
      No Homepage Set...
    </Container>
  )

  const { data: posts } = await sanityFetch({
    query: allPostsQuery,
  });

  return (
    <div id="home">
      {posts?.length ? (
        <Container className="py-16 mt-16">
          <Heading tag="h2" size="lg" className="mb-8">Latest posts</Heading>
          <InfinitePosts pageSize={2} />
        </Container>
      ) : null}
    </div>
  )
}