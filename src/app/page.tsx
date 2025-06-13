'use client';

import { useState } from 'react';
import { insertWaitlistEntry } from '@/lib/supabase';

export default function Home() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [candidMeeting, setCandidMeeting] = useState(false);
  const [privacyAgreement, setPrivacyAgreement] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!privacyAgreement) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      await insertWaitlistEntry({
        name,
        email,
        phone,
        candid_meeting: candidMeeting,
        privacy_agreement: privacyAgreement
      });
      
      console.log('웨이트리스트 등록 성공:', { 
        name, 
        email, 
        phone,
        candidMeeting, 
        privacyAgreement 
      });
      
      setIsSubmitted(true);
    } catch (err) {
      console.error('웨이트리스트 등록 실패:', err);
      
      // 다양한 에러 타입 처리
      const error = err as Error & { code?: string };
      if (error?.code === '23505' || error?.message?.includes('duplicate key')) {
        setError('이미 등록된 이메일 주소입니다.');
      } else if (error?.message?.includes('Invalid API key') || error?.message?.includes('Invalid JWT')) {
        setError('서버 설정 오류입니다. 관리자에게 문의해주세요.');
      } else if (error?.message?.includes('relation "waitlist" does not exist')) {
        setError('데이터베이스 테이블이 생성되지 않았습니다. 관리자에게 문의해주세요.');
      } else if (error?.message?.includes('Failed to fetch') || error?.message?.includes('NetworkError')) {
        setError('네트워크 연결을 확인해주세요.');
      } else {
        setError(`등록 중 오류가 발생했습니다: ${error?.message || '알 수 없는 오류'}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-accent rounded-sm flex items-center justify-center">
                <span className="text-background font-bold text-sm">R</span>
              </div>
              <span className="font-semibold text-lg">Remaster Resume</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero + Waitlist Combined Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            {/* Left: Hero Content */}
            <div className="text-left">
              <div className="inline-flex items-center bg-border/50 rounded-full px-4 py-2 mb-8">
                <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                <span className="text-sm text-muted">Powered by Candid, AI</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                이력서로 만들어가는<br />
                <span className="text-accent">나만의 커리어 기회</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted mb-8 leading-relaxed">
                나의 커리어 목표를 설정하고 이력서를 업로드하세요.  
                Candid만의 AI가 분석한 이력서 기반 커리어 리포트와 커리어 목표 달성 액션 플랜을 제공합니다.
              </p>
            </div>

            {/* Right: Waitlist Form */}
            <div id="waitlist" className="bg-border/5 rounded-2xl">
              <div className="text-left mb-4 md:mb-6">
                <h2 className="text-2xl md:text-3xl font-bold ">
                  사전등록
                </h2>
                <p className="text-muted">
                  특별 혜택과 함께 나만의 커리어 기회를 가장 먼저 만나보세요.
                </p>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <input
                      type="text"
                      placeholder="이름"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="bg-background border border-border rounded-md px-4 py-3 focus:outline-none focus:border-accent transition-colors text-foreground placeholder:text-muted"
                    />
                    <input
                      type="tel"
                      placeholder="전화번호"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="bg-background border border-border rounded-md px-4 py-3 focus:outline-none focus:border-accent transition-colors text-foreground placeholder:text-muted"
                    />
                    <input
                      type="email"
                      placeholder="이메일 주소"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-background border border-border rounded-md px-4 py-3 focus:outline-none focus:border-accent transition-colors text-foreground placeholder:text-muted"
                    />
                  </div>
                  
                  {/* 커스텀 체크박스들 */}
                  <div className="space-y-4 text-left">
                    <label className="flex items-start space-x-3 cursor-pointer group">
                      <div className="relative flex-shrink-0 mt-1">
                        <input
                          type="checkbox"
                          checked={privacyAgreement}
                          onChange={(e) => setPrivacyAgreement(e.target.checked)}
                          required
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded border-2 transition-all duration-200 ${
                          privacyAgreement 
                            ? 'bg-accent border-accent' 
                            : 'border-border group-hover:border-accent/50'
                        }`}>
                          {privacyAgreement && (
                            <svg className="w-3 h-3 text-background absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="text-sm">
                        <span className="text-foreground font-medium">개인정보 수집 및 이용에 동의합니다.  <span className="text-accent">*</span></span>
                        <p className="text-muted text-xs mt-1">
                          서비스 제공을 위해 필요한 최소한의 정보만 수집하며, 마케팅 목적으로 사용하지 않습니다.
                        </p>
                      </div>
                    </label>
                    <label className="flex items-start space-x-3 cursor-pointer group">
                      <div className="relative flex-shrink-0 mt-1">
                        <input
                          type="checkbox"
                          checked={candidMeeting}
                          onChange={(e) => setCandidMeeting(e.target.checked)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded border-2 transition-all duration-200 ${
                          candidMeeting 
                            ? 'bg-accent border-accent' 
                            : 'border-border group-hover:border-accent/50'
                        }`}>
                          {candidMeeting && (
                            <svg className="w-3 h-3 text-background absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="text-sm">
                        <span className="text-foreground font-medium">Candid와 함께 커리어를 설계하고 싶어요.</span>
                        <p className="text-muted text-xs mt-1">
                          무료 1:1 컨설팅을 통해 더 깊이 있는 조언을 받아보세요.
                        </p>
                      </div>
                    </label>
                  </div>
                  
                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-md p-3 text-red-400 text-sm">
                      {error}
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    className="w-full bg-accent hover:bg-accent/90 text-background py-4 rounded-md font-semibold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    disabled={!privacyAgreement || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-background" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        등록 중...
                      </>
                    ) : (
                      '사전등록하기'
                    )}
                  </button>
                  {/* <p className="text-sm text-muted text-left">
                    스팸 메일은 발송하지 않습니다. 언제든지 구독을 취소할 수 있습니다.
                  </p> */}
                </form>
              ) : (
                <div className="bg-gradient-to-br from-accent/5 to-accent/10 border-2 border-accent/30 rounded-xl p-6 md:p-8 shadow-lg relative overflow-hidden animate-fadeInZoom">
                  {/* 배경 글로우 효과 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5 animate-pulse"></div>
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-md animate-scaleIn">
                      <svg className="w-8 h-8 md:w-10 md:h-10 text-background animate-checkIn" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-left text-foreground animate-slideUp1">
                      반갑습니다 {name} 님!
                    </h3>
                    <p className="text-base md:text-lg text-foreground/80 mb-4 md:mb-6 text-left leading-relaxed animate-slideUp2">
                      사전등록이 성공적으로 완료되었습니다.
                    </p>
                    <p className="text-base md:text-lg text-foreground/80 mb-4 md:mb-6 text-left leading-relaxed animate-slideUp3">
                      {email}로 출시 소식을 가장 먼저 전해드리겠습니다.
                    </p>
                    {candidMeeting && (
                      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 md:p-5 mt-4 md:mt-6 shadow-sm animate-slideUp4">
                        <p className="text-sm md:text-base text-foreground/70 text-left leading-relaxed">
                          🎯 <span className="font-medium text-accent">Candid 미팅도 신청해주셨네요!</span>
                        </p>
                        <p className="text-sm md:text-base text-foreground/70 text-left leading-relaxed mt-2">
                          {phone ? `${phone}로 빠른 시일 내에 연락드리겠습니다.` : '빠른 시일 내에 연락드리겠습니다.'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-accent rounded-sm flex items-center justify-center">
                <span className="text-background font-bold text-sm">R</span>
              </div>
              <span className="font-semibold text-lg">Remaster Resume</span>
            </div>
          </div>
          <div className="text-center mt-8 text-muted">
            <p>&copy; 2025 Candid. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
