import { Body, Controller, Post } from "@nestjs/common";
import { CreateAdminDto } from "./dto/sign-in.dto";
import { AdminService } from "./admin.service";

@Controller('admin')
export class AdminController{
    constructor (private readonly adminService : AdminService ){}


    @Post()
    createAdmin(@Body() dto : CreateAdminDto){
        return this.adminService.create(dto)
    }

    

}