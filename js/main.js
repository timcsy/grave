$(document).ready(function() {
    // 紀念墓園數據
    const memorialData = [
        {
            id: 1,
            name: "張家家族墓園",
            description: "簡約現代的家族墓園，環境優美寧靜",
            image: "img/memorial1.jpg",
            category: "family"
        },
        {
            id: 2,
            name: "林先生紀念碑",
            description: "精緻雕刻的大理石紀念碑，設計典雅",
            image: "img/memorial2.jpg",
            category: "memorial"
        },
        {
            id: 3,
            name: "王氏個人墓園",
            description: "獨特設計的個人墓園，融合傳統與現代元素",
            image: "img/memorial3.jpg",
            category: "individual"
        },
        {
            id: 4,
            name: "李家家族墓園",
            description: "寬敞明亮的家族墓園，適合大型家族使用",
            image: "img/memorial4.jpg",
            category: "family"
        },
        {
            id: 5,
            name: "陳氏個人墓園",
            description: "簡約莊嚴的個人墓園，環境清幽",
            image: "img/memorial5.jpg",
            category: "individual"
        },
        {
            id: 6,
            name: "吳家紀念碑",
            description: "藝術風格設計的紀念碑，獨特且莊嚴",
            image: "img/memorial6.jpg",
            category: "memorial"
        }
    ];

    // 動態生成紀念墓園內容
    function renderMemorials(filter = 'all') {
        const $grid = $('.memorial-grid');
        $grid.empty();

        const filteredData = filter === 'all' 
            ? memorialData 
            : memorialData.filter(item => item.category === filter);

        filteredData.forEach(item => {
            const memorialHTML = `
                <div class="memorial-item fade-in" data-category="${item.category}">
                    <div class="placeholder-image" style="background-color: #34495e; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; color: white;">
                        <i class="fas fa-monument" style="font-size: 3rem; margin-bottom: 15px;"></i>
                        <div style="text-align: center; padding: 0 20px;">
                            <h3>${item.name}</h3>
                            <p>${item.description}</p>
                        </div>
                    </div>
                    <div class="memorial-info">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <a href="#contact" class="btn">了解更多</a>
                    </div>
                </div>
            `;
            $grid.append(memorialHTML);
        });

        // 觸發動畫效果
        setTimeout(() => {
            $('.memorial-item').addClass('active');
        }, 100);
    }

    // 初始化紀念區
    renderMemorials();

    // 紀念區過濾功能
    $('.filter-btn').click(function() {
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        const filter = $(this).data('filter');
        renderMemorials(filter);
    });

    // 導航欄漢堡按鈕功能
    $('.hamburger').click(function() {
        $('.nav-links').toggleClass('active');
    });

    // 平滑滾動
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        const target = this.hash;
        const $target = $(target);
        
        if ($target.length) {
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top - 80
            }, 900, 'swing', function() {
                window.location.hash = target;
            });
            
            // 如果導航欄處於開啟狀態，則關閉它
            if ($('.nav-links').hasClass('active')) {
                $('.nav-links').removeClass('active');
            }
        }
    });

    // 滾動動畫效果
    function fadeInElements() {
        $('.fade-in').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('active');
            }
        });
    }

    // 頁面載入後和滾動時執行動畫
    $(window).on('load scroll', fadeInElements);

    // 初始化滑動效果
    if ($.fn.slick) {
        $('.testimonial-slider').slick({
            dots: true,
            arrows: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            adaptiveHeight: true,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false
                    }
                }
            ]
        });
    } else {
        console.warn('Slick carousel not loaded');
    }

    // 表單提交處理
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        
        // 在這裡，您可以添加表單驗證和送出邏輯
        const name = $('#name').val();
        const email = $('#email').val();
        const message = $('#message').val();
        
        // 簡易驗證
        if (name && email && message) {
            // 在實際場景中，這裡會有AJAX請求發送表單數據
            // 但在此示範中，我們只顯示一條成功訊息
            alert('感謝您的留言，我們將盡快回覆您。');
            this.reset();
        } else {
            alert('請填寫所有必填欄位。');
        }
    });

    // 處理關於我們區域的圖片
    $('#garden-img').on('error', function() {
        const $this = $(this);
        const $parent = $this.parent();
        
        $parent.html(`
            <div style="background-color: #34495e; height: 300px; display: flex; flex-direction: column; justify-content: center; align-items: center; color: white; border-radius: 10px;">
                <i class="fas fa-tree" style="font-size: 3rem; margin-bottom: 15px;"></i>
                <h3>紀念公園景觀</h3>
                <p>寧靜祥和的園區環境</p>
            </div>
        `);
    });

    // 設置英雄區的背景
    function setupHeroBackground() {
        $('.hero').css({
            'background': 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), #2c3e50',
            'background-size': 'cover',
            'background-position': 'center'
        });
    }
    
    setupHeroBackground();
});