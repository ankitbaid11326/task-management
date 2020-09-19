import { Repository, EntityRepository } from 'typeorm'
import { Task } from './tasks.entity'
import { CreateTaskDto } from './dto/create-task-dto'
import { TaskStatus } from './task-status-enum'
import { GetTaskFilterDto } from './dto/get-task-filter-dto'

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks (filterDto: GetTaskFilterDto): Promise<Task[]> {
    const { status, search } = filterDto
    const queryBuilder = this.createQueryBuilder('task')

    if (status) {
      queryBuilder.andWhere('task.status = :status', { status })
    }

    if (search) {
      queryBuilder.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` }
      )
    }

    const tasks = await queryBuilder.getMany()
    return tasks
  }

  async createTask (createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto
    const task = new Task()
    task.title = title
    task.description = description
    task.status = TaskStatus.OPEN

    await task.save()

    return task
  }
}
