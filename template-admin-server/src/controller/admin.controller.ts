/*
 * @Author: zhangyang
 * @Date: 2022-12-27 15:15:30
 * @LastEditTime: 2023-01-09 15:29:49
 * @Description:
 */
import { Controller, Inject, Post } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import * as md5 from 'md5';
import {
  UserService,
  ApiService,
  RoleService,
  MenuService,
  CreateMenuItem,
  CreateApiItem,
  CreateRoleItem,
  CreateUserItem,
} from '../service';

const creator = '系统自动创建';
const initMenu = async (ctx: Context, service: MenuService) => {
  const defaultMenus: CreateMenuItem[] = [
    {
      id: 1,
      name: 'dashboardRoot',
      title: '首页根目录',
      component: '',
      creator,
      icon: 'dashboard',
      visible: 0,
    },
    {
      id: 2,
      name: 'systemRoot',
      title: '系统设置根目录',
      component: '',
      creator,
      icon: 'component',
    },
    {
      id: 3,
      name: 'system',
      title: '系统设置',
      component: '',
      creator,
      icon: 'component',
      pid: 2,
    },
    {
      id: 4,
      name: 'dashboard',
      title: '首页',
      component: '/dashboard/index',
      creator,
      icon: 'dashboard',
      pid: 1,
      visible: 0,
    },
    {
      id: 5,
      name: 'menu',
      title: '菜单管理',
      component: '/system/menuList',
      creator,
      icon: 'tree-table',
      pid: 3,
    },
    {
      id: 6,
      name: 'role',
      title: '角色管理',
      component: '/system/role',
      creator,
      icon: 'peoples',
      pid: 3,
    },
    {
      id: 7,
      name: 'user',
      title: '用户管理',
      component: '/system/user',
      creator,
      icon: 'user',
      pid: 3,
    },
    {
      id: 8,
      name: 'api',
      title: '接口管理',
      component: '/system/api',
      creator,
      icon: 'tree',
      pid: 3,
    },
  ];

  await service.createBatch(defaultMenus);
  ctx.logger.info('菜单初始化成功！');
};

const initApi = async (ctx: Context, service: ApiService) => {
  const defaultApis: CreateApiItem[] = [
    {
      id: 1,
      creator,
      category: 'base',
      path: '/base/login',
      method: 'POST',
      desc: '登录',
    },
    {
      id: 2,
      creator,
      category: 'base',
      path: '/base/logout',
      method: 'POST',
      desc: '退出登录',
    },
    {
      id: 3,
      creator,
      category: 'user',
      path: '/user/info',
      method: 'POST',
      desc: '获取当前用户信息',
    },
    {
      id: 4,
      creator,
      category: 'user',
      path: '/user/list',
      method: 'GET',
      desc: '获取用户列表',
    },
    {
      id: 5,
      creator,
      category: 'user',
      path: '/user/changePwd',
      method: 'PUT',
      desc: '修改登录密码',
    },
    {
      id: 6,
      creator,
      category: 'user',
      path: '/user/create',
      method: 'POST',
      desc: '创建用户',
    },
    {
      id: 7,
      creator,
      category: 'user',
      path: '/user/update/:userId',
      method: 'PATCH',
      desc: '修改用户信息',
    },
    {
      id: 8,
      creator,
      category: 'user',
      path: '/user/delete/batch',
      method: 'DELETE',
      desc: '批量删除用户',
    },
    {
      id: 9,
      creator,
      category: 'menu',
      path: '/menu/tree',
      method: 'GET',
      desc: '获取当前用户菜单',
    },
    {
      id: 10,
      creator,
      category: 'menu',
      path: '/menu/list',
      method: 'GET',
      desc: '获取菜单列表',
    },
    {
      id: 11,
      creator,
      category: 'menu',
      path: '/menu/all/:roleId',
      method: 'GET',
      desc: '获取指定角色的菜单列表',
    },
    {
      id: 12,
      creator,
      category: 'menu',
      path: '/menu/create',
      method: 'POST',
      desc: '创建菜单',
    },
    {
      id: 13,
      creator,
      category: 'menu',
      path: '/menu/update/:menuId',
      method: 'PATCH',
      desc: '修改菜单信息',
    },
    {
      id: 14,
      creator,
      category: 'menu',
      path: '/menu/delete/batch',
      method: 'DELETE',
      desc: '批量删除菜单',
    },
    {
      id: 15,
      creator,
      category: 'role',
      path: '/role/list',
      method: 'GET',
      desc: '获取角色列表',
    },
    {
      id: 16,
      creator,
      category: 'role',
      path: '/role/create',
      method: 'POST',
      desc: '创建角色',
    },
    {
      id: 17,
      creator,
      category: 'role',
      path: '/role/update/:roleId',
      method: 'PATCH',
      desc: '修改角色信息',
    },
    {
      id: 18,
      creator,
      category: 'role',
      path: '/role/menus/update/:roleId',
      method: 'PATCH',
      desc: '修改角色的菜单列表',
    },
    {
      id: 19,
      creator,
      category: 'role',
      path: '/role/apis/update/:roleId',
      method: 'PATCH',
      desc: '修改角色的接口列表',
    },
    {
      id: 20,
      creator,
      category: 'role',
      path: '/role/delete/batch',
      method: 'DELETE',
      desc: '批量删除角色',
    },
    {
      id: 21,
      creator,
      category: 'api',
      path: '/api/list',
      method: 'GET',
      desc: '获取接口列表',
    },
    {
      id: 22,
      creator,
      category: 'api',
      path: '/api/all/category/:roleId',
      method: 'GET',
      desc: '获取指定角色的接口列表(以类分组)',
    },
    {
      id: 23,
      creator,
      category: 'api',
      path: '/api/create',
      method: 'POST',
      desc: '创建接口',
    },
    {
      id: 24,
      creator,
      category: 'api',
      path: '/api/update/:apiId',
      method: 'PATCH',
      desc: '修改接口信息',
    },
    {
      id: 25,
      creator,
      category: 'api',
      path: '/api/delete/batch',
      method: 'DELETE',
      desc: '批量删除接口',
    },
  ];

  await service.createBatch(defaultApis);
  ctx.logger.info('接口初始化成功！');
};

const initRole = async (ctx: Context, service: RoleService) => {
  const defaultRoles: CreateRoleItem[] = [
    {
      id: 1,
      creator,
      name: '超级管理员',
      keyword: 'super',
      desc: '超管',
      aid: new Array(25).fill(0).map((_, i) => i + 1),
      mid: new Array(8).fill(0).map((_, i) => i + 1),
    },
    {
      id: 2,
      creator,
      name: '游客',
      keyword: 'guest',
      desc: '游客',
      aid: [1, 2, 3, 5, 9],
      mid: [1, 4],
    },
  ];

  await service.createBatch(defaultRoles);
  ctx.logger.info('角色初始化成功！');
};

const initUser = async (ctx: Context, service: UserService) => {
  const key = ctx.app.getConfig('keys');
  const defaultRoles: CreateUserItem[] = [
    {
      id: 1,
      creator,
      username: 'super',
      mobile: '15111111111',
      nickname: '超级管理员',
      avatar: 'https://avatars.dicebear.com/api/bottts/1.svg',
      password: md5(`${key}123456`),
      rid: 1,
    },
    {
      id: 2,
      creator,
      username: 'guest',
      mobile: '13111111111',
      nickname: '游客',
      avatar: 'https://avatars.dicebear.com/api/bottts/2.svg',
      password: md5(`${key}111111`),
      rid: 2,
    },
  ];

  await service.createBatch(defaultRoles);
  ctx.logger.info('用户初始化成功！');
};

@Controller('/admin')
export class AdminController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Inject()
  apiService: ApiService;

  @Inject()
  roleService: RoleService;

  @Inject()
  menuService: MenuService;

  /**
   * 后台表插入基础初始数据
   * @warning 存在安全风险，仅供开发使用
   */
  @Post('/init')
  async init() {
    const ctx = this.ctx;

    await initMenu(ctx, this.menuService);
    await initApi(ctx, this.apiService);
    await initRole(ctx, this.roleService);
    await initUser(ctx, this.userService);

    return ctx.helper.success();
  }
}
