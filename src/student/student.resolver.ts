import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LessonType } from 'src/lesson/lesson.type';
import { createStudentInput } from './create-student.input';
import { StudentService } from './student.service';
import { StudentType } from './student.type';

@Resolver((_of) => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Query((_returns) => StudentType)
  async student(@Args('id') id: string) {
    return this.studentService.getStudent(id);
  }

  @Query((_returns) => [StudentType])
  async students() {
    return this.studentService.getStudents();
  }

  @Mutation((_returns) => StudentType)
  async createStudent(@Args('createStudentInput') createStudentInput: createStudentInput) {
    return this.studentService.createStudent(createStudentInput);
  }
}
