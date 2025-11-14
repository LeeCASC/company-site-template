// app/api/careers/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { promises as fs } from 'fs';
import path from 'path';

export const runtime = 'nodejs'; // 允许使用 fs

const DATA_FILE = path.join(process.cwd(), 'data', 'careers.json');

const CareersSchema = z.object({
  jobs: z.array(
    z.object({
      id: z.string(),
      title: z.object({ cn: z.string(), en: z.string() }),
      salary: z.object({ cn: z.string(), en: z.string() }).optional(),
      description: z.object({ cn: z.string(), en: z.string() }).optional(),
      responsibilities: z.object({
        cn: z.string().optional(),
        en: z.string().optional()
      }).optional(),
      requirements: z.object({
        cn: z.string().optional(),
        en: z.string().optional()
      }).optional(),
      workLocation: z.object({
        cn: z.string().optional(),
        en: z.string().optional()
      }).optional(),
      preferredConditions: z.object({
        cn: z.string().optional(),
        en: z.string().optional()
      }).optional()
    })
  ),
  contact: z.object({
    phone: z.string(),
    email: z.string(),
    address: z.object({ cn: z.string(), en: z.string() })
  })
});

// 读文件（若不存在则用默认）
async function readStore() {
  try {
    const buf = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(buf);
  } catch {
    // 默认数据（可与之前 MOCK 一致）
    return {
      jobs: [
        { id: 'business', title: { cn: '商务助理', en: 'Business Assistant' }, salary: { cn: '薪资待遇：面议', en: 'Salary: Negotiable' } },
        { id: 'translator', title: { cn: '现场翻译', en: 'On-site Translator' }, salary: { cn: '薪资待遇：面议', en: 'Salary: Negotiable' } },
        { id: 'freight', title: { cn: '货代操作', en: 'Freight Forwarding Operator' }, salary: { cn: '薪资待遇：面议', en: 'Salary: Negotiable' } }
      ],
      contact: {
        phone: '+63 9510941210',
        email: 'wintexlogistics@wintex.com.ph',
        address: { cn: '菲律宾马尼拉总部', en: 'Headquarters in Manila, Philippines' }
      }
    };
  }
}

async function writeStore(data: unknown) {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// 转换数据格式：将数组格式的 requirements 转换为字符串
function normalizeJobData(data: any) {
  if (Array.isArray(data.jobs)) {
    data.jobs = data.jobs.map((job: any) => {
      const normalized = { ...job };
      
      // 转换 requirements：如果是数组，转换为字符串
      if (normalized.requirements) {
        if (Array.isArray(normalized.requirements.cn)) {
          normalized.requirements.cn = normalized.requirements.cn.join('\n');
        }
        if (Array.isArray(normalized.requirements.en)) {
          normalized.requirements.en = normalized.requirements.en.join('\n');
        }
      }
      
      // 转换 responsibilities：如果是数组，转换为字符串
      if (normalized.responsibilities) {
        if (Array.isArray(normalized.responsibilities.cn)) {
          normalized.responsibilities.cn = normalized.responsibilities.cn.join('\n');
        }
        if (Array.isArray(normalized.responsibilities.en)) {
          normalized.responsibilities.en = normalized.responsibilities.en.join('\n');
        }
      }
      
      // 转换 workLocation：如果是数组，转换为字符串
      if (normalized.workLocation) {
        if (Array.isArray(normalized.workLocation.cn)) {
          normalized.workLocation.cn = normalized.workLocation.cn.join('\n');
        }
        if (Array.isArray(normalized.workLocation.en)) {
          normalized.workLocation.en = normalized.workLocation.en.join('\n');
        }
      }
      
      // 转换 preferredConditions：如果是数组，转换为字符串
      if (normalized.preferredConditions) {
        if (Array.isArray(normalized.preferredConditions.cn)) {
          normalized.preferredConditions.cn = normalized.preferredConditions.cn.join('\n');
        }
        if (Array.isArray(normalized.preferredConditions.en)) {
          normalized.preferredConditions.en = normalized.preferredConditions.en.join('\n');
        }
      }
      
      return normalized;
    });
  }
  return data;
}

export async function GET() {
  const data = await readStore();
  // 规范化数据格式，确保 requirements 是字符串格式
  const normalized = normalizeJobData(data);
  return NextResponse.json(normalized, { headers: { 'cache-control': 'no-store' } });
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    // 先规范化数据格式
    const normalized = normalizeJobData(body);
    const parsed = CareersSchema.parse(normalized);
    await writeStore(parsed);
    return NextResponse.json({ ok: true }, { headers: { 'cache-control': 'no-store' } });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'Invalid payload' }, { status: 400 });
  }
}
