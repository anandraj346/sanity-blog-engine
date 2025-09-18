import { NextRequest } from "next/server";
import { client } from "@/sanity/lib/client";

const FIELDS = `
  _id,
  _type,
  _createdAt,
  title,
  'slug': slug.current,
  excerpt,
  category->{
    _id,
    title,
    'slug': slug.current
  },
  author->{
    _id,
    name,
    username,
    bio,
    avatar { asset->{ url } }
  },
  image { asset->{ url }, altText }
`;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const offset = Math.max(parseInt(searchParams.get("offset") || "0", 10), 0);
    const limitRaw = Math.max(parseInt(searchParams.get("limit") || "9", 10), 1);
    const limit = Math.min(limitRaw, 50);

    const query = `
      *[_type == 'post'] 
        | order(_createdAt desc) 
        [${offset}...${offset + limit}] { ${FIELDS} }
    `;

    const data = await client.fetch(query);
    return Response.json({ data });
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}