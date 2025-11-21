import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// Sanity Webhook 处理
// 当 Sanity 内容更新时，触发页面重新验证
// 注意：此端点主要用于 Next.js 页面重新验证
// 完整部署需要通过 Vercel Deployment Hook 或 GitHub Actions
export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // 验证 Webhook 来源（可选，但推荐）
    const secret = req.headers.get('x-sanity-webhook-secret');
    const expectedSecret = process.env.SANITY_WEBHOOK_SECRET;
    
    if (expectedSecret && secret !== expectedSecret) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 检查是否是 careersPage 文档更新
    const documentType = body?._type;
    if (documentType === 'careersPage') {
      console.log('Careers page updated in Sanity, revalidating pages');
      
      // 重新验证相关页面（Next.js 13+ App Router）
      try {
        revalidatePath('/zh/careers');
        revalidatePath('/en/careers');
        revalidatePath('/careers.html');
        revalidatePath('/api/careers');
      } catch (error) {
        console.warn('Revalidation error (may not be supported in this Next.js version):', error);
      }
      
      return NextResponse.json({ 
        success: true, 
        message: 'Pages revalidated',
        timestamp: new Date().toISOString(),
        note: 'For full deployment, use Vercel Deployment Hook or GitHub Actions'
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Webhook received but no action needed' 
    });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: error?.message || 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

// 允许 GET 请求用于测试
export async function GET() {
  return NextResponse.json({ 
    message: 'Sanity Webhook endpoint is active',
    timestamp: new Date().toISOString()
  });
}

