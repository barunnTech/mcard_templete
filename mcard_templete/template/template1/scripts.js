// M카드 그리드형 Template - Main Section JavaScript
// Static implementation with Swiper for album section

// Album Swiper 초기화
function initAlbumSwiper() {
    const albumSwiper = new Swiper('.album-swiper', {
        // 기본 설정
        slidesPerView: 1,
        spaceBetween: 0,
        centeredSlides: true,
        
        // 페이지네이션
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        
        // 터치/스와이프 설정
        touchRatio: 1,
        touchAngle: 45,
        
        // 자동재생 (옵션)
        // autoplay: {
        //     delay: 3000,
        //     disableOnInteraction: false,
        // },
        
        // 효과
        effect: 'slide',
        
        // 반응형 설정
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 1,
            }
        }
    });
    
    return albumSwiper;
}

// 앨범 썸네일 클릭 이벤트 초기화
function initAlbumThumbnailClick(swiperInstance) {
    const thumbnails = document.querySelectorAll('.album-thumb');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const targetSlide = this.getAttribute('data-slide');
            const newImageSrc = this.getAttribute('data-image');
            
            if (swiperInstance && targetSlide !== null) {
                // 해당 슬라이드로 이동
                swiperInstance.slideTo(parseInt(targetSlide));
                
                // 현재 활성 슬라이드의 메인 이미지 변경
                setTimeout(() => {
                    const activeSlide = document.querySelector('.swiper-slide-active .album-main-photo img');
                    if (activeSlide && newImageSrc) {
                        activeSlide.src = newImageSrc;
                    }
                }, 300); // 슬라이드 전환 후 이미지 변경
            }
        });
    });
}

// 편지봉투 열기/닫기 토글 함수
function openEnvelope(coverElement) {
    // 이미 열린 상태인지 확인
    const isOpened = coverElement.classList.contains('opened');
    
    if (isOpened) {
        // 닫기
        coverElement.classList.remove('opened');
        console.log('편지봉투가 닫혔습니다.');
    } else {
        // 열기
        coverElement.classList.add('opened');
        console.log('편지봉투가 열렸습니다.');
    }
}

// 편지봉투 강제 닫기 함수
function closeEnvelope(coverElement) {
    coverElement.classList.remove('opened');
    console.log('편지봉투가 닫혔습니다.');
}

// 편지 봉투 애니메이션 함수 - 참고 사이트 기반
function initLetterEnvelopeAnimation(containerSelector = '.envelope-invitation') {
    console.log('편지봉투 애니메이션 초기화 시작');
    
    let isOpened = false;
    
    // 초기화 시 뚜껑 z-index 설정
    const envelopeInvitation = document.querySelector(containerSelector);
    if (envelopeInvitation) {
        const lid = envelopeInvitation.querySelector('.envelope-container svg:last-of-type');
        if (lid) {
            lid.classList.add('lid-closed');
            console.log('뚜껑 초기 설정 완료');
        }
    }

    // 클릭 토글
    function toggleLetterEnvelope(e) {
        console.log('클릭 이벤트 발생!', e);
        
        if (!isOpened) {
            // 봉투 열기
            isOpened = true;
            const envelopeInvitation = document.querySelector(containerSelector);
            
            if (envelopeInvitation) {
                envelopeInvitation.classList.add('open');
                console.log('봉투 열기 - open 클래스 추가됨');
                
                // 뚜껑 z-index 즉시 제거
                const lid = envelopeInvitation.querySelector('.envelope-container svg:last-of-type');
                if (lid) {
                    lid.classList.remove('lid-closed');
                }
            }
        } else {
            // 봉투 닫기
            isOpened = false;
            const envelopeInvitation = document.querySelector(containerSelector);
            
            if (envelopeInvitation) {
                envelopeInvitation.classList.remove('open');
                console.log('봉투 닫기 - open 클래스 제거됨');
                
                // 뚜껑 z-index 딜레이 후 적용 (300ms 딜레이)
                const lid = envelopeInvitation.querySelector('.envelope-container svg:last-of-type');
                if (lid) {
                    setTimeout(() => {
                        lid.classList.add('lid-closed');
                        console.log('뚜껑 z-index 4 적용됨');
                    }, 300);
                }
            }
        }
    }

    // 클릭 이벤트 바인딩 - envelope-invitation에 바인딩
    if (envelopeInvitation) {
        envelopeInvitation.addEventListener('click', toggleLetterEnvelope);
        console.log('클릭 이벤트 바인딩 완료:', containerSelector);
        
        // 테스트용 - 강제로 클릭 가능하도록
        envelopeInvitation.style.position = 'relative';
        envelopeInvitation.style.zIndex = '10';
        
    } else {
        console.log('envelope-invitation 요소를 찾을 수 없어서 클릭 이벤트 바인딩 실패');
    }

    // 정리 함수 반환 (필요시 이벤트 리스너 제거용)
    return function cleanup() {
        if (envelopeInvitation) {
            envelopeInvitation.removeEventListener('click', toggleLetterEnvelope);
        }
    };
}

// D-Day 계산 및 실시간 카운트다운 함수
function initDDayCountdown() {
    // 목표 날짜: 2025년 9월 6일 오후 2시
    const targetDate = new Date('2025-09-06T14:00:00');
    
    function updateCountdown() {
        const now = new Date();
        const timeRemaining = targetDate - now;
        
        // D-Day 메시지 업데이트
        const ddayElement = document.querySelector('.dday-number');
        const days = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24));
        
        if (ddayElement) {
            if (days > 0) {
                ddayElement.textContent = `${days}일`;
            } else if (days === 0) {
                ddayElement.textContent = '오늘';
            } else {
                ddayElement.textContent = '지났습니다';
            }
        }
        
        // 카운트다운 디스플레이 업데이트
        if (timeRemaining > 0) {
            const daysLeft = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
            
            // 카운트다운 요소들 업데이트
            const countdownElements = document.querySelectorAll('.countdown-display .time-unit .number');
            if (countdownElements.length >= 4) {
                countdownElements[0].textContent = String(daysLeft).padStart(3, '0');
                countdownElements[1].textContent = String(hours).padStart(2, '0');
                countdownElements[2].textContent = String(minutes).padStart(2, '0');
                countdownElements[3].textContent = String(seconds).padStart(2, '0');
            }
        } else {
            // 시간이 지났을 때
            const countdownElements = document.querySelectorAll('.countdown-display .time-unit .number');
            countdownElements.forEach(element => {
                element.textContent = '00';
            });
        }
    }
    
    // 초기 업데이트
    updateCountdown();
    
    // 1초마다 업데이트
    const countdownInterval = setInterval(updateCountdown, 1000);
    
    // 정리 함수 반환
    return function cleanup() {
        clearInterval(countdownInterval);
    };
}

// 캘린더에서 9월 6일을 강조 표시하는 함수
function highlightWeddingDate() {
    // 이미 HTML에서 dday 클래스가 적용되어 있으므로 추가 작업 불필요
    console.log('결혼식 날짜 강조 표시 완료');
}

// info-section 토글 기능
function initInfoSectionToggle() {
    const infoSections = document.querySelectorAll('.info-section');
    
    infoSections.forEach(section => {
        const header = section.querySelector('.info-header');
        const content = section.querySelector('.info-content');
        const expandButton = section.querySelector('.expand-button');
        
        if (header && content && expandButton) {
            // 초기 상태 설정 - collapsed 클래스가 있으면 닫힌 상태
            if (expandButton.classList.contains('collapsed')) {
                content.style.display = 'none';
            }
            
            // expand-button 아이콘 업데이트 함수
            function updateExpandButtonIcon(isCollapsed) {
                if (isCollapsed) {
                    // 접힌 상태: 아래 화살표 (펼치기)
                    expandButton.textContent = '▼';
                } else {
                    // 펼쳐진 상태: 위 화살표 (접기)
                    expandButton.textContent = '▲';
                }
            }
            
            // 클릭 이벤트 리스너 추가
            header.addEventListener('click', function() {
                const isCollapsed = expandButton.classList.contains('collapsed');
                
                if (isCollapsed) {
                    // 펼치기
                    expandButton.classList.remove('collapsed');
                    updateExpandButtonIcon(false);
                    content.style.display = 'block';
                    
                    // 부드러운 애니메이션을 위한 처리
                    content.style.opacity = '0';
                    content.style.transform = 'translateY(-10px)';
                    
                    setTimeout(() => {
                        content.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        content.style.opacity = '1';
                        content.style.transform = 'translateY(0)';
                    }, 10);
                    
                } else {
                    // 접기
                    expandButton.classList.add('collapsed');
                    updateExpandButtonIcon(true);
                    
                    content.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    content.style.opacity = '0';
                    content.style.transform = 'translateY(-10px)';
                    
                    setTimeout(() => {
                        content.style.display = 'none';
                        content.style.transition = '';
                    }, 300);
                }
                
                console.log(`${section.classList.contains('atm-section') ? 'ATM' : '대중교통'} 섹션 토글: ${isCollapsed ? '펼침' : '접음'}`);
            });
            
            // 마우스 호버 효과
            header.style.cursor = 'pointer';
        }
    });
}

// 주소 복사 기능
function initAddressCopy() {
    const copyButton = document.querySelector('.copy-button');
    const addressText = document.querySelector('.address-text');
    
    if (copyButton && addressText) {
        copyButton.addEventListener('click', async function() {
            const address = addressText.textContent.trim();
            
            try {
                // 최신 브라우저에서 지원하는 Clipboard API 사용
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(address);
                    showCopyFeedback(copyButton, '복사완료!');
                } else {
                    // 구형 브라우저 호환을 위한 fallback
                    const textArea = document.createElement('textarea');
                    textArea.value = address;
                    textArea.style.position = 'fixed';
                    textArea.style.left = '-999999px';
                    textArea.style.top = '-999999px';
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    
                    const success = document.execCommand('copy');
                    document.body.removeChild(textArea);
                    
                    if (success) {
                        showCopyFeedback(copyButton, '복사완료!');
                    } else {
                        showCopyFeedback(copyButton, '복사실패');
                    }
                }
                
                console.log('주소 복사됨:', address);
                
            } catch (error) {
                console.error('주소 복사 실패:', error);
                showCopyFeedback(copyButton, '복사실패');
            }
        });
        
        // 복사 버튼에 커서 포인터 설정
        copyButton.style.cursor = 'pointer';
    } else {
        console.log('복사 버튼 또는 주소 텍스트를 찾을 수 없습니다.');
    }
}

// 복사 완료 피드백 표시
function showCopyFeedback(button, message) {
    const originalText = button.querySelector('span').textContent;
    const span = button.querySelector('span');
    
    // 버튼 텍스트 변경
    span.textContent = message;
    
    // 색상 변경 (성공 시 초록색, 실패 시 빨간색)
    if (message === '복사완료!') {
        button.style.color = '#28a745';
    } else {
        button.style.color = '#dc3545';
    }
    
    // 1.5초 후 원래 상태로 복원
    setTimeout(() => {
        span.textContent = originalText;
        button.style.color = '';
    }, 1500);
}

// DOM 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', function() {
    console.log('M카드 템플릿이 로드되었습니다.');
    
    // Swiper가 로드된 후 Album Swiper 초기화
    if (typeof Swiper !== 'undefined') {
        const albumSwiperInstance = initAlbumSwiper();
        console.log('Album Swiper 초기화 완료');
        
        // 앨범 썸네일 클릭 이벤트 초기화
        initAlbumThumbnailClick(albumSwiperInstance);
        console.log('앨범 썸네일 클릭 이벤트 초기화 완료');
    } else {
        console.error('Swiper.js가 로드되지 않았습니다.');
    }
    
    // 편지봉투 애니메이션 초기화
    initLetterEnvelopeAnimation();
    console.log('편지봉투 애니메이션 준비 완료');
    
    // D-Day 카운트다운 초기화
    initDDayCountdown();
    console.log('D-Day 카운트다운 초기화 완료');
    
    // 결혼식 날짜 강조 표시
    highlightWeddingDate();
    console.log('결혼식 날짜 강조 표시 완료');
    
    // info-section 토글 기능 초기화
    initInfoSectionToggle();
    console.log('info-section 토글 기능 초기화 완료');
    
    // 주소 복사 기능 초기화
    initAddressCopy();
    console.log('주소 복사 기능 초기화 완료');
});