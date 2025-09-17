import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private counter = 1;

  create(createUserDto: CreateUserDto): User {
    if (this.users.find(u => u.email === createUserDto.email)) {
      throw new ConflictException('Email already exists');
    }
    const user = { id: this.counter++, ...createUserDto };
    this.users.push(user);
    return user;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find(u => u.id === id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto): User {
    const user = this.findOne(id);
    if (updateUserDto.email && this.users.some(u => u.email === updateUserDto.email && u.id !== id)) {
      throw new ConflictException('Email already exists');
    }
    Object.assign(user, updateUserDto);
    return user;
  }

  remove(id: number): void {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) throw new NotFoundException(`User with id ${id} not found`);
    this.users.splice(index, 1);
  }
}
