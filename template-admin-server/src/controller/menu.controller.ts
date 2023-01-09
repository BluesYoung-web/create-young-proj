/*
 * @Author: zhangyang
 * @Date: 2022-12-29 11:10:38
 * @LastEditTime: 2023-01-06 16:53:43
 * @Description:
 */
import { Inject, Controller, Get, Post, Body, Patch, Del, Param } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { Validate } from '@midwayjs/validate';
import { MenuService, RoleService, UserService } from '../service';
import * as dayjs from 'dayjs';
import { MenuCreateDTO, MenuUpdateDTO } from './dto';
import { CacheManager } from '@midwayjs/cache';
import { Menu } from '../entities/index';

@Controller('/menu')
export class MenuController {
  @Inject()
  ctx: Context;

  @Inject()
  cacheManager: CacheManager;

  @Inject()
  menuService: MenuService;

  @Inject()
  userService: UserService;

  @Inject()
  roleService: RoleService;

  @Get('/list')
  @Validate()
  async getMenuTree() {
    const data = await this.menuService.getAllTree();
    return this.ctx.helper.success({ data });
  }

  @Post('/create')
  @Validate()
  async createMenu(@Body() form: MenuCreateDTO) {
    const { parentId: pid = 0, name = '', title = '', icon = 'store', sort = 0, component } = form;

    if (component && !component.startsWith('/')) {
      return this.ctx.helper.fail({ msg: '路径不合法' });
    }

    const { username, nickname } = this.ctx.state.user;

    try {
      await this.menuService.create({
        name,
        title,
        icon,
        sort,
        component,
        pid: Number(pid),
        creator: nickname || username,
      });
      return this.ctx.helper.success();
    } catch (error) {
      return this.ctx.helper.fail({ msg: (error as Error).message });
    }
  }

  @Get('/tree')
  async getSelfMenuTree() {
    const { username } = this.ctx.state.user;
    const cacheKey = `${username}.menu.tree`;

    const menus = await this.cacheManager.cache.get<Menu[]>(cacheKey);
    if (menus) {
      return this.ctx.helper.success({ data: menus });
    }

    const user = await this.userService.findOne({ username });
    if (user) {
      // @ts-expect-error
      const id = user.roleId;
      const role = await this.roleService.findOne({ id });
      if (role) {
        const menus = await this.roleService.getAccessMenusTree(role.id);
        // 设置 1 分钟缓存
        await this.cacheManager.set(cacheKey, menus, { ttl: 60 });
        return this.ctx.helper.success({ data: menus });
      } else {
        return this.ctx.helper.fail({ msg: '角色不存在！' });
      }
    } else {
      return this.ctx.helper.fail({ msg: '用户不存在！' });
    }
  }

  @Patch('/update/:menuId')
  async update(@Param('menuId') id: string, @Body() form: MenuUpdateDTO) {
    const { parentId: pid, name, title, icon, sort, status, component, visible } = form;

    try {
      await this.menuService.update(Number(id), {
        name,
        title,
        icon,
        sort,
        status,
        component,
        pid,
        visible,
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
      await this.menuService.deleteBatch(ids.split(',').map((i: string) => Number(i)));
      return this.ctx.helper.success();
    } catch (error) {
      return this.ctx.helper.fail({ msg: (error as Error).message });
    }
  }

  @Get('/all/:roleId')
  async getRoleAccessMenus(@Param('roleId') roleId: number) {
    const apis = await this.roleService.getAccessMenus(roleId);
    const list = await this.menuService.getAllTree();
    return this.ctx.helper.success({
      data: {
        accessIds: apis.map((i) => Number(i.id)),
        list,
      },
    });
  }
}
