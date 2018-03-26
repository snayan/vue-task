import { User } from '../user/user';
import { Channel } from '../filter/filter';

export interface Action {
  id: number;
  name: string;
  begin_time: string;
  end_time: string;
  description: string;
  creator: User;
  create_time: string;
  update_time: string;
  channel: Channel;
  images: Array<string>;
  location: string;
  goings_count: number;
  likes_count: number;
  me_going: boolean;
  me_likes: boolean;
}

export interface List {
  data: Array<Action>;
  has_more: boolean;
}
