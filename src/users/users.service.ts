import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserBody } from './types/user.types';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { GuestOrderDto } from 'src/guest/dtos/guestOrder.dto';
import { Plan } from './entities/plan.entity';
import { UserOrders } from './entities/userOrders.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Plan) private planRepository : Repository<Plan>,
    @InjectRepository(UserOrders) private userOrdersRepository : Repository<UserOrders>,
    private configService: ConfigService,
  ) {}

  findUsers() {
    return this.userRepository.find({
      select: ['profile_picture', 'username', 'address', 'email'],
    });
  }

  findOneUser(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  findUserByUsername(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async createUser(userDetails: CreateUserBody) {
    let rawPassword = userDetails.password;
    let hashString = this.configService.getOrThrow('HASH');
    hashString = parseInt(hashString)
    const saltText = this.configService.getOrThrow('SALT_TEXT')
    const salt = await bcrypt.genSalt()
    const password = await bcrypt.hash(rawPassword, salt);
    userDetails = { ...userDetails, password };
    const newUser = this.userRepository.create(userDetails);
    return this.userRepository.save(newUser);
  }

  async createUserOrder(userOrders: GuestOrderDto[], id : number){
    const user = await this.userRepository.findOneBy({
      id
    })
    const remnant = user.remnant
    const totalQuantity = userOrders.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.quantity;
    }, 0)
    const newRemnant = remnant - totalQuantity
    if (newRemnant < 0 ){
      throw new HttpException(
        "your order exceeded it's limit",
        HttpStatus.BAD_REQUEST
      )
    }
    let userOrder : UserOrders[] = []
    for (let i = 0; i < userOrders.length ; i++ ){
      let order = this.userOrdersRepository.create(userOrders[i])
      await this.userOrdersRepository.save(order)
      userOrder.push(order)
    }
    user.userOrders = userOrder;
    user.remnant = newRemnant;
    await this.userRepository.save(user)
    return true
  }

  async selectPlan(plan : string, userId : number) : Promise<boolean>{
    try {
      const planValue = await this.planRepository.findOneBy({
        type : plan.toLocaleUpperCase()
      })
      const remnant = plan == "basic" ? 35 : 45
      await this.userRepository.update({id : userId}, {plan : planValue, remnant })
      return true
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }
}
