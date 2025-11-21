import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Sanity 客户端配置
// 注意：禁用 CDN 以确保实时获取最新数据
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false, // 禁用 CDN 以确保获取最新数据（不缓存）
  apiVersion: '2024-01-01', // 使用当前日期作为 API 版本
  token: process.env.SANITY_API_TOKEN, // 用于写入操作的 token（可选）
});

// 图片 URL 构建器
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// GROQ 查询辅助函数 - 获取招聘数据
export async function fetchCareersData() {
  const query = `*[_type == "careersPage"][0] {
    _id,
    _updatedAt,
    jobs[] {
      _id,
      _key,
      id,
      title {
        cn,
        en
      },
      salary {
        cn,
        en
      },
      description {
        cn,
        en
      },
      responsibilities {
        cn,
        en
      },
      requirements {
        cn,
        en
      },
      preferredConditions {
        cn,
        en
      }
    },
    contact {
      phone,
      email,
      address {
        cn,
        en
      }
    }
  }`;

  try {
    // 使用 tag 参数强制重新获取（禁用缓存）
    // 注意：Sanity client 的 fetch 方法不支持 Next.js 的 cache 选项
    // 但 useCdn: false 已确保不使用 CDN 缓存
    const data = await sanityClient.fetch(query);
    
    // 添加调试日志（仅在开发环境）
    if (process.env.NODE_ENV === 'development') {
      console.log('[Sanity] Fetched careers data:', {
        hasData: !!data,
        updatedAt: data?._updatedAt,
        jobsCount: data?.jobs?.length || 0
      });
    }
    
    return data;
  } catch (error) {
    console.error('[Sanity] Error fetching careers data:', error);
    return null;
  }
}

