import { Body, Controller, Post, Res } from "@nestjs/common";
import { AdminDto as AdminDto } from "./dto/admin.dto";
import { AdminService } from "./admin.service";
import { SignInDto } from "./dto/signIn.dto";
import { Throttle } from "@nestjs/throttler";
import type { Response } from "express";
    
@Controller('admin')
export class AdminController{
    constructor (private readonly adminService : AdminService ){}


    
    @Post('create')
    createAdmin(@Body() dto : AdminDto){
        return this.adminService.create(dto)                 
    }

    @Throttle({default : {limit : 5, ttl : 60000}}) // sign In ga request yuborvatganda, necha millisekundda nechta requst yoborish mumkinlgi
    @Post('signIn')
    signIn(@Body() dto : SignInDto, @Res({passthrough : true} ) res : Response){
        return this.adminService.signIn(dto, res)
    }

}