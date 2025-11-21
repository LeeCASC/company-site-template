import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'careersPage',
  title: '招聘页面',
  type: 'document',
  fields: [
    {
      name: 'jobs',
      title: '招聘职位',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'job',
          title: '职位',
          fields: [
            {
              name: 'id',
              title: '职位 ID',
              type: 'string',
              description: '用于标识职位的唯一 ID（如：business, translator, freight）',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'title',
              title: '职位标题',
              type: 'object',
              fields: [
                {
                  name: 'cn',
                  title: '中文标题',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'en',
                  title: '英文标题',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
              ],
            },
            {
              name: 'salary',
              title: '薪资待遇',
              type: 'object',
              fields: [
                {
                  name: 'cn',
                  title: '中文薪资',
                  type: 'string',
                },
                {
                  name: 'en',
                  title: '英文薪资',
                  type: 'string',
                },
              ],
            },
            {
              name: 'description',
              title: '职位描述',
              type: 'object',
              fields: [
                {
                  name: 'cn',
                  title: '中文描述',
                  type: 'text',
                },
                {
                  name: 'en',
                  title: '英文描述',
                  type: 'text',
                },
              ],
            },
            {
              name: 'responsibilities',
              title: '核心职责',
              type: 'object',
              fields: [
                {
                  name: 'cn',
                  title: '中文职责',
                  type: 'text',
                  description: '每行一个条目，支持纯文本格式',
                },
                {
                  name: 'en',
                  title: '英文职责',
                  type: 'text',
                  description: '每行一个条目，支持纯文本格式',
                },
              ],
            },
            {
              name: 'requirements',
              title: '职位要求',
              type: 'object',
              fields: [
                {
                  name: 'cn',
                  title: '中文要求',
                  type: 'text',
                  description: '每行一个条目，支持纯文本格式',
                },
                {
                  name: 'en',
                  title: '英文要求',
                  type: 'text',
                  description: '每行一个条目，支持纯文本格式',
                },
              ],
            },
            {
              name: 'preferredConditions',
              title: '优先条件',
              type: 'object',
              fields: [
                {
                  name: 'cn',
                  title: '中文优先条件',
                  type: 'text',
                  description: '每行一个条目，支持纯文本格式',
                },
                {
                  name: 'en',
                  title: '英文优先条件',
                  type: 'text',
                  description: '每行一个条目，支持纯文本格式',
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'title.cn',
              subtitle: 'id',
            },
          },
        },
      ],
    },
    {
      name: 'contact',
      title: '联系方式',
      type: 'object',
      fields: [
        {
          name: 'phone',
          title: '电话',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'email',
          title: '邮箱',
          type: 'string',
          validation: (Rule) => Rule.required().email(),
        },
        {
          name: 'address',
          title: '地址',
          type: 'object',
          fields: [
            {
              name: 'cn',
              title: '中文地址',
              type: 'string',
            },
            {
              name: 'en',
              title: '英文地址',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'jobs.0.title.cn',
    },
    prepare() {
      return {
        title: '招聘页面',
      };
    },
  },
});

