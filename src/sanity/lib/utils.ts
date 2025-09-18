import { dataset, projectId } from "./api";
import createImageUrlBuilder from "@sanity/image-url";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "", dataset: dataset || "",
});

export const urlForImage = (source: {
  asset?: {
    _ref: string;
  };
}) => {
  if (!source?.asset?._ref) { return undefined; }
  return imageBuilder?.image(source).auto("format").fit("max");
};

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).replace(/(\d+)/, (match) => {
    const num = parseInt(match);
    const suffix = ['th', 'st', 'nd', 'rd'][
      (num > 3 && num < 21) || num % 10 > 3 ? 0 : num % 10
    ];
    return match + suffix;
  });
};