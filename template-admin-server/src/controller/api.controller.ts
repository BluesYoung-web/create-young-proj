/*
 * @Author: zhangyang
 * @Date: 2022-12-27 11:23:39
 * @LastEditTime: 2022-12-29 11:12:18
 * @Description:
 */
import { Inject, Controller, Get, Query, Post, Body, Patch, Del, Param } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { Validate } from '@midwayjs/validate';
import { ApiService, RoleService } from '../service';
import * as dayjs from 'dayjs';
import { ApiCreateDTO, ApiQueryDTO, ApiUpdateDTO } from './dto';

@Controller('/api')
export class ApiController {
  @Inject()
  ctx: Context;

  @Inject()
  apiService: ApiService;

  @Inject()
  roleService: RoleService;

  @Get('/list')
  @Validate()
  async getApiList(@Query() query: ApiQueryDTO) {
    const data = await this.apiService.findAll(query);
    return this.ctx.helper.success({ data });
  }

  @Post('/create')
  @Validate()
  async createApi(@Body() form: ApiCreateDTO) {
    const { category = '', desc = '', method = '', path = '', roleIds: rids } = form;

    if (path && !path.startsWith('/')) {
      return this.ctx.helper.fail({ msg: '路径不合法' });
    }

    const { username: u, nickname: n } = this.ctx.state.user;

    try {
      await this.apiService.create({
        category,
        desc,
        method,
        path,
        rids,
        creator: n || u,
      });
      return this.ctx.helper.success();
    } catch (error) {
      return this.ctx.helper.fail({ msg: (error as Error).message });
    }
  }

  @Patch('/update/:apiId')
  async update(@Param('apiId') id: string, @Body() form: ApiUpdateDTO) {
    const { category, desc, method, path, roleIds: rids } = form;

    try {
      await this.apiService.update(Number(id), {
        category,
        desc,
        method,
        path,
        rids,
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
      await this.apiService.deleteBatch(ids.split(',').map((i: string) => Number(i)));
      return this.ctx.helper.success();
    } catch (error) {
      return this.ctx.helper.fail({ msg: (error as Error).message });
    }
  }

  @Get('/all/category/:roleId')
  async getRoleAccessApis(@Param('roleId') roleId: number) {
    const apis = await this.roleService.getAccessApis(roleId);
    const list = await this.apiService.getAllTree();
    return this.ctx.helper.success({
      data: {
        accessIds: apis.map((i) => Number(i.id)),
        list,
      },
    });
  }
}
