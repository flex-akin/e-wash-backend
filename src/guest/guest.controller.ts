import {
  Body,
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { GuestService } from './guest.service';
import { Public } from 'src/uitls/custom.decorator';
import { CreateGuestDto } from './dtos/createGuest.dto';
import { GuestResponse } from './types/guest.types';
import { GuestOrderDto } from './dtos/guestOrder.dto';

@Controller('guest')
export class GuestController {
  constructor(private guestService: GuestService) {}

  @Public()
  @Post()
  async createGuest(
    @Body() createGuestDto: CreateGuestDto, 
  ): Promise<GuestResponse> {
    try {
      const dataValue = await this.guestService.create(createGuestDto);
  
      return {
        statusCode: HttpStatus.CREATED,
        data: dataValue.guestCode,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get()
  @Public()
  async findAllGuests() {
    const data = await this.guestService.findAll();
    return {
      statusCode: HttpStatus.OK,
      data: data,
    };
  }

  @Get(':code')
  @Public()
  async findGuestByCode(@Param('code') code: string): Promise<GuestResponse> {
    const data = await this.guestService.findByCode(code);

    return {
      statusCode: HttpStatus.OK,
      data: data[0],
    };
  }


}
