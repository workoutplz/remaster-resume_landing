import { createClient } from '@supabase/supabase-js'

// Supabase 프로젝트 URL과 API 키를 여기에 직접 입력하세요
// 실제 배포 시에는 환경 변수를 사용하는 것이 좋습니다
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'

// URL과 키가 설정되지 않은 경우 경고
if (supabaseUrl === 'YOUR_SUPABASE_URL' || supabaseKey === 'YOUR_SUPABASE_ANON_KEY') {
  console.warn('⚠️ Supabase URL 또는 API 키가 설정되지 않았습니다!')
  console.warn('src/lib/supabase.ts 파일에서 실제 값으로 교체하거나 .env.local 파일을 생성하세요.')
  console.warn('Supabase 대시보드 > Settings > API에서 Project URL과 anon public key를 복사하세요.')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// 웨이트리스트 데이터 타입 정의
export interface WaitlistEntry {
  id?: number
  name: string
  email: string
  phone: string
  candid_meeting: boolean
  privacy_agreement: boolean
  created_at?: string
}

// 웨이트리스트 데이터 삽입 함수
export async function insertWaitlistEntry(data: Omit<WaitlistEntry, 'id' | 'created_at'>) {
  console.log('삽입할 데이터:', data)
  console.log('Supabase URL:', supabaseUrl)
  console.log('Supabase Key 존재 여부:', !!supabaseKey)
  
  const { data: result, error } = await supabase
    .from('waitlist')
    .insert([data])
    .select()

  if (error) {
    console.error('Supabase 삽입 오류 상세:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code
    })
    throw error
  }

  console.log('삽입 성공:', result)
  return result
} 