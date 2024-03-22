import { HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { generatePaystackRef, paystackInstance } from 'src/uitls/helpers';
import { PaystackUserDto } from 'src/users/types/user.types';
import { UsersService } from 'src/users/users.service';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { Guest } from 'src/guest/entities/guest.entity';
import { GuestService } from 'src/guest/guest.service';
import { Role } from 'src/auth/dtos/role.enum';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class PaymentService {
  constructor(
  @InjectRepository(Transaction) private transactionRepository: Repository<Transaction>,
    private usersService: UsersService,
    private guestService: GuestService,
    private configService : ConfigService,
    @InjectRepository(Guest) private guestRepository: Repository<Guest>,
    @InjectRepository(User) private userRepository: Repository<User>) {}

  async initializeTransaction(userDetails: PaystackUserDto) {
    const user = await this.guestService.findById(userDetails.id);
    
    const reference = generatePaystackRef()
    const data = {
      email: user[0].email,
      amount: userDetails.amount,
      reference
    };
    let transactionData = {
      transactionRef : reference,
      transactionDate : new Date(),
      module : "GUEST",
      status : "INITIALIZED",
      userId : userDetails.id,
      amount : userDetails.amount
    }
    const transaction = this.transactionRepository.create(transactionData)
    await this.transactionRepository.save(transaction)
    await this.guestRepository.update(userDetails, {transactionRef : reference})

    const paystackRes = paystackInstance
      .post('/transaction/initialize', data)
      .then(function (response) {
        return {
          status: HttpStatus.CREATED,
          data: response.data.data,
          message: response.data.message,
        };
      })
      .catch(function (error) {
        return {
          status: HttpStatus.BAD_REQUEST,
          data: error,
          message: error.message,
        };
      });
    return paystackRes;
  }


async webhook(paystackBody : any, headers : string){
  const secret = this.configService.getOrThrow('PAYSTACK_SECRET_KEY');
  const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(paystackBody)).digest('hex');
  if (hash == headers){
    await this.guestRepository.update({transactionRef : paystackBody.data.reference}, {isPaid : true})
    return true
  }
  else {
    return false
  }
}


async subscribe(userDetails: PaystackUserDto){
  const user = await this.userRepository.findBy({
    id : userDetails.id
  });
  const reference = generatePaystackRef()
    const data = {
      email: user[0].email,
      amount: userDetails.amount,
      reference
    };
    let transactionData = {
      transactionRef : reference,
      transactionDate : new Date(),
      module : "GUEST",
      status : "INITIALIZED",
      userId : userDetails.id,
      amount : userDetails.amount
    }
    const transaction = this.transactionRepository.create(transactionData)
    await this.transactionRepository.save(transaction)
    const paystackRes = paystackInstance
      .post('/transaction/initialize', data)
      .then(function (response) {
        return {
          status: HttpStatus.CREATED,
          data: response.data.data,
          message: response.data.message,
        };
      })
      .catch(function (error) {
        return {
          status: HttpStatus.BAD_REQUEST,
          data: error,
          message: error.message,
        };
      });
    return paystackRes;

}
}


