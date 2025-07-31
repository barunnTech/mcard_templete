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

// DOM 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', function() {
    console.log('M카드 템플릿이 로드되었습니다.');
    
    // Swiper가 로드된 후 Album Swiper 초기화
    if (typeof Swiper !== 'undefined') {
        const albumSwiperInstance = initAlbumSwiper();
        console.log('Album Swiper 초기화 완료');
    } else {
        console.error('Swiper.js가 로드되지 않았습니다.');
    }
});