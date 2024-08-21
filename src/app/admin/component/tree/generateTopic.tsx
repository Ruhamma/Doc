import { Topic } from "@/types/topic";

export const generateTopicTree = (
  topics: Topic[],
  allTopics: Topic[]
): (Topic & { subTopics: Topic[] })[] => {
  if (topics.length <= 0) {
    return [];
  }

  return topics.map((topic) => {
    const children = allTopics.filter(
      (subcategories) => subcategories.parentCategoryId === topic.id
    );
    return {
      ...topic,
      subTopics: generateTopicTree(children, allTopics),
    };
  });
};
