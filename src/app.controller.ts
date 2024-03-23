import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Prisma, User } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('user.create')
  handleCreateUser(@Payload() data: Prisma.UserCreateInput): Promise<User> {
    return this.appService.createUser(data);
  }

  @MessagePattern('user.detail')
  handleGetUserDetail(@Payload() id: number): Promise<User> {
    const data = Prisma.validator<Prisma.UserWhereUniqueInput>()({
      id: +id,
    });
    return this.appService.findUser(data);
  }
}
