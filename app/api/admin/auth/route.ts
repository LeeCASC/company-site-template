import { NextResponse } from 'next/server';

// 会话过期时间（30分钟）
const SESSION_TIMEOUT = 30 * 60 * 1000;

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    // 从环境变量获取管理员密码
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      console.error('ADMIN_PASSWORD environment variable is not set');
      return NextResponse.json(
        { success: false, error: '服务器配置错误，请联系管理员' },
        { status: 500 }
      );
    }

    // 验证密码
    if (password === adminPassword) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: '密码错误' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { success: false, error: '登录失败，请稍后重试' },
      { status: 500 }
    );
  }
}

// 验证会话是否有效
export async function GET(req: Request) {
  try {
    // 这里可以添加更复杂的会话验证逻辑
    // 目前由客户端检查 sessionStorage
    return NextResponse.json({ valid: true });
  } catch (error) {
    return NextResponse.json({ valid: false }, { status: 401 });
  }
}


