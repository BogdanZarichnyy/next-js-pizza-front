import { Story, StoryItem } from '@prisma/client';
import { axiosInstance } from './instance';

export type TypeStory = Story & {
  items: StoryItem[];
};

export const getAll = async () => {
  const { data } = await axiosInstance.get<TypeStory[]>('/stories');

  return data;
};
