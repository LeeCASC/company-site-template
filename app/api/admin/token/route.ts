import { NextResponse } from 'next/server';

// 生成临时 token（返回管理员密码用于 API 认证）
// 注意：这是一个简化的实现，生产环境建议使用 JWT token
export async function GET(req: Request) {
  try {
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (!adminPassword) {
      return NextResponse.json(
        { error: '服务器配置错误' },
        { status: 500 }
      );
    }
    
    // 返回密码用于 API 认证
    // 注意：生产环境应该使用更安全的方式（如 JWT token）
    return NextResponse.json({ token: adminPassword });
  } catch (error) {
    console.error('Token generation error:', error);
    return NextResponse.json(
      { error: '生成 token 失败' },
      { status: 500 }
    );
  }
}

