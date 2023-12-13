import { Feedback } from './feedback';

// event.model.ts
export class Event {
  eventId!: number;
  eventName!: string;
  date!: string;
  location!: string;
  description!: string;
  image!: string;
  price!: number;
  url!: string;
  feedbackList!: Feedback[];
}
