/*
 * @Author: zhangyang
 * @Date: 2022-12-27 11:23:39
 * @LastEditTime: 2022-12-28 16:31:12
 * @Description:
 */
import { Inject, Controller, Get, Query, Post, Body, Patch, Param, Del } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { Validate } from '@midwayjs/validate';
import * as dayjs from 'dayjs';
import * as md5 from 'md5';
import { type CreateUserItem, UserService } from '../service';
import { UserCreateDTO, UserQueryDTO, UserUpdateDTO } from './dto';

@Controller('/user')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/list')
  @Validate()
  async getUserList(@Query() query: UserQueryDTO) {
    const data = await this.userService.findAll(query);
    return this.ctx.helper.success({ data });
  }

  @Post('/info')
  async getUserInfo() {
    const { username } = this.ctx.state.user;

    const user = await this.userService.findOne({ username });
    if (user) {
      const data: CreateUserItem = {
        ...user,
      };
      delete data.password;
      delete data.createdAt;
      delete data.updateAt;
      delete data.creator;
      delete data.status;
      delete data.sort;
      // @ts-expect-error
      delete data.roleId;

      return this.ctx.helper.success({ data });
    } else {
      return this.ctx.helper.fail({ msg: '用户不存在！' });
    }
  }

  @Post('/create')
  @Validate()
  async createUser(@Body() form: UserCreateDTO) {
    const { roleId: rid, username, nickname = '', initPassword: pwd, mobile = '' } = form;

    const key = this.ctx.app.getConfig('keys');

    try {
      const { username: u, nickname: n } = this.ctx.state.user;
      await this.userService.create({
        username,
        nickname,
        creator: n || u,
        password: md5(`${key}${pwd}`),
        mobile,
        rid,
      });
      return this.ctx.helper.success();
    } catch (error) {
      return this.ctx.helper.fail({ msg: (error as Error).message });
    }
  }

  @Patch('/update/:userId')
  async update(@Param('userId') id: string, @Body() form: UserUpdateDTO) {
    const { username, nickname, mobile, roleId: rid, status, newPassword } = form;

    const key = this.ctx.app.getConfig('keys');

    try {
      await this.userService.update(Number(id), {
        username,
        nickname,
        mobile,
        rid,
        status,
        password: newPassword ? md5(`${key}${newPassword}`) : undefined,
        updateAt: dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      });
      return this.ctx.helper.success();
    } catch (error) {
      return this.ctx.helper.fail({ msg: (error as Error).message });
    }
  }

  @Del('/delete/batch')
  async del(@Body('ids') ids: string) {
    try {
      await this.userService.deleteBatch(ids.split(',').map((i: string) => Number(i)));
      return this.ctx.helper.success();
    } catch (error) {
      return this.ctx.helper.fail({ msg: (error as Error).message });
    }
  }
}
