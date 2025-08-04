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
    } else {
        // 열기
        coverElement.classList.add('opened');
    }
}

// 편지봉투 강제 닫기 함수
function closeEnvelope(coverElement) {
    coverElement.classList.remove('opened');
}

// 편지 봉투 애니메이션 함수 - 참고 사이트 기반
function initLetterEnvelopeAnimation(containerSelector = '.envelope-invitation') {
    let isOpened = false;
    
    // 초기화 시 뚜껑 z-index 설정
    const envelopeInvitation = document.querySelector(containerSelector);
    if (envelopeInvitation) {
        const lid = envelopeInvitation.querySelector('.envelope-container svg:last-of-type');
        if (lid) {
            lid.classList.add('lid-closed');
        }
    }

    // 클릭 토글
    function toggleLetterEnvelope() {
        if (!isOpened) {
            // 봉투 열기
            isOpened = true;
            const envelopeInvitation = document.querySelector(containerSelector);
            
            if (envelopeInvitation) {
                envelopeInvitation.classList.add('open');
                
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
                
                // 뚜껑 z-index 딜레이 후 적용 (300ms 딜레이)
                const lid = envelopeInvitation.querySelector('.envelope-container svg:last-of-type');
                if (lid) {
                    setTimeout(() => {
                        lid.classList.add('lid-closed');
                    }, 300);
                }
            }
        }
    }

    // 클릭 이벤트 바인딩
    if (envelopeInvitation) {
        envelopeInvitation.addEventListener('click', toggleLetterEnvelope);
        envelopeInvitation.style.position = 'relative';
        envelopeInvitation.style.zIndex = '10';
    }

    // 정리 함수 반환 (필요시 이벤트 리스너 제거용)
    return function cleanup() {
        if (envelopeInvitation) {
            envelopeInvitation.removeEventListener('click', toggleLetterEnvelope);
        }
    };
}

// DOM 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // Swiper가 로드된 후 Album Swiper 초기화
    if (typeof Swiper !== 'undefined') {
        const albumSwiperInstance = initAlbumSwiper();
        
        // 앨범 썸네일 클릭 이벤트 초기화
        initAlbumThumbnailClick(albumSwiperInstance);
    }
    
    // 편지봉투 애니메이션 초기화
    initLetterEnvelopeAnimation();
});