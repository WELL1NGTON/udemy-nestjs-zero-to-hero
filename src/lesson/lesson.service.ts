import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './lesson.input';
import { Student } from 'src/student/student.entity';

@Injectable()
export class LessonService {
  async getLesson(id: string): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne({ id });

    return lesson;
  }
  constructor(@InjectRepository(Lesson) private lessonRepository: Repository<Lesson>) {}

  async getLessons(): Promise<Lesson[]> {
    return this.lessonRepository.find();
  }

  createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate, students } = createLessonInput;

    const lesson = this.lessonRepository.create({
      id: uuid(),
      name,
      startDate,
      endDate,
      students,
    });

    return this.lessonRepository.save(lesson);
  }

  async assignStudentsToLesson(lessonId: string, studentIds: string[]): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne({ id: lessonId });
    lesson.students = [...lesson.students, ...studentIds];

    return this.lessonRepository.save(lesson);
  }
}
