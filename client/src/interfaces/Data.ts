import { Question } from './Question';
import { NewAnswer } from './Answer';

export interface Data {
  questions: Question[];
  answers: NewAnswer[];
}
