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
      requirements: z.object({
        cn: z.array(z.string()).optional(),
        en: z.array(z.string()).optional()
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

export async function GET() {
  const data = await readStore();
  return NextResponse.json(data, { headers: { 'cache-control': 'no-store' } });
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const parsed = CareersSchema.parse(body);
    await writeStore(parsed);
    return NextResponse.json({ ok: true }, { headers: { 'cache-control': 'no-store' } });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'Invalid payload' }, { status: 400 });
  }
}
