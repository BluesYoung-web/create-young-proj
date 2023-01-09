/*
 * @Author: zhangyang
 * @Date: 2022-12-27 11:23:39
 * @LastEditTime: 2022-12-28 17:32:48
 * @Description:
 */
import { Inject, Controller, Get, Query, Post, Body, Patch, Del, Param } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { Validate } from '@midwayjs/validate';
import { RoleService } from '../service';
import { DiffDTO, RoleCreateDTO, RoleQueryDTO, RoleUpdateDTO } from './dto';
import * as dayjs from 'dayjs';

@Controller('/role')
export class RoleController {
  @Inject()
  ctx: Context;

  @Inject()
  roleService: RoleService;

  @Get('/list')
  @Validate()
  async getRoleList(@Query() query: RoleQueryDTO) {
    const data = await this.roleService.findAll(query);
    return this.ctx.helper.success({ data });
  }

  @Post('/create')
  @Validate()
  async createRole(@Body() form: RoleCreateDTO) {
    const { name = '', keyword = '', desc = '', sort = 0, status = 1 } = form;

    try {
      const { username, nickname } = this.ctx.state.user;
      await this.roleService.create({
        name,
        sort,
        creator: nickname || username,
        keyword,
        status,
        desc,
      });
      return this.ctx.helper.success();
    } catch (error) {
      return this.ctx.helper.fail({ msg: (error as Error).message });
    }
  }

  @Patch('/update/:roleId')
  async update(@Param('roleId') id: string, @Body() form: RoleUpdateDTO) {
    const { name, keyword, desc, sort, status } = form;

    try {
      await this.roleService.update(Number(id), {
        name,
        keyword,
        desc,
        sort,
        status,
        updateAt: dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      });
      return this.ctx.helper.success();
    } catch (error) {
      return this.ctx.helper.fail({ msg: (error as Error).message });
    }
  }

  @Patch('/menus/update/:roleId')
  @Validate()
  async changeRoleMenus(@Param('roleId') roleId: number, @Body() form: DiffDTO) {
    const { create: add = [], delete: del = [] } = form;
    try {
      await this.roleService.addMenus(roleId, add);
      await this.roleService.delMenus(roleId, del);
      return this.ctx.helper.success({
        data: {
          roleId,
          add,
          del,
        },
      });
    } catch (error) {
      return this.ctx.helper.fail({ msg: (error as Error).message });
    }
  }

  @Patch('/apis/update/:roleId')
  @Validate()
  async changeRoleApis(@Param('roleId') roleId: number, @Body() form: DiffDTO) {
    const { create: add = [], delete: del = [] } = form;
    try {
      await this.roleService.addApis(roleId, add);
      await this.roleService.delApis(roleId, del);
      return this.ctx.helper.success({
        data: {
          roleId,
          add,
          del,
        },
      });
    } catch (error) {
      return this.ctx.helper.fail({ msg: (error as Error).message });
    }
  }

  @Del('/delete/batch')
  async del(@Body('ids') ids: string) {
    try {
      await this.roleService.deleteBatch(ids.split(',').map((i: string) => Number(i)));
      return this.ctx.helper.success();
    } catch (error) {
      return this.ctx.helper.fail({ msg: (error as Error).message });
    }
  }
}
