// app/api/careers/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { promises as fs } from 'fs';
import path from 'path';

export const runtime = 'nodejs'; // 允许使用 fs

const DATA_FILE = path.join(process.cwd(), 'data', 'careers.json');

// 尝试导入 Vercel KV（如果可用）
let kv: any = null;
let useKV = false;

async function initKV() {
  if (useKV && kv) return kv;
  
  // 检查环境变量
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    try {
      const kvModule = await import('@vercel/kv');
      kv = kvModule.kv;
      useKV = true;
      return kv;
    } catch (error) {
      console.warn('@vercel/kv not available, using file system');
      useKV = false;
      return null;
    }
  }
  return null;
}

const KV_KEY = 'careers:data';

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

// 默认数据
const getDefaultData = () => ({
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
});

// 读数据（优先使用 KV，否则使用文件系统）
async function readStore() {
  // 尝试使用 Vercel KV
  const kvInstance = await initKV();
  if (kvInstance) {
    try {
      const data = await kvInstance.get(KV_KEY);
      if (data) {
        return data;
      }
    } catch (error) {
      console.error('KV read error:', error);
      // KV 读取失败，继续尝试文件系统
    }
  }
  
  // 使用文件系统
  try {
    const buf = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(buf);
  } catch {
    // 返回默认数据
    return getDefaultData();
  }
}

async function writeStore(data: unknown) {
  // 优先使用 Vercel KV
  const kvInstance = await initKV();
  if (kvInstance) {
    try {
      await kvInstance.set(KV_KEY, data);
      return; // 成功写入 KV，直接返回
    } catch (error) {
      console.error('KV write error:', error);
      // KV 写入失败，继续尝试文件系统
    }
  }
  
  // 使用文件系统（开发环境或 KV 不可用时）
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error: any) {
    // 如果是只读文件系统错误，提供更清晰的错误信息
    if (error.code === 'EROFS' || error.message?.includes('read-only')) {
      throw new Error('文件系统只读：在生产环境中无法直接写入文件。请配置 Vercel KV 或其他数据库服务。\n\n配置步骤：\n1. 在 Vercel 项目中添加 KV 数据库\n2. 安装依赖：npm install @vercel/kv\n3. Vercel 会自动配置环境变量');
    }
    throw error;
  }
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
    
    try {
      await writeStore(parsed);
      return NextResponse.json({ ok: true }, { headers: { 'cache-control': 'no-store' } });
    } catch (writeError: any) {
      // 如果是只读文件系统错误，返回更详细的错误信息
      if (writeError.code === 'EROFS' || writeError.message?.includes('read-only') || writeError.message?.includes('文件系统只读')) {
        return NextResponse.json({ 
          ok: false, 
          error: '文件系统只读：在生产环境中无法直接写入文件。请配置数据库或使用 Vercel KV 等存储服务。',
          code: 'EROFS',
          suggestion: '建议使用 Vercel KV、PostgreSQL 或其他数据库来存储数据。'
        }, { status: 500 });
      }
      throw writeError;
    }
  } catch (e: any) {
    // 如果是验证错误，返回 400
    if (e.name === 'ZodError') {
      return NextResponse.json({ ok: false, error: e?.message || 'Invalid payload' }, { status: 400 });
    }
    // 其他错误返回 500
    return NextResponse.json({ ok: false, error: e?.message || 'Server error' }, { status: 500 });
  }
}

// 添加 POST 方法作为备选，以防某些服务器不支持 PUT
export async function POST(req: Request) {
  try {
    const body = await req.json();
    // 先规范化数据格式
    const normalized = normalizeJobData(body);
    const parsed = CareersSchema.parse(normalized);
    
    try {
      await writeStore(parsed);
      return NextResponse.json({ ok: true }, { headers: { 'cache-control': 'no-store' } });
    } catch (writeError: any) {
      // 如果是只读文件系统错误，返回更详细的错误信息
      if (writeError.code === 'EROFS' || writeError.message?.includes('read-only') || writeError.message?.includes('文件系统只读')) {
        return NextResponse.json({ 
          ok: false, 
          error: '文件系统只读：在生产环境中无法直接写入文件。请配置数据库或使用 Vercel KV 等存储服务。',
          code: 'EROFS',
          suggestion: '建议使用 Vercel KV、PostgreSQL 或其他数据库来存储数据。'
        }, { status: 500 });
      }
      throw writeError;
    }
  } catch (e: any) {
    // 如果是验证错误，返回 400
    if (e.name === 'ZodError') {
      return NextResponse.json({ ok: false, error: e?.message || 'Invalid payload' }, { status: 400 });
    }
    // 其他错误返回 500
    return NextResponse.json({ ok: false, error: e?.message || 'Server error' }, { status: 500 });
  }
}
